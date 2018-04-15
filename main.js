var express = require("express");
var app = express();

function Shop() {
  this.name = 'PolyU Cafe'
  this.phone = '12345678'
}

app.get("/", function(req, res) {
  res.send("Hello, world!");
});

app.get("/json", function(req, res) {
  app.set("json spaces", 4);
  res.json(new Shop());
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})
