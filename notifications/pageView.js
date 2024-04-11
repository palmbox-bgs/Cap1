window.__wb_timing = {
  docStartAt: performance.now(),
  pageViewRequireAt: performance.now()
};

if (chrome.runtime.getManifest().manifest_version > 2) {
  // Store values that service worker analytics can't get without window object
  chrome.storage.local.set({
    window_devicePixelRatio: window.devicePixelRatio,
    window_screen: {
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      width: window.screen.width,
      height: window.screen.height,
    },
  });
}

chrome.runtime.sendMessage(
  {
    type: 'pageView',
    url: window.location.href,
    referrer: document.referrer,
    title: document.title
  },
  pageViewId => {
    window.__wb_page_view_id = pageViewId;
  }
);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'isCommonLoaded') {
    sendResponse({loaded: !!window.webpackJsonp});
  }
});
document.addEventListener('DOMContentLoaded', () => {
  window.__wb_timing.DOMContentLoadedAt = performance.now();
});
