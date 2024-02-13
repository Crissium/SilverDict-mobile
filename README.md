# Description

[![Crowdin](https://badges.crowdin.net/silverdict-mobile/localized.svg)](https://crowdin.com/project/silverdict-mobile)

[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
	alt="Get it on F-Droid"
	height="80">](https://f-droid.org/packages/com.gmail.blandilyte.silverdict)

[Guide](https://github.com/Crissium/SilverDict/wiki/android)

This is the mobile (Android ~~& iOS~~) client of [SilverDict](https://github.com/Crissium/SilverDict), considered feature-complete now.

I cannot develop the iOS version because I don't have a Mac or a 99 USD/year Apple Developer account. If you would like to help, please contact me.

# Roadmap

- [x] Basic UI (Search, History/Suggestion, Settings, etc.)
- [x] Go back/forwards in local history
- [x] Zoom in/out and remember the zoom level
- [x] Find in page
- [x] Tap to search
- [x] Dictionary/Group management
- [ ] Two-column view on wider screens
- [x] Localisation
- [ ] Launch SilverDict from context menu (that is, when you select a word in another app, you can choose to search for it in SilverDict. Also this would make it integrate better with e-book readers.)

## Issues

- [ ] Dynamic screen width in WebView (if you rotate from portrait to landscape, the WebView will not be resized)
- [ ] The WebView takes too long to load (1 - 300 ms). When the entire Dark Reader library is loaded, the minimum could be as long as 100 ms.

# Development

## Prerequisites

- React Native (without Expo), Android SDK, Xcode, etc.
- A working SilverDict server for testing
- React Native Paper
- React Navigation

## Build

```bash
yarn install
yarn start
yarn android
```

## Note

The [Dark Reader extension](/src/components/QueryScreen/darkreader.js) is taken from the NPM package, uglified and turned into a string to make it injectable into the WebView.

There has been a huge update to the web UI recently, which might supersede this project completely, since it doesn't have any Android system integration yet…
