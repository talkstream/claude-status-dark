# Claude Status Dark — Project Guide

## Overview

Dark mode for status.claude.com — Chrome/Firefox/Safari extension + userscript + GitHub Pages landing page.

**GitHub:** talkstream/claude-status-dark
**Landing page:** https://talkstream.github.io/claude-status-dark/

## Architecture

Three delivery methods, one codebase:

1. **Browser extension** (`extension/`) — MV3, full features (dark CSS + popup + badge alerts + auto-polling)
2. **Userscript** (`userscript/`) — dark CSS only, works via Tampermonkey/Userscripts
3. **Landing page** (`docs/`) — install wizard with browser detection, hosted on GitHub Pages

## Critical Files

| File | Purpose |
|------|---------|
| `extension/content.css` | Master dark theme — 14 selector groups targeting Atlassian Statuspage classes |
| `extension/content.js` | MutationObserver for dynamic SVG fills, tooltips, modals |
| `extension/background.js` | Service worker: alarm polling (2 min), badge text updates |
| `extension/popup/popup.js` | Fetches /api/v2/summary.json, renders components + incidents |
| `userscript/claude-status-dark.user.js` | Standalone: anti-flash + CSS injection + SVG recoloring |
| `docs/index.html` | Landing page with install wizard, share buttons, FAQ |

## Sync Rules

**content.css is the source of truth for all CSS rules.**

When editing CSS:
1. Edit `extension/content.css`
2. Manually sync changes into `userscript/claude-status-dark.user.js` (CSS is embedded in a template string)
3. Copy userscript to `docs/claude-status-dark.user.js`

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| bg-page | `#1a1816` | Page background |
| bg-card | `#242220` | Cards, modals |
| bg-elevated | `#2a2826` | Headers, footers |
| text-primary | `#e8e4de` | Primary text |
| text-secondary | `#9b9790` | Secondary text |
| text-muted | `#5a5852` | Timestamps, hints |
| border | `#3a3734` | All borders |
| border-hover | `#4a4844` | Hover borders |
| accent | `#c8a97a` | Warm gold — links hover, focus rings |
| green | `#8cc63f` | Operational |
| yellow | `#fbb44c` | Minor / degraded |
| orange | `#f07850` | Major outage |
| red | `#ef5555` | Critical |
| blue | `#4a9ce8` | Maintenance, links |

## Statuspage CSS Classes

Real class names used by Atlassian Statuspage (important — don't guess these):
- `.page-status.status-none` / `.status-minor` / `.status-major` / `.status-critical`
- `.component-inner-container.status-green` / `.status-yellow` / `.status-orange` / `.status-red` / `.status-blue`
- `.unresolved-incident.impact-none` / `.impact-minor` / `.impact-major` / `.impact-critical` / `.impact-maintenance`
- SVG fills are set inline: `#76AD2A`, `#FAA72A`, `#E86235`, `#E04343`, `#2C84DB`, `#B0AEA5`, `#DEDCD1`, `#FAF9F5`

## Testing

1. Chrome: `chrome://extensions` → Developer mode → Load unpacked → `extension/`
2. Open popup → verify loading animation, component list, refresh button
3. Visit status.claude.com → verify dark theme, no white flash, tooltips dark
4. Test subscribe modal → verify dark background, input focus styles
5. Landing page: open `docs/index.html` locally or via GitHub Pages

## Deploy

```bash
git add -A && git commit -m "..." && git push
```

GitHub Pages auto-deploys from `docs/` directory on push to main.

## macOS Notes

- `sed -i ''` (BSD sed)
- Icon generation requires `librsvg` (`brew install librsvg`)
- Safari build requires Xcode
