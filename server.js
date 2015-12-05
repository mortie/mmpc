var express = require("express");
var fs = require("fs");

var conf = JSON.parse(fs.readFileSync("conf.json"));

//Static web content
fs.writeFileSync("web/conf.js", "window.conf = "+JSON.stringify(conf)+";");
var app = express();
app.use(express.static("web"));
app.listen(conf.port);
