// Anti-flash: set background before first paint
document.documentElement.style.backgroundColor = '#1a1816';

// Color mapping for inline SVG fills set by Statuspage JS
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
  rects.forEach(rect => {
    const fill = rect.getAttribute('fill');
    if (COLOR_MAP[fill]) {
      rect.setAttribute('fill', COLOR_MAP[fill]);
    }
  });
}

function applyDarkToElement(el) {
  // Recolor inline SVG rects
  if (el.querySelectorAll) {
    recolorSVG(el);
  }

  // Handle tooltip injections
  if (el.id === 'uptime-tooltip' || el.classList?.contains('tippy-box')) {
    el.style.backgroundColor = '#2e2c2a';
    el.style.color = '#e8e4de';
    el.style.borderColor = '#3a3734';
  }

  // Handle subscribe modal
  if (el.classList?.contains('modal-content') || el.classList?.contains('modal-dialog')) {
    el.style.backgroundColor = '#242220';
    el.style.color = '#e8e4de';
  }
}

// Observe DOM mutations for dynamically injected elements
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        applyDarkToElement(node);
      }
    }
  }
});

if (document.body) {
  recolorSVG(document.body);
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    recolorSVG(document.body);
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
