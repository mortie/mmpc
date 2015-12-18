# MMPC: Mort's Media PC

This is a software suite for media PCs, with a focus of streaming things on
demand rather than navigating an existing media library.

## Installation

To install, clone this git repo and install node dependencies:

```
git clone --recursive https://github.com/mortie/mmpc.git
cd mmpc
npm install
```

After that `npm install`, you should have a `conf.json`. Change that to your
liking. And voila, mmpc is installed.

## Command Line Dependencies

MMPC relies on the following commands being available:

* imagemagick's `convert`
* `ffmpeg`
* `vlc`, unless you change conf.json's `media-streamer.player_command`
* `feh`, unless you change conf.json's `wallpaper.bg_change_cmd`
