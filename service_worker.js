const DEFAULT_GL = "us"; // fallback if user hasn't set anything

chrome.action.onClicked.addListener(async (tab) => {
  try {
    if (!tab?.url) return;

    const url = new URL(tab.url);

    // Only operate on Google Search result pages: /search
    // (You can relax this if you want it to apply to other Google pages.)
    const isGoogleDomain = /(^|\.)google\./i.test(url.hostname);
    const isSearchPath = url.pathname === "/search";

    if (!isGoogleDomain || !isSearchPath) {
      // Not a Google Search results page; do nothing.
      return;
    }

    const { gl } = await chrome.storage.sync.get(["gl"]);
    const targetGl = (gl || DEFAULT_GL).trim().toLowerCase();

    // Set or replace gl
    url.searchParams.set("gl", targetGl);

    // Optional: if you ALSO want interface language, you could do:
    // url.searchParams.set("hl", "ja");

    await chrome.tabs.update(tab.id, { url: url.toString() });
  } catch (e) {
    // Keep it quiet; extensions shouldn't spam users.
    console.error("Failed to switch region:", e);
  }
});
