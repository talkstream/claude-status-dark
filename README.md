# Claude Status Dark

[![Version](https://img.shields.io/github/v/release/talkstream/claude-status-dark)](https://github.com/talkstream/claude-status-dark/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Safari](https://img.shields.io/badge/Safari-compatible-brightgreen)](https://developer.apple.com/safari/extensions/)
[![Chrome](https://img.shields.io/badge/Chrome-compatible-brightgreen)](https://developer.chrome.com/docs/extensions/)
[![Firefox](https://img.shields.io/badge/Firefox-compatible-brightgreen)](https://addons.mozilla.org/en-US/firefox/extensions/)

Dark mode for [status.claude.com](https://status.claude.com) with a warm palette inspired by Claude's design language.

## Install — One Click

**[Install from our website](https://talkstream.github.io/claude-status-dark/)** — detects your browser, guides you through setup in 3 steps.

> Works with Safari (Userscripts), Chrome, Firefox, Edge (Tampermonkey).

## Features

- Warm dark theme (not cold gray) — 14 CSS override groups covering every page element
- Real-time status popup with component monitoring via Atlassian Statuspage API
- Badge indicator: shows `!`/`!!`/`!!!` on the extension icon when issues are detected
- Automatic polling every 2 minutes
- Works on all pages: main status, `/history`, `/incidents/*`
- Anti-flash: dark background applied before first paint
- MutationObserver handles dynamically injected tooltips, modals, and SVG elements

## Quick Install

### Safari (macOS)

```bash
git clone https://github.com/talkstream/claude-status-dark.git
cd claude-status-dark
make install
```

This generates icons, converts to a Safari web extension, and opens the Xcode project. Build and enable in Safari preferences.

**Requirements:** Xcode, `librsvg` (`brew install librsvg`)

### Chrome / Edge / Brave

1. Download the [latest release](https://github.com/talkstream/claude-status-dark/releases) or clone the repo
2. Open `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked** → select the `extension/` directory

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `extension/manifest.json`

### Userscript (Tampermonkey / Userscripts)

Install [claude-status-dark.user.js](https://raw.githubusercontent.com/talkstream/claude-status-dark/main/userscript/claude-status-dark.user.js) directly.

> **Note:** The userscript provides dark mode only (no popup or badge features).

## Build from Source

```bash
# Generate PNG icons from SVG
make icons

# Build Safari extension (macOS only)
make safari

# Build + open in Xcode
make install

# Clean build artifacts
make clean
```

## Color Palette

| Original | Dark | Purpose |
|---|---|---|
| `#FAF9F5` | `#1a1816` | Page background |
| `#FFFFFF` | `#242220` | Component cards |
| `#141413` | `#e8e4de` | Primary text |
| `#87867F` | `#9b9790` | Secondary text |
| `#DEDCD1` | `#3a3734` | Borders |
| `#76AD2A` | `#8cc63f` | Operational |
| `#FAA72A` | `#fbb44c` | Minor |
| `#E86235` | `#f07850` | Major |
| `#E04343` | `#ef5555` | Critical |
| `#2C84DB` | `#4a9ce8` | Maintenance |
| — | `#c8a97a` | Accent (links, hover) |

## Project Structure

```
extension/
  manifest.json       Manifest V3 (cross-browser)
  content.css         Dark theme (14 selector groups)
  content.js          MutationObserver for dynamic elements
  background.js       Service worker with alarm polling
  popup/              Status monitoring popup (360×480)
  icons/              SVG source + generated PNGs
userscript/           Standalone userscript variant
scripts/              Build automation
docs/                 GitHub Pages install landing page
```

## Contributing

Issues and pull requests are welcome. Please test in at least one browser before submitting.

## License

[MIT](LICENSE)
