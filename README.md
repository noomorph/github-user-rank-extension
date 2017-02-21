# Github User Rank extension

[![Build Status](https://travis-ci.org/noomorph/github-user-rank-extension.svg?branch=master)](https://travis-ci.org/noomorph/github-user-rank-extension)

Yet another small content script, based on [gitlance.net](http://beta.gitlance.net) data,
it adds rankings straight to Github user profiles so you don't have to go anywhere anymore.

### Building

Like a typical NPM-based project, it requires a couple of commands to get started:

```
npm install
npm run build
```

At the end, you should be able to see `dist` folder built aside `src`.

### Installing

* Go to `chrome://extensions` and turn on a *Developer Mode* (a checkbox on top).
* Click `Load unpacked extension...` button and choose your built `dist` folder.

### Usage

* Open Github user profile (e.g. [@noomorph](https://github.com/noomorph))
* You should be able to see GitLance stats of the person below to his profile picture.
