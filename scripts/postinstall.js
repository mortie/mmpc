var exec = require("child_process").spawn;

function install(name) {
	var dir = process.cwd();

	process.chdir("modules/"+name);
	var child = exec("npm", ["install"]);
	process.chdir(dir);

	child.stdout.on("data", function(data) {
		console.log(name+"(stdout): "+data.toString().trim());
	});
	child.stderr.on("data", function(data) {
		console.log(name+"(stderr): "+data.toString().trim());
	});
}

install("media-streamer");
install("remote-desktop");
install("wallpaper");
