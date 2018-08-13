# GitHub User Rank extension

## He's dead, Jim...

As of 2018/08/12, GitLance (the current data provider for the GitHub User Rank) is down. Hence the extension ceased to work as well.

See for yourself: http://gitlance.net/top/javascript.

Anyway, I'm not saying farewell, but a kind-hearted goodbye instead. I'm sure it's going to take a few months till I'll be able to rewrite it. Wish me good luck!

Stay tuned!

### ---------------------------------------------------------------------------


![Logo](./src/resources/promo.png)

[![Build Status](https://travis-ci.org/noomorph/github-user-rank-extension.svg?branch=master)](https://travis-ci.org/noomorph/github-user-rank-extension)
[![Dependencies Status](https://david-dm.org/noomorph/github-user-rank-extension/status.svg)](https://david-dm.org/noomorph/github-user-rank-extension)
[![Dev Dependencies Status](https://david-dm.org/noomorph/github-user-rank-extension/dev-status.svg)](https://david-dm.org/noomorph/github-user-rank-extension?type=dev)
[![Issue Count](https://codeclimate.com/github/noomorph/github-user-rank-extension/badges/issue_count.svg)](https://codeclimate.com/github/noomorph/github-user-rank-extension)
[![Coverage Status](https://coveralls.io/repos/github/noomorph/github-user-rank-extension/badge.svg)](https://coveralls.io/github/noomorph/github-user-rank-extension)

<hr />

Install **GitHub User Rank** extension from [Chrome Web Store](https://chrome.google.com/webstore/detail/github-user-rank/oabhkjmpcnkeifhahnlhafajeoofhjak) or [Mozilla Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/github-user-rank-extension/).

Yet another small content script, based on [gitlance.net](http://beta.gitlance.net) data,
it adds rankings straight to GitHub user profiles so you don't have to go anywhere anymore.

### Building

Like a typical NodeJS-based project, it requires a couple of commands to get started:

```
npm install
npm run package
```

At the end, you should be able to see `dist` folder built aside `src`.

### Installing

* Go to `chrome://extensions` and turn on a *Developer Mode* (a checkbox on top).
* Click `Load unpacked extension...` button and choose your built `dist` folder.

### Usage

* Open any GitHub user profile (e.g. [@noomorph](https://github.com/noomorph))
* You should be able to see GitLance stats of the person, below to the profile picture:

![GitHub User Rank extension screenshot](https://github.com/noomorph/github-user-rank-extension/raw/master/docs/images/profile-screenshot.png "GitHub User Rank extension screenshot")
