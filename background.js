chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["geminiApiKey"],(result)=>{
    if (!result.geminiApiKey) {
      chrome.tabs.create({url: "option.html"});
    } else {
      console.log("Gemini API Key not set. Please set it in the extension options.");
    }
  });
});
