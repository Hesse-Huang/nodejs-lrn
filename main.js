var url = require('url');
var express = require('express');
var app = express();

var Shop = require('./shop.js');

// Setup POST method body parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// Setup database
var MongoClient = require('mongodb').MongoClient;
var dbConnection;
var nodedb;
MongoClient.connect('mongodb://localhost:27017/nodedb', function(err, db) {
  if (err) {
    console.log(err);
  }
  dbConnection = db;
  nodedb = db.db('nodedb');
});

var generalError = {
    'error': 'General Error',
    'code': 500
}

// Clean up before process ends
process.on('exit', function() {
  dbConnection.close();
  console.log('Goodbye!');
})

// Add headers
app.use('*', function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.set('json spaces', 4);

app.get('/', function(req, res) {
  res.send('Welcome to Hesse\'s first backend!');
  console.log(req);
});

app.get('/shops', function(req, res) {
  nodedb.collection('proj').find().toArray(function(err, result) {
    res.json(result);
  });
});

app.get('/shop', function (req, res) {
    var query = url.parse(req.url).query;
    var id = Number(query.charAt(3));
    nodedb.collection('proj').find({'id': id}).toArray(function(err, result) {
      if (result.length === 1) {
          res.json(result[0]);
      } else {
          res.json({});
      }
    });
});

app.use(bodyParser.json());

app.post('/shop', function(req, res) {
    var body = req.body;
    var shop = new Shop(0, body.name, body.address, body.imgUrl, body.coffees);
    nodedb.collection('proj').find({'name': body.name}).toArray(function (err, result) {
        if (result.length > 0) {
            res.json({
                'message': 'already exist'
            })
        } else {
            nodedb.collection('proj').find().count(function (e, count) {
                shop.id = count + 1;

                nodedb.collection('proj').insertOne(shop, function (err, result) {
                    if (err) {
                        res.json(generalError);
                    } else {
                        nodedb.collection('proj').find({'name': shop.name}).toArray(function (err, result) {
                            console.log(result);
                            if (result.length === 1) {
                                res.json(shop);
                            } else {
                                res.json({});
                            }
                        });
                    }
                });


            });

        }
    });


});

// AliCloud port 3389
var server = app.listen(3389, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
