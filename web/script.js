var nav = {
	mediaStreamer: document.getElementById("nav-media-streamer"),
	remoteDesktop: document.getElementById("nav-remote-desktop")
};
var frame = document.getElementById("frame");

function load(name) {
	frame.src = "http://"+conf.host+":"+conf[name].port;
	location.hash = name;
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
		frame.contentWindow.focus();
	}, 100);
});
