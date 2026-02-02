const DEFAULT_GL = "us";

chrome.action.onClicked.addListener(async (tab) => {
  try {
    if (!tab?.url) return;

    const url = new URL(tab.url);

    // Only apply on Google Search result pages
    const isGoogleDomain = /(^|\.)google\./i.test(url.hostname);
    const isSearchPath = url.pathname === "/search";

    if (!isGoogleDomain || !isSearchPath) {
      return;
    }

    // Load saved region code
    const { gl } = await chrome.storage.sync.get(["gl"]);
    const targetGl = (gl || DEFAULT_GL).trim().toLowerCase();

    // Set or replace gl param
    url.searchParams.set("gl", targetGl);

    // Open in a new tab
    chrome.tabs.create({
      url: url.toString(),
      index: tab.index + 1 // opens next to current tab
    });

  } catch (e) {
    console.error("Failed to open new region tab:", e);
  }
});
