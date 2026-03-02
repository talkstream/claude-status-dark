#!/bin/bash
# Generate PNG icons from SVG source
# Uses rsvg-convert (preferred) or qlmanage (macOS fallback)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ICONS_DIR="$PROJECT_DIR/extension/icons"
SVG="$ICONS_DIR/icon.svg"

generate_with_rsvg() {
  for SIZE in 16 32 48 128; do
    OUTPUT="$ICONS_DIR/icon-${SIZE}.png"
    rsvg-convert -w "$SIZE" -h "$SIZE" "$SVG" -o "$OUTPUT"
    echo "Generated $OUTPUT"
  done
}

generate_with_qlmanage() {
  local TMPDIR
  TMPDIR="$(mktemp -d)"
  for SIZE in 16 32 48 128; do
    OUTPUT="$ICONS_DIR/icon-${SIZE}.png"
    qlmanage -t -s "$SIZE" -o "$TMPDIR" "$SVG" >/dev/null 2>&1
    mv "$TMPDIR/icon.svg.png" "$OUTPUT"
    echo "Generated $OUTPUT"
  done
  rm -rf "$TMPDIR"
}

if command -v rsvg-convert &>/dev/null; then
  echo "Using rsvg-convert…"
  generate_with_rsvg
elif command -v qlmanage &>/dev/null; then
  echo "Using qlmanage (macOS fallback)…"
  generate_with_qlmanage
else
  echo "Error: No SVG converter found."
  echo "Install rsvg-convert: brew install librsvg"
  exit 1
fi

echo "Done."
