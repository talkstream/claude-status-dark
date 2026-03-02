.PHONY: icons safari install dev clean

icons:
	@bash scripts/generate-icons.sh

safari: icons
	@bash scripts/build-safari.sh

install: safari
	@echo "Opening Xcode project…"
	@open build/Claude\ Status\ Dark/Claude\ Status\ Dark.xcodeproj

dev:
	@echo "Loading unpacked extension in Chrome:"
	@echo "  1. Open chrome://extensions"
	@echo "  2. Enable Developer mode"
	@echo "  3. Click 'Load unpacked' → select extension/"
	@echo ""
	@echo "For Safari: make install"

clean:
	@rm -rf build/
	@echo "Build directory cleaned."
