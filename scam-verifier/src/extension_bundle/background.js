// background.js — CampusGuard Service Worker
// Handles captureVisibleTab (can only be called from background context)
// and relays keyboard shortcut commands to content scripts.

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'CAPTURE_TAB') {
    // Capture the visible area of the currently active tab
    chrome.tabs.captureVisibleTab(
      null, // current window
      { format: 'png', quality: 95 },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ dataUrl });
        }
      }
    );
    return true; // Keep the message channel open for async response
  }
});

// Forward keyboard shortcut command to active tab's content script
chrome.commands.onCommand.addListener((command) => {
  if (command === 'start-snip') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'START_SNIP' });
      }
    });
  }
});
