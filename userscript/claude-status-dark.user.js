// ==UserScript==
// @name         Claude Status Dark
// @namespace    https://github.com/talkstream/claude-status-dark
// @version      1.0.0
// @description  Dark mode for status.claude.com — warm palette inspired by Claude
// @author       talkstream
// @match        https://status.claude.com/*
// @match        https://talkstream.github.io/claude-status-dark/*
// @run-at       document-start
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function() {
  'use strict';

  // Signal presence to the landing page
  document.documentElement.setAttribute('data-claude-status-dark', 'installed');

  // On the landing page, only signal — don't inject theme CSS
  if (location.hostname === 'talkstream.github.io') return;

  // Anti-flash
  document.documentElement.style.backgroundColor = '#1a1816';

  // Inject dark theme CSS
  var css = `
/* Page background */
html, body, body.status, body.status.index {
  background-color: #1a1816 !important;
  color: #e8e4de !important;
}
.layout-content.status, .layout-content.status.status-index,
.layout-content.status.status-index.starter, .layout-content.status.status-full,
.layout-content.status.status-full-history {
  background-color: #1a1816 !important;
}
.color-primary, .color-primary:hover { color: #e8e4de !important; }
.color-secondary, small { color: #9b9790 !important; }
.border-color, body.status .layout-content.status .border-color { border-color: #3a3734 !important; }

/* Masthead */
.masthead, .masthead.has-logo, .masthead-container, .masthead-container.basic {
  background-color: #242220 !important;
  border-bottom: 1px solid #3a3734 !important;
}
.masthead .logo-container img, .masthead .logo-container svg {
  filter: brightness(0) invert(1) sepia(0.1) saturate(0.5) brightness(0.9);
}
.show-updates-dropdown, .subscribe-text-full, .subscribe-text-short {
  color: #e8e4de !important; border-color: #3a3734 !important;
}
.updates-dropdown, .updates-dropdown-section, div[id^="updates-dropdown"] .updates-dropdown-section {
  background-color: #242220 !important; color: #e8e4de !important;
}
.updates-dropdown-nav { background-color: #2a2826 !important; border-bottom-color: #3a3734 !important; }
.updates-dropdown-nav a { color: #9b9790 !important; }
.updates-dropdown-nav a[aria-selected="true"], .updates-dropdown-nav a:hover { color: #e8e4de !important; }
.updates-dropdown .icon-container { filter: invert(0.85) sepia(0.1); }
.updates-dropdown .directions { color: #9b9790 !important; }

/* Overall status banner */
.page-status.status-none { background-color: #2a6b1a !important; color: #e8e4de !important; }
.page-status.status-minor { background-color: #7a5a10 !important; color: #e8e4de !important; }
.page-status.status-major { background-color: #8a3a1a !important; color: #e8e4de !important; }
.page-status.status-critical { background-color: #8a1a1a !important; color: #e8e4de !important; }
.page-status.status-maintenance { background-color: #1a4a7a !important; color: #e8e4de !important; }

/* Unresolved incidents */
.unresolved-incidents { background-color: transparent !important; }
.unresolved-incident { background-color: #242220 !important; border-radius: 8px !important; }
.unresolved-incident.impact-none { border: 1px solid #3a5a2a !important; }
.unresolved-incident.impact-minor { background-color: #2e2518 !important; border: 1px solid #6a5520 !important; }
.unresolved-incident.impact-minor .incident-title { background-color: #3a3018 !important; color: #fbb44c !important; }
.unresolved-incident.impact-major { background-color: #2e1c14 !important; border: 1px solid #6a3a1a !important; }
.unresolved-incident.impact-major .incident-title { background-color: #3a2218 !important; color: #f07850 !important; }
.unresolved-incident.impact-critical { background-color: #2e1414 !important; border: 1px solid #6a1a1a !important; }
.unresolved-incident.impact-critical .incident-title { background-color: #3a1818 !important; color: #ef5555 !important; }
.unresolved-incident.impact-maintenance { background-color: #1a2230 !important; border: 1px solid #2a4a6a !important; }
.unresolved-incident.impact-maintenance .incident-title { background-color: #1a2838 !important; color: #4a9ce8 !important; }
.unresolved-incident .incident-title { color: #e8e4de !important; border-radius: 8px 8px 0 0 !important; }
.unresolved-incident .incident-title a.actual-title { color: inherit !important; }
.unresolved-incident .incident-title .subscribe { color: #9b9790 !important; }
.unresolved-incident .incident-title .subscribe:hover { color: #e8e4de !important; }
.unresolved-incident .updates {
  background-color: #242220 !important; border-color: #3a3734 !important;
  color: #e8e4de !important; border-radius: 0 0 8px 8px !important;
}
.unresolved-incident .updates .update { color: #e8e4de !important; }
.unresolved-incident .updates .update strong { color: #e8e4de !important; }
.unresolved-incident .updates .update .whitespace-pre-wrap { color: #9b9790 !important; }
.unresolved-incident .updates small { color: #5a5852 !important; }

/* Component list */
.components-section, .components-section.font-regular { background-color: #1a1816 !important; }
.components-container, .components-container.one-column { background-color: #1a1816 !important; }
.component-container, .component-container.border-color {
  background-color: #242220 !important; border-color: #3a3734 !important;
}
.component-inner-container { background-color: #242220 !important; border-color: #3a3734 !important; }
.component-inner-container .name { color: #e8e4de !important; }
.component-inner-container.status-green .component-status,
.component-inner-container.status-green .icon-indicator { color: #8cc63f !important; }
.component-inner-container.status-yellow .component-status,
.component-inner-container.status-yellow .icon-indicator { color: #fbb44c !important; }
.component-inner-container.status-orange .component-status,
.component-inner-container.status-orange .icon-indicator { color: #f07850 !important; }
.component-inner-container.status-red .component-status,
.component-inner-container.status-red .icon-indicator { color: #ef5555 !important; }
.component-inner-container.status-blue .component-status,
.component-inner-container.status-blue .icon-indicator { color: #4a9ce8 !important; }
.component-group-name { color: #e8e4de !important; }
.child-components-container { background-color: #1e1c1a !important; border-color: #3a3734 !important; }
.components-uptime-link, .history-footer-link { color: #9b9790 !important; }
.components-uptime-link a, .history-footer-link a { color: #4a9ce8 !important; }

/* Uptime bars (SVG) */
.shared-partial.uptime-90-days-wrapper { background-color: #1a1816 !important; }
.legend .legend-item { color: #9b9790 !important; border-color: #3a3734 !important; }
svg rect[fill="#76AD2A"], svg rect[fill="#76ad2a"] { fill: #8cc63f !important; }
svg rect[fill="#FAA72A"], svg rect[fill="#faa72a"] { fill: #fbb44c !important; }
svg rect[fill="#E86235"], svg rect[fill="#e86235"] { fill: #f07850 !important; }
svg rect[fill="#E04343"], svg rect[fill="#e04343"] { fill: #ef5555 !important; }
svg rect[fill="#2C84DB"], svg rect[fill="#2c84db"] { fill: #4a9ce8 !important; }
svg rect[fill="#B0AEA5"], svg rect[fill="#b0aea5"] { fill: #5a5852 !important; }
svg rect[fill="#DEDCD1"], svg rect[fill="#dedcd1"] { fill: #3a3734 !important; }
svg rect[fill="#FAF9F5"], svg rect[fill="#faf9f5"] { fill: #1a1816 !important; }

/* Tooltips */
#uptime-tooltip, #uptime-tooltip .tooltip-box {
  background-color: #2e2c2a !important; color: #e8e4de !important; border-color: #3a3734 !important;
}
#uptime-tooltip .pointer-container .pointer-larger { border-bottom-color: #3a3734 !important; }
#uptime-tooltip .pointer-container .pointer-smaller { border-bottom-color: #2e2c2a !important; }
#uptime-tooltip .tooltip-box .tooltip-content { color: #e8e4de !important; }
#uptime-tooltip .tooltip-box .outage-field { background-color: #242220 !important; border-color: #3a3734 !important; }

/* Past incidents */
.incidents-list .incident-container { border-color: #3a3734 !important; }
.incident-title.impact-none a { color: #e8e4de !important; }
.incident-title.impact-minor a, .incidents-list .incident-title.impact-minor a { color: #fbb44c !important; }
.incident-title.impact-major a, .incidents-list .incident-title.impact-major a { color: #f07850 !important; }
.incident-title.impact-critical a, .incidents-list .incident-title.impact-critical a { color: #ef5555 !important; }
.incident-title.impact-maintenance a, .incidents-list .incident-title.impact-maintenance a { color: #4a9ce8 !important; }
.status-day .update-title a { color: #e8e4de !important; }
.status-day .update-body { color: #9b9790 !important; }

/* Links & buttons */
a { color: #4a9ce8 !important; }
a:hover { color: #c8a97a !important; }
.flat-button { background-color: #3a3734 !important; color: #e8e4de !important; border-color: #4a4844 !important; }
.flat-button:hover { background-color: #4a4844 !important; color: #e8e4de !important; }
.grouped-items-selector { background-color: #242220 !important; }
.grouped-items-selector .grouped-item, .grouped-item-label { color: #9b9790 !important; }
.grouped-items-selector .grouped-item.active { color: #e8e4de !important; }

/* Modals */
.modal, .modal .modal-content, div[id^="subscribe-modal"] {
  background-color: #242220 !important; color: #e8e4de !important; border-color: #3a3734 !important;
}
div[id^="subscribe-modal"] .modal-header, .modal-header {
  background-color: #2a2826 !important; border-bottom-color: #3a3734 !important; color: #e8e4de !important;
}
.modal-header .close { color: #9b9790 !important; }
.modal-body { color: #e8e4de !important; background-color: #242220 !important; }
div[id^="subscribe-modal"] .modal-footer, .modal-footer, .modal-footer.incident-subscribe {
  background-color: #2a2826 !important; border-top-color: #3a3734 !important;
}
.modal-backdrop { background-color: #0a0908 !important; }
input[type="text"], input[type="email"], input[type="tel"], input[type="url"],
textarea, select, .phone-country, .full-width {
  background-color: #1a1816 !important; color: #e8e4de !important; border-color: #3a3734 !important;
}
input::placeholder, textarea::placeholder { color: #5a5852 !important; }
.terms_and_privacy_information, .terms_and_privacy_information a, .help-block { color: #5a5852 !important; }

/* Footer */
.page-footer, .layout-footer, body.status .layout-content .page-footer {
  background-color: #1a1816 !important; border-top: 1px solid #3a3734 !important; color: #9b9790 !important;
}
.page-footer a { color: #9b9790 !important; }
.page-footer a:hover { color: #c8a97a !important; }

/* Scrollbar */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: #1a1816; }
::-webkit-scrollbar-thumb { background: #3a3734; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #4a4844; }

/* Selection */
::selection { background-color: #4a3a2a !important; color: #e8e4de !important; }
:focus-visible { outline-color: #c8a97a !important; }

/* History page */
.layout-content.status.status-full-history .history-nav a { color: #9b9790 !important; }
.layout-content.status.status-full-history .history-nav a.current { color: #e8e4de !important; background-color: #242220 !important; }
.month .incident-container { border-color: #3a3734 !important; }
.month .incident-container .impact-none { color: #e8e4de !important; }
.month .incident-container .impact-minor { color: #fbb44c !important; }
.month .incident-container .impact-major { color: #f07850 !important; }
.month .incident-container .impact-critical { color: #ef5555 !important; }
hr { border-color: #3a3734 !important; }

/* Incident detail page */
.layout-content.status.status-incident { background-color: #1a1816 !important; }
.incident-name { color: #e8e4de !important; }
.incident-name.impact-minor { color: #fbb44c !important; }
.incident-name.impact-major { color: #f07850 !important; }
.incident-name.impact-critical { color: #ef5555 !important; }
.timeframes-container .timeframe { color: #9b9790 !important; }
.timeframes-container .timeframe.active { color: #e8e4de !important; }
`;

  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
  } else {
    var style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  // Color mapping for inline SVG fills
  var COLOR_MAP = {
    '#76ad2a': '#8cc63f', '#76AD2A': '#8cc63f',
    '#faa72a': '#fbb44c', '#FAA72A': '#fbb44c',
    '#e86235': '#f07850', '#E86235': '#f07850',
    '#e04343': '#ef5555', '#E04343': '#ef5555',
    '#2c84db': '#4a9ce8', '#2C84DB': '#4a9ce8',
    '#b0aea5': '#5a5852', '#B0AEA5': '#5a5852',
    '#dedcd1': '#3a3734', '#DEDCD1': '#3a3734',
  };

  function recolorSVG(root) {
    var rects = root.querySelectorAll('svg rect[fill]');
    rects.forEach(function(rect) {
      var fill = rect.getAttribute('fill');
      if (COLOR_MAP[fill]) {
        rect.setAttribute('fill', COLOR_MAP[fill]);
      }
    });
  }

  function applyDarkToElement(el) {
    if (el.querySelectorAll) recolorSVG(el);
  }

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          applyDarkToElement(node);
        }
      });
    });
  });

  if (document.body) {
    recolorSVG(document.body);
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      recolorSVG(document.body);
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
