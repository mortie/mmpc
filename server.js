var fs = require("fs");
var spawn = require("child_process").spawn;

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
		var child = spawn("npm", ["start"]);
		load.children[name] = child;
		child.stdout.pipe(logStream);
		child.stderr.pipe(logStream);

		process.chdir(dir);

		child.on("exit", function() {
			logStream.on("end", function() {
				load(name);
			});
			logSstream.end();
		});
	});
}
load.children = {};

load("media-streamer");
load("wallpaper");
