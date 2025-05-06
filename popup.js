document.getElementById("summarize-button").addEventListener("click", () => {
  const resultDiv = document.getElementById("result");
  const summaryTypeSelect = document.getElementById("summary-type");
  const summaryType = summaryTypeSelect ? summaryTypeSelect.value : "brief";

  resultDiv.innerHTML = "<div class='loader'></div>";

  // Get API key from Chrome storage
  chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      resultDiv.textContent = "❌ No API key found. Please set it in the extension options.";
      return;
    }

    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.id) {
        resultDiv.textContent = "❌ Unable to find active tab.";
        return;
      }

      // Request article text from content script
      chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, async (response) => {
        const articleText = response?.articleText;

        if (!articleText) {
          resultDiv.textContent = "❌ No article text found. Please try again.";
          return;
        }

        try {
          const summary = await getGeminiSummary(articleText, summaryType, geminiApiKey);
          resultDiv.textContent = summary;
        } catch (error) {
          resultDiv.textContent = "❌ Error: " + error.message;
        }
      });
    });
  });
});

// Gemini Summary Function
async function getGeminiSummary(rawText, type, apiKey) {
  const maxLength = 20000;
  const text = rawText.length > maxLength ? rawText.slice(0, maxLength) + "..." : rawText;

  const promptMap = {
    brief: `Summarize in 2-3 sentences:\n\n${text}`,
    detailed: `Give a detailed summary:\n\n${text}`,
    bullet: `Summarize in 5-7 bullet points (start each line with "-"):\n\n${text}`,
  };

  const prompt = promptMap[type] || promptMap["brief"];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 },
      }),
    }
  );

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({}));
    throw new Error(error?.message || "Unknown error occurred while summarizing.");
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary found.";
}

// Copy-to-Clipboard Handler
document.getElementById("copy-btn").addEventListener("click", () => {
  const text = document.getElementById("result").innerText;
  if (!text.trim()) return;

  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById("copy-btn");
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 2000);
  }).catch(err => {
    console.error("❌ Failed to copy text: ", err);
  });
});
