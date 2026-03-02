const API_URL = 'https://status.claude.com/api/v2/summary.json';

const STATUS_LABELS = {
  operational: 'Operational',
  degraded_performance: 'Degraded',
  partial_outage: 'Partial Outage',
  major_outage: 'Major Outage',
  under_maintenance: 'Maintenance',
};

const OVERALL_LABELS = {
  none: 'All Systems Operational',
  minor: 'Minor System Issues',
  major: 'Major System Outage',
  critical: 'Critical System Outage',
  maintenance: 'Under Maintenance',
};

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function clearChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function createPlaceholder(text, className) {
  const div = document.createElement('div');
  div.className = className || 'loading-placeholder';
  div.textContent = text;
  return div;
}

function renderOverallStatus(status) {
  const el = document.getElementById('overall-status');
  const indicator = status?.indicator || 'none';
  const description = status?.description || OVERALL_LABELS[indicator] || 'Unknown';

  el.className = `overall-status status-${indicator === 'none' ? 'operational' : indicator}`;
  el.querySelector('.status-text').textContent = description;
}

function renderComponents(components) {
  const list = document.getElementById('components-list');
  clearChildren(list);

  // Filter out page-level component
  const items = components.filter(c => !c.group_id || c.group_id === null);
  const topLevel = items.filter(c => c.group === false || !c.group);

  if (topLevel.length === 0) {
    list.appendChild(createPlaceholder('No components found'));
    return;
  }

  topLevel.forEach(comp => {
    const row = document.createElement('div');
    row.className = 'component-row';

    const name = document.createElement('span');
    name.className = 'component-name';
    name.textContent = comp.name;

    const badge = document.createElement('span');
    badge.className = `component-badge ${comp.status}`;
    badge.textContent = STATUS_LABELS[comp.status] || comp.status;

    row.appendChild(name);
    row.appendChild(badge);
    list.appendChild(row);
  });
}

function renderIncidents(incidents) {
  const section = document.getElementById('incidents-section');
  const list = document.getElementById('incidents-list');

  if (!incidents || incidents.length === 0) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  clearChildren(list);

  incidents.forEach(inc => {
    const item = document.createElement('div');
    item.className = 'incident-item';

    const name = document.createElement('div');
    name.className = 'incident-name';
    name.textContent = inc.name;

    const status = document.createElement('div');
    status.className = `incident-status incident-impact-${inc.impact || 'minor'}`;
    status.textContent = inc.status ? inc.status.charAt(0).toUpperCase() + inc.status.slice(1) : '';

    const time = document.createElement('div');
    time.className = 'incident-time';
    time.textContent = `Started ${timeAgo(inc.created_at)}`;

    item.appendChild(name);
    item.appendChild(status);
    item.appendChild(time);
    list.appendChild(item);
  });
}

function updateTimestamp() {
  document.getElementById('last-updated').textContent = `Updated ${new Date().toLocaleTimeString()}`;
}

async function fetchAndRender() {
  try {
    const res = await fetch(API_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    renderOverallStatus(data.status);
    renderComponents(data.components || []);
    renderIncidents(data.incidents || []);
    updateTimestamp();
  } catch (e) {
    const list = document.getElementById('components-list');
    clearChildren(list);
    list.appendChild(createPlaceholder(`Failed to load status: ${e.message}`, 'error-message'));
  }
}

// Open status page in new tab
document.getElementById('open-page').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: 'https://status.claude.com' });
});

// Initial load
fetchAndRender();
