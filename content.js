chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_ARTICLE_TEXT") {
    const articleText = document.body.innerText || "";
    sendResponse({ articleText });
  }
  return true; // Keep the message channel open for async response
});
