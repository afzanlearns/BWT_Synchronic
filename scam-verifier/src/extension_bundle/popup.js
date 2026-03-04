// popup.js — CampusGuard Popup
// Handles: settings save/load, triggering snip mode, displaying stats.

// ─── Load saved settings & stats on open ─────────────────────────────────────
chrome.storage.local.get(
  ['groqApiKey', 'sensitivity', 'enabled', 'scamCount', 'susCount', 'totalCount'],
  (data) => {
    if (data.groqApiKey) document.getElementById('apiKey').value = data.groqApiKey;
    if (data.sensitivity) document.getElementById('sensitivity').value = data.sensitivity;
    if (data.enabled === false) document.getElementById('enabled').checked = false;

    document.getElementById('scamCount').textContent = data.scamCount || 0;
    document.getElementById('susCount').textContent = data.susCount || 0;
    document.getElementById('totalCount').textContent = data.totalCount || 0;
  }
);

// ─── Save settings ────────────────────────────────────────────────────────────
document.getElementById('save').addEventListener('click', () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  const sensitivity = document.getElementById('sensitivity').value;
  const enabled = document.getElementById('enabled').checked;
  const statusEl = document.getElementById('status');

  if (!apiKey) {
    statusEl.style.color = '#e63946';
    statusEl.textContent = '⚠️ Please enter a Groq API key.';
    return;
  }
  if (!apiKey.startsWith('gsk_')) {
    statusEl.style.color = '#f4a261';
    statusEl.textContent = '⚠️ Key should start with gsk_';
    return;
  }

  chrome.storage.local.set({ groqApiKey: apiKey, sensitivity, enabled }, () => {
    statusEl.style.color = '#25d366';
    statusEl.textContent = '✅ Saved!';
    setTimeout(() => { statusEl.textContent = ''; }, 2000);
  });
});

// ─── Snip & Check button ──────────────────────────────────────────────────────
document.getElementById('snipBtn').addEventListener('click', () => {
  chrome.storage.local.get(['groqApiKey', 'enabled'], ({ groqApiKey, enabled }) => {
    const statusEl = document.getElementById('status');

    // Guard: extension must be enabled
    if (enabled === false) {
      statusEl.style.color = '#e63946';
      statusEl.textContent = '⚠️ Extension is disabled.';
      return;
    }

    // Guard: API key must be set
    if (!groqApiKey) {
      statusEl.style.color = '#e63946';
      statusEl.textContent = '⚠️ Enter your API key first!';
      return;
    }

    // Send START_SNIP to the active tab's content script, then close popup
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) return;
      chrome.tabs.sendMessage(tabs[0].id, { type: 'START_SNIP' }, () => {
        // Close popup so the user can see the page to draw on
        window.close();
      });
    });
  });
});

// ─── Reset stats ──────────────────────────────────────────────────────────────
document.getElementById('resetStats').addEventListener('click', () => {
  chrome.storage.local.set({ scamCount: 0, susCount: 0, totalCount: 0 }, () => {
    document.getElementById('scamCount').textContent = 0;
    document.getElementById('susCount').textContent = 0;
    document.getElementById('totalCount').textContent = 0;
  });
});
