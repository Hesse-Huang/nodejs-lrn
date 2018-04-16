var url = require("url");
var express = require("express");
var app = express();

var Shop = require("./shop.js");

var shops = [
    new Shop(1,
        'Elephant Grounds',
        '11 Gough Street, Sheung Wan',
        'http://res.cloudinary.com/hio22hxcn/image/upload/v1429770276/mvhonh1kjtdpdlvhd8py.jpg',
        ['latte', 'espresso']),
    new Shop(2,
        'Barista Jam',
        '126-128 Jervois St, Sheung Wan',
        'http://s.wsj.net/public/resources/images/OB-KZ752_brio_G_20101124030105.jpg',
        ['latte', 'espresso']),
    new Shop(3,
        'Lof 10', '1 U Lam Terrace, Sheung Wan',
        'http://res.cloudinary.com/hio22hxcn/image/upload/v1429771269/rxzimggknxpezlkjwpu1.jpg',
        ['latte', 'espresso']),
    new Shop(4,
        'The Roaster Step by Step',
        '26 Upper Lascar Row, Sheung Wan',
        'http://res.cloudinary.com/hio22hxcn/image/upload/v1429771409/ldiaidfrxpvfls20rjcx.jpg',
        ['latte', 'espresso'])
];

app.get("/", function(req, res) {
  res.send("Hello, world!");
  console.log(req);
});

app.get("/shops", function(req, res) {
  app.set("json spaces", 4);
  res.json(shops);
});

app.get('/shop', function (req, res) {
    var query = url.parse(req.url).query;
    var id = query.charAt(3);
    res.json(shops[Number(id) - 1]);
});

// AliCloud port 3389
var server = app.listen(3389, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
