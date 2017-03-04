# Github User Rank extension

[![Build Status](https://travis-ci.org/noomorph/github-user-rank-extension.svg?branch=master)](https://travis-ci.org/noomorph/github-user-rank-extension)
[![Dependencies Status](https://david-dm.org/noomorph/github-user-rank-extension/status.svg)](https://david-dm.org/noomorph/github-user-rank-extension)
[![Dev Dependencies Status](https://david-dm.org/noomorph/github-user-rank-extension/dev-status.svg)](https://david-dm.org/noomorph/github-user-rank-extension?type=dev)

Yet another small content script, based on [gitlance.net](http://beta.gitlance.net) data,
it adds rankings straight to Github user profiles so you don't have to go anywhere anymore.

### Building

Like a typical NodeJS-based project, it requires a couple of commands to get started:

```
yarn
yarn run build
```

At the end, you should be able to see `dist` folder built aside `src`.

### Installing

* Go to `chrome://extensions` and turn on a *Developer Mode* (a checkbox on top).
* Click `Load unpacked extension...` button and choose your built `dist` folder.

### Usage

* Open any Github user profile (e.g. [@noomorph](https://github.com/noomorph))
* You should be able to see GitLance stats of the person, below to the profile picture:

![Github User Rank extension screenshot](https://github.com/noomorph/github-user-rank-extension/raw/master/docs/images/profile-screenshot.webp "Github User Rank extension screenshot")
