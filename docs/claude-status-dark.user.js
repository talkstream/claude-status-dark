// ==UserScript==
// @name         Claude Status Dark
// @namespace    https://github.com/talkstream/claude-status-dark
// @version      1.0.0
// @description  Dark mode for status.claude.com — warm palette inspired by Claude
// @author       talkstream
// @match        https://status.claude.com/*
// @run-at       document-start
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function() {
  'use strict';

  // Anti-flash
  document.documentElement.style.backgroundColor = '#1a1816';

  // Inject dark theme CSS
  const css = `
/* Page background */
html, body, body.page-status {
  background-color: #1a1816 !important;
  color: #e8e4de !important;
}
.layout-content.status.status-full {
  background-color: #1a1816 !important;
}

/* Masthead */
.masthead {
  background-color: #242220 !important;
  border-bottom: 1px solid #3a3734 !important;
}
.masthead .masthead-logo img,
.masthead .masthead-logo svg {
  filter: brightness(0) invert(1) sepia(0.1) saturate(0.5) brightness(0.9);
}
.masthead-title, .masthead .page-title {
  color: #e8e4de !important;
}

/* Status banner */
.page-status .status-day .status-day-text,
.status-page .metric-value {
  color: #e8e4de !important;
}
.page-status .page-status-indicator { border-radius: 8px; }
.page-status .page-status-indicator.status-none { background-color: #2a6b1a !important; color: #e8e4de !important; }
.page-status .page-status-indicator.status-minor { background-color: #7a5a10 !important; color: #e8e4de !important; }
.page-status .page-status-indicator.status-major { background-color: #8a3a1a !important; color: #e8e4de !important; }
.page-status .page-status-indicator.status-critical { background-color: #8a1a1a !important; color: #e8e4de !important; }
.page-status .page-status-indicator.status-maintenance { background-color: #1a4a7a !important; color: #e8e4de !important; }

/* Component cards */
.component-container, .components-section, .components-section .component-inner-container {
  background-color: #242220 !important;
  border-color: #3a3734 !important;
}
.components-section .component-inner-container.status-green { border-left-color: #8cc63f !important; }
.component-group-name, .component-name, .component-group .component-group-name { color: #e8e4de !important; }
.component-group { background-color: #242220 !important; border-color: #3a3734 !important; }
.component-group .component-group-header { background-color: #2a2826 !important; border-bottom-color: #3a3734 !important; }
.component-group .component-inner-container { border-top-color: #3a3734 !important; }

/* Status colors */
.component-status { color: #9b9790 !important; }
.component-status.component-status-operational, .status-operational { color: #8cc63f !important; }
.component-status.component-status-degraded_performance, .status-degraded_performance { color: #fbb44c !important; }
.component-status.component-status-partial_outage, .status-partial_outage { color: #f07850 !important; }
.component-status.component-status-major_outage, .status-major_outage { color: #ef5555 !important; }
.component-status.component-status-under_maintenance, .status-under_maintenance { color: #4a9ce8 !important; }

/* Uptime bars */
.uptime-today-container { background-color: #242220 !important; border-color: #3a3734 !important; }
.uptime-day { background-color: #5a5852 !important; }
.uptime-day.uptime-day-operational { background-color: #8cc63f !important; }
.uptime-day.uptime-day-degraded-performance { background-color: #fbb44c !important; }
.uptime-day.uptime-day-partial-outage { background-color: #f07850 !important; }
.uptime-day.uptime-day-major-outage { background-color: #ef5555 !important; }
.uptime-day.uptime-day-maintenance { background-color: #4a9ce8 !important; }
.uptime-day.uptime-day-none { background-color: #5a5852 !important; }
.uptime-percent, .uptime-percent-text, .uptime-timeframe-boundary { color: #9b9790 !important; }

/* SVG rect recoloring */
svg rect[fill="#76ad2a"], svg rect[fill="#76AD2A"] { fill: #8cc63f !important; }
svg rect[fill="#faa72a"], svg rect[fill="#FAA72A"] { fill: #fbb44c !important; }
svg rect[fill="#e86235"], svg rect[fill="#E86235"] { fill: #f07850 !important; }
svg rect[fill="#e04343"], svg rect[fill="#E04343"] { fill: #ef5555 !important; }
svg rect[fill="#2c84db"], svg rect[fill="#2C84DB"] { fill: #4a9ce8 !important; }
svg rect[fill="#b0aea5"], svg rect[fill="#B0AEA5"] { fill: #5a5852 !important; }
svg rect[fill="#dedcd1"], svg rect[fill="#DEDCD1"] { fill: #3a3734 !important; }

/* Tooltips */
#uptime-tooltip, .tooltip, .tooltip-inner, .tippy-box {
  background-color: #2e2c2a !important;
  color: #e8e4de !important;
  border: 1px solid #3a3734 !important;
  border-radius: 6px !important;
}
.tippy-arrow::before, .tooltip .tooltip-arrow::before {
  border-top-color: #2e2c2a !important;
  border-bottom-color: #2e2c2a !important;
}

/* Incidents */
.incidents-list, .incident-container, .incidents-unresolved { background-color: transparent !important; }
.incident-title a, .incident-title { color: #e8e4de !important; }
.incident-title a:hover { color: #c8a97a !important; }
.incident-update-body, .incident-body, .incident-update-body p, .incident-body p { color: #9b9790 !important; }
.incident-update-title, .incident-update .update-title { color: #e8e4de !important; }
.incident-update .update-timestamp, .incident-timestamp, .incident-date { color: #9b9790 !important; }
.status-day .border-color { border-color: #3a3734 !important; }
.incident-history-date { color: #9b9790 !important; }
.incident-history-content { border-color: #3a3734 !important; }
.scheduled-incidents-container, .scheduled-incident-inner-container { background-color: #242220 !important; border-color: #3a3734 !important; }

/* Links & buttons */
a { color: #4a9ce8 !important; }
a:hover { color: #c8a97a !important; }
.btn, button.btn { background-color: #3a3734 !important; color: #e8e4de !important; border-color: #4a4844 !important; }
.btn:hover, button.btn:hover { background-color: #4a4844 !important; color: #e8e4de !important; }
.btn-subscribe { background-color: #3a3734 !important; color: #e8e4de !important; }

/* Modals */
.modal-content, .modal-dialog .modal-content {
  background-color: #242220 !important; color: #e8e4de !important; border-color: #3a3734 !important;
}
.modal-header { background-color: #2a2826 !important; border-bottom-color: #3a3734 !important; color: #e8e4de !important; }
.modal-header .close, .modal-header button.close { color: #9b9790 !important; }
.modal-body { color: #e8e4de !important; }
.modal-footer { background-color: #2a2826 !important; border-top-color: #3a3734 !important; }
.modal-backdrop { background-color: #0a0908 !important; }
input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea, select {
  background-color: #1a1816 !important; color: #e8e4de !important; border-color: #3a3734 !important;
}
input::placeholder, textarea::placeholder { color: #5a5852 !important; }

/* Footer */
.page-footer, .layout-footer {
  background-color: #1a1816 !important; border-top: 1px solid #3a3734 !important; color: #9b9790 !important;
}
.page-footer a, .layout-footer a { color: #9b9790 !important; }
.page-footer a:hover, .layout-footer a:hover { color: #c8a97a !important; }
.powered-by a { color: #9b9790 !important; }

/* Scrollbar */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: #1a1816; }
::-webkit-scrollbar-thumb { background: #3a3734; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #4a4844; }

/* Selection */
::selection { background-color: #4a3a2a !important; color: #e8e4de !important; }
:focus-visible { outline-color: #c8a97a !important; }

/* History page */
.history-date, .history-item-date { color: #9b9790 !important; }
.history-item, .month-container { border-color: #3a3734 !important; }
hr, .separator { border-color: #3a3734 !important; }

/* Tabs */
.tab-container { border-bottom-color: #3a3734 !important; }
.tab-container .tab { color: #9b9790 !important; }
.tab-container .tab.active { color: #e8e4de !important; border-bottom-color: #c8a97a !important; }
`;

  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
  } else {
    const style = document.createElement('style');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  // Color mapping for inline SVG fills
  const COLOR_MAP = {
    '#76ad2a': '#8cc63f', '#76AD2A': '#8cc63f',
    '#faa72a': '#fbb44c', '#FAA72A': '#fbb44c',
    '#e86235': '#f07850', '#E86235': '#f07850',
    '#e04343': '#ef5555', '#E04343': '#ef5555',
    '#2c84db': '#4a9ce8', '#2C84DB': '#4a9ce8',
    '#b0aea5': '#5a5852', '#B0AEA5': '#5a5852',
    '#dedcd1': '#3a3734', '#DEDCD1': '#3a3734',
  };

  function recolorSVG(root) {
    const rects = root.querySelectorAll('svg rect[fill]');
    rects.forEach(function(rect) {
      const fill = rect.getAttribute('fill');
      if (COLOR_MAP[fill]) {
        rect.setAttribute('fill', COLOR_MAP[fill]);
      }
    });
  }

  function applyDarkToElement(el) {
    if (el.querySelectorAll) recolorSVG(el);
    if (el.id === 'uptime-tooltip' || (el.classList && el.classList.contains('tippy-box'))) {
      el.style.backgroundColor = '#2e2c2a';
      el.style.color = '#e8e4de';
      el.style.borderColor = '#3a3734';
    }
    if (el.classList && (el.classList.contains('modal-content') || el.classList.contains('modal-dialog'))) {
      el.style.backgroundColor = '#242220';
      el.style.color = '#e8e4de';
    }
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
