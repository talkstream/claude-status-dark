const API_URL = 'https://status.claude.com/api/v2/status.json';
const ALARM_NAME = 'claude-status-poll';
const POLL_INTERVAL = 2; // minutes

// Badge config per indicator
const BADGE_MAP = {
  none:        { text: '',    bg: '#8cc63f' },
  minor:       { text: '!',   bg: '#fbb44c' },
  major:       { text: '!!',  bg: '#f07850' },
  critical:    { text: '!!!', bg: '#ef5555' },
  maintenance: { text: 'M',   bg: '#4a9ce8' },
};

async function pollStatus() {
  try {
    const res = await fetch(API_URL, { cache: 'no-cache' });
    if (!res.ok) return;

    const data = await res.json();
    const indicator = data.status?.indicator || 'none';

    // Cache for popup
    await chrome.storage.local.set({
      lastStatus: data,
      lastPoll: Date.now(),
    });

    // Update badge
    const badge = BADGE_MAP[indicator] || BADGE_MAP.none;
    await chrome.action.setBadgeText({ text: badge.text });
    await chrome.action.setBadgeBackgroundColor({ color: badge.bg });
  } catch (e) {
    // Network error — keep previous badge
    console.warn('Claude Status poll failed:', e.message);
  }
}

// Initial poll on install/startup
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: POLL_INTERVAL });
  pollStatus();
});

chrome.runtime.onStartup.addListener(() => {
  pollStatus();
});

// Periodic poll
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === ALARM_NAME) {
    pollStatus();
  }
});
