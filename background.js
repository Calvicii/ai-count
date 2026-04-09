chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    !tab.url.startsWith("chrome://")
  ) {
    console.log("Injecting into tab:", tab.url);
    chrome.tabs.executeScript(tabId, { file: "content.js" }, () => {
      if (chrome.runtime.lastError) {
        return;
      }

      chrome.tabs.sendMessage(tabId, {}, (response) => {
        if (chrome.runtime.lastError) {
          return;
        }
        const count = response ? response.aiCount : 0;
        chrome.browserAction.setBadgeText({ text: String(count), tabId });
        chrome.browserAction.setBadgeBackgroundColor({
          color: "#e74c3c",
          tabId,
        });
      });
    });
  }
});
