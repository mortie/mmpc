#!/bin/sh
git submodule update
git submodule foreach git pull origin master