var mongodb = require('mongodb');

// Connect
mongodb.MongoClient.connect('mongodb://localhost:27017/nodedb', function(err, db) {
  if (err) throw err;
  var nodedb = db.db('nodedb');

  // Create a collection
  // nodedb.createCollection('proj', function(err, res) {
  //   if (err), throw err;
  //   db.close();
  // });

  // Insert a doc
  // var doc = {
  //   name: 'First NodeJS Doc',
  //   date: 'Tue 17 Apr 15:46'
  // }
  // nodedb.collection('col').insertOne(doc, function(err, res) {
  //   if (err) throw err;
  //   console.log(res);
  //   db.close();
  // });

  // Insert many
  // var Shop = require("./shop.js");
  // var shops = [
  //     new Shop(1,
  //         'Elephant Grounds',
  //         '11 Gough Street, Sheung Wan',
  //         'http://res.cloudinary.com/hio22hxcn/image/upload/v1429770276/mvhonh1kjtdpdlvhd8py.jpg',
  //         ['latte', 'espresso']),
  //     new Shop(2,
  //         'Barista Jam',
  //         '126-128 Jervois St, Sheung Wan',
  //         'http://s.wsj.net/public/resources/images/OB-KZ752_brio_G_20101124030105.jpg',
  //         ['latte', 'espresso']),
  //     new Shop(3,
  //         'Lof 10', '1 U Lam Terrace, Sheung Wan',
  //         'http://res.cloudinary.com/hio22hxcn/image/upload/v1429771269/rxzimggknxpezlkjwpu1.jpg',
  //         ['latte', 'espresso']),
  //     new Shop(4,
  //         'The Roaster Step by Step',
  //         '26 Upper Lascar Row, Sheung Wan',
  //         'http://res.cloudinary.com/hio22hxcn/image/upload/v1429771409/ldiaidfrxpvfls20rjcx.jpg',
  //         ['latte', 'espresso'])
  // ];
  // nodedb.collection('proj').insertMany(shops, function(err, result) {
  //   if (err) throw err;
  //   console.log(result.result.ok);
  //   db.close();
  // });

  // Delete one
  // var query = {
  //   "name" : "First NodeJS Doc"
  // }
  // nodedb.collection('col').deleteOne(query, function() {
  //   db.close();
  // });

  // Delete Many
  // var query = {
  //   $or: [
  //     {id: 1},
  //     {id: 2},
  //     {id: 3},
  //     {id: 4},
  //   ]
  // }
  // nodedb.collection('col').deleteMany(query, function() {
  //   db.close()
  // })

  // Find one
  nodedb.collection('proj').find({'id': 1}, function(err, result) {
    console.log(result);
    db.close();
  })

  // Find Many
  // nodedb.collection('proj').find().toArray(function(err, result) {
  //   console.log(result);
  //   db.close();
  // });

});
