<p align="center">
  <b style="font-size:48px; color:#c8a97a;">✦</b><br>
  <strong>Claude Status Dark</strong>
</p>

<p align="center">
  <a href="https://github.com/talkstream/claude-status-dark/releases"><img src="https://img.shields.io/github/v/release/talkstream/claude-status-dark?style=flat-square&color=c8a97a" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License: MIT"></a>
  <a href="https://talkstream.github.io/claude-status-dark/"><img src="https://img.shields.io/badge/install-two%20clicks-8cc63f?style=flat-square" alt="Install"></a>
</p>

<p align="center">
  Dark mode for <a href="https://status.claude.com">status.claude.com</a> — because checking if Claude is down<br>
  shouldn't also burn your retinas.
</p>

<p align="center">
  <strong><a href="https://talkstream.github.io/claude-status-dark/">Install in two clicks &rarr;</a></strong>
</p>

---

## Before / After

| Before (ouch) | After (ahh) |
|:-:|:-:|
| Blinding white at 2 AM | Warm dark palette, easy on the eyes |
| `#FAF9F5` background | `#1a1816` background |
| Stock statuspage colors | Hand-tuned warm tones |

## Install

**[One-click install from the landing page](https://talkstream.github.io/claude-status-dark/)** — detects your browser, guides you through two steps.

> Works with **Safari** (Userscripts), **Chrome**, **Edge**, **Brave** (Tampermonkey), and **Firefox** (Tampermonkey).

### Or load the extension directly

**Chrome / Edge / Brave:**
1. Clone or download this repo
2. Open `chrome://extensions` → enable **Developer mode**
3. **Load unpacked** → select the `extension/` directory

**Firefox:**
1. Open `about:debugging#/runtime/this-firefox`
2. **Load Temporary Add-on** → select `extension/manifest.json`

**Safari (native build):**
```bash
make install   # requires Xcode + librsvg
```

## Features

- **Warm dark theme** — not cold gray, a hand-tuned palette inspired by Claude's design language
- **Status popup** — real-time component monitoring via Atlassian Statuspage API
- **Badge alerts** — `!` / `!!` / `!!!` on the extension icon when issues are detected
- **Auto-polling** — checks every 2 minutes, so you don't have to
- **Anti-flash** — dark background injected before first paint, no white blink
- **Full coverage** — main page, `/history`, `/incidents/*`, modals, tooltips, SVG bars

## Color Palette

| Original | Dark | Purpose |
|---|---|---|
| `#FAF9F5` | `#1a1816` | Page background |
| `#FFFFFF` | `#242220` | Component cards |
| `#141413` | `#e8e4de` | Primary text |
| `#87867F` | `#9b9790` | Secondary text |
| `#DEDCD1` | `#3a3734` | Borders |
| `#76AD2A` | `#8cc63f` | Operational (green) |
| `#FAA72A` | `#fbb44c` | Minor (yellow) |
| `#E86235` | `#f07850` | Major (orange) |
| `#E04343` | `#ef5555` | Critical (red) |
| `#2C84DB` | `#4a9ce8` | Maintenance (blue) |
| — | `#c8a97a` | Accent (warm gold) |

## Architecture

```
claude-status-dark/
  extension/
    manifest.json         MV3 manifest (cross-browser)
    content.css           Dark theme — 14 selector groups, ~650 lines
    content.js            MutationObserver for dynamic SVG/tooltips/modals
    background.js         Service worker — alarm polling, badge updates
    popup/                Status popup (360x480, warm dark theme)
      popup.html
      popup.css
      popup.js
    icons/                SVG source + generated PNGs (16/32/48/128)
  userscript/
    claude-status-dark.user.js   Standalone userscript (dark mode only)
  docs/                   GitHub Pages — install landing page
    index.html            Landing page with install wizard
    claude-status-dark.user.js   Userscript copy (correct MIME type)
  scripts/                Build automation (icon gen, Safari conversion)
  Makefile                icons / safari / install / clean
```

## Build from Source

```bash
make icons     # Generate PNGs from SVG (requires librsvg)
make safari    # Convert to Safari Web Extension (macOS only)
make install   # Build + open in Xcode
make clean     # Remove build artifacts
```

## Why This Exists

Vibe-coded at 2 AM while Claude was down. The irony of staring at a blinding white status page to find out when your AI assistant would come back was too much. So I made it dark.

The warm palette isn't random — it's inspired by Claude's own design language. Gold accents (`#c8a97a`), muted earth tones, and careful contrast ratios make the page pleasant even when the news isn't.

## Contributing

Issues and pull requests are welcome. Please test in at least one browser before submitting.

## License

[MIT](LICENSE)

---

<p align="center">
  <sub>Made with ✦ for Claude users who deserve better than a white screen at midnight</sub>
</p>
