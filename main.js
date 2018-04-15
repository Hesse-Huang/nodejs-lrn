var express = require("express");
var app = express();

var Shop = require("./shop.js");

app.get("/", function(req, res) {
  res.send("Hello, world!");
});

app.get("/json", function(req, res) {
  app.set("json spaces", 4);
  res.json(new Shop("Hesse Cafe", "88889999"));
});

// AliCloud port 3389
var server = app.listen(3389, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})
