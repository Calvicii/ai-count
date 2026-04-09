chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;

  chrome.tabs.executeScript(tabId, { file: "content.js" }, () => {
    if (chrome.runtime.lastError) {
      document.getElementById("ai_count").textContent = "N/A";
      return;
    }

    chrome.tabs.sendMessage(tabId, {}, (response) => {
      const count = response ? response.aiCount : 0;
      document.getElementById("ai_count").textContent = count;

      chrome.browserAction.setBadgeText({ text: String(count) });
      chrome.browserAction.setBadgeBackgroundColor({ color: "#e74c3c" });
    });
  });
});
