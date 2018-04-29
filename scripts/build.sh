#!/bin/bash -xe

run_browserify() {
	browserify -d ./src/$1.ts -p "[tsify]" | exorcist ./dist/$1.bundle.js.map > ./dist/$1.bundle.js
}

run_build() {
	case $1 in
		css)
			node-sass --source-map true -o dist src
			;;
		js:content)
			run_browserify content
			;;
		js:background)
			run_browserify background
			;;
		js)
			run_build js:content &
			run_build js:background &
			wait
			;;
		*)
			run_build js &
			run_build css &
			wait
	esac
}

PATH=node_modules/.bin/:$PATH run_build "$@"
