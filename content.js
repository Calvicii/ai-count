chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const text = document.body.innerText;
  const matches = text.match(/\bAI\b/g);
  sendResponse({ aiCount: matches ? matches.length : 0 });
});
