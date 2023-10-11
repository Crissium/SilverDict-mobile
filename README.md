# Description

This is the mobile (Android & iOS) client of [SilverDict](https://github.com/Crissium/SilverDict), still under active development.

# Roadmap

- [x] Basic UI (Search, History/Suggestion, Settings, etc.)
- [x] Go back/forwards in local history
- [x] Zoom in/out and remember the zoom level
- [x] Find in page
- [x] Tap to search
- [ ] Dictionary/Group management
- [ ] Better dark mode support in the WebView

For an envisaged project structure, please refer to the [mindmap](/doc/Structure.mm), drawn with FreePlane.

# Development

## Prerequisites

- React Native without Expo, Android SDK, Xcode, etc.
- A working SilverDict server for testing
- React Native Paper
- React Navigation

## Build

```bash
yarn install
yarn start
yarn android
```
