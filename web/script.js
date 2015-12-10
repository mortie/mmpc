var nav = {
	mediaStreamer: document.getElementById("nav-media-streamer"),
	remoteDesktop: document.getElementById("nav-remote-desktop")
};
var frames = {
	"media-streamer": document.getElementById("frame-media-streamer"),
	"remote-desktop": document.getElementById("frame-remote-desktop")
};

function load(name) {
	location.hash = name;

	if (load.frame) {
		load.frame.style.display = "none";

		//Automatically unload remote desktop,
		//to reduce server CPU usage
		if (load.frame === frames["remote-desktop"])
			load.frame.src = "http://false/";
	}

	var frame = frames[name];
	load.frame = frame;
	console.log(frame.src, !!frame.src);

	if (!frame.src || frame.src === "http://false/")
		frame.src = "http://"+conf.host+":"+conf[name].port;

	frame.style.display = "block";
}

if (location.hash)
	load(location.hash.substring(1));
else
	load("media-streamer");

nav.mediaStreamer.addEventListener("click", function() {
	load("media-streamer");
});
nav.remoteDesktop.addEventListener("click", function() {
	load("remote-desktop");
});

document.body.addEventListener("click", function() {
	console.log("click");
	setTimeout(function() {
		load.frame.contentWindow.focus();
	}, 100);
});
