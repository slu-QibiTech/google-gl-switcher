const glInput = document.getElementById("gl");
const statusEl = document.getElementById("status");
const saveBtn = document.getElementById("save");

async function load() {
  const { gl } = await chrome.storage.sync.get(["gl"]);
  glInput.value = (gl || "us").toLowerCase();
}

async function save() {
  const gl = (glInput.value || "us").trim().toLowerCase();
  await chrome.storage.sync.set({ gl });
  statusEl.textContent = `Saved gl=${gl}`;
  setTimeout(() => (statusEl.textContent = ""), 1500);
}

saveBtn.addEventListener("click", save);
load();
