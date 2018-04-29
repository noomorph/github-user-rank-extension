#!/bin/bash -xe

run_copy() {
	case $1 in
		safari)
			cp -r ./dist ./gur.safariextension
			cp ./node_modules/whatwg-fetch/fetch.js ./gur.safariextension
			;;
		assets)
			cp ./src/*.{json,plist,html} ./dist/
			;;
		resources)
			cp -r ./src/resources ./dist/
			;;
		*)
			run_copy assets &
			run_copy resources &
			wait
	esac
}

PATH=node_modules/.bin/:$PATH run_copy "$@"
