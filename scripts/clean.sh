#!/bin/bash -xe

run_clean() {
	case $1 in
		dist)
			rm -rf dist
			mkdir dist
			;;
		safari)
			rm -rf gur.safariextension
			;;
		*)
			run_clean dist &
			run_clean safari &
			wait
	esac
}

PATH=node_modules/.bin/:$PATH run_clean "$@"
