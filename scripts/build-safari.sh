#!/bin/bash
# Convert web extension to Safari app extension
# Requires: Xcode with Safari web extension support

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
EXT_DIR="$PROJECT_DIR/extension"
BUILD_DIR="$PROJECT_DIR/build"

mkdir -p "$BUILD_DIR"

if ! command -v xcrun &>/dev/null; then
  echo "Error: Xcode command line tools required"
  exit 1
fi

echo "Converting extension for Safari…"
xcrun safari-web-extension-converter \
  --swift \
  --macos-only \
  --force \
  --no-open \
  --project-location "$BUILD_DIR" \
  "$EXT_DIR"

echo ""
echo "Safari project created at: $BUILD_DIR/"
echo "Open in Xcode: open $BUILD_DIR/Claude Status Dark/Claude Status Dark.xcodeproj"
