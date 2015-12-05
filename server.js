var express = require("express");
var fs = require("fs");
var exec = require("child_process").spawn;

var conf = JSON.parse(fs.readFileSync("conf.json"));

function load(name) {
	var dir = process.cwd();
	process.chdir(name);

	//Create conf entry if it doesn't exist
	if (!conf[name]) {
		conf[name] = JSON.parse(fs.readFileSync("conf.json.example"));
		console.log(conf);
	}

	//Create module conf
	fs.writeFileSync("conf.json", JSON.stringify(conf[name], null, 4));

	//Init process
	var child = exec("npm", ["start"]);
	load.children[name] = child;
	child.stdout.pipe(process.stdout);
	child.stderr.pipe(process.stderr);

	process.chdir(dir);

	delete conf[name].host;
	fs.writeFileSync("conf.json", JSON.stringify(conf, null, 4));
}
load.children = {};

load("media-streamer");
load("remote-desktop");

//Static web content
fs.writeFileSync("web/conf.js", "window.conf = "+JSON.stringify(conf)+";");
var app = express();
app.use(express.static("web"));
app.listen(conf.port);
