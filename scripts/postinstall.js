var exec = require("child_process").spawn;
var fs = require("fs");
var conf;

try {
	conf = JSON.parse(fs.readFileSync("conf.json"));
} catch (err) {
	if (err.code !== "ENOENT")
		throw err;

	conf = JSON.parse(fs.readFileSync("conf.json.example"));
}

function install(name) {
	console.log("Installing "+name);

	var dir = process.cwd();
	process.chdir("modules/"+name);

	//Create conf entry if it doesn't exist
	if (!conf[name]) {
		conf[name] = JSON.parse(fs.readFileSync("conf.json.example"));
	}

	var child = exec("npm", ["install"]);

	child.stdout.on("data", function(data) {
		console.log(name+"(stdout): "+data.toString().trim());
	});
	child.stderr.on("data", function(data) {
		console.log(name+"(stderr): "+data.toString().trim());
	});

	process.chdir(dir);

	delete conf[name].host;
	fs.writeFileSync("conf.json", JSON.stringify(conf, null, 4));
}

install("media-streamer");
install("remote-desktop");
install("wallpaper");
