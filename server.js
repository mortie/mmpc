var express = require("express");
var fs = require("fs");
var exec = require("child_process").spawn;

var conf = JSON.parse(fs.readFileSync("conf.json"));

try {
	fs.mkdirSync("logs");
} catch (err) {
	if (err.code !== "EEXIST")
		throw err;
}

function load(name) {
	console.log("Loading "+name);

	try {
		var logFile = "logs/"+name+".log";
		fs.closeSync(fs.openSync(logFile, "w"));
		var logStream = fs.createWriteStream(logFile);
	} catch (err) {
		throw err;
	}
	logStream.on("error", function(err) {
		throw err;
	});

	logStream.on("open", function() {
		var dir = process.cwd();
		process.chdir("modules/"+name);

		//Create module conf
		conf[name].host = conf.host;
		fs.writeFileSync("conf.json", JSON.stringify(conf[name], null, 4));

		//Init process
		var child = exec("npm", ["start"]);
		load.children[name] = child;
		child.stdout.pipe(logStream);
		child.stderr.pipe(logStream);

		process.chdir(dir);
	});
}
load.children = {};

load("media-streamer");
load("remote-desktop");
load("wallpaper");

//Static web content
fs.writeFileSync("web/conf.js", "window.conf = "+JSON.stringify(conf)+";");
var app = express();
app.use(express.static("web"));
app.listen(conf.port);
