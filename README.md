# Super 369 - Chrome Extension

Download and use it

Super 369 is a Chrome extension that allows you to instantly summarize the content of any web page using Google's Gemini API. With just a click, you can get a brief, detailed, or bullet-point summary of the article or page you're viewing, and easily copy the generated summary for further use.

---

## Features

- **One-click Summarization:** Get summaries of web articles or pages directly from your browser.
- **Multiple Summary Types:** Choose between brief, detailed, or bullet-point summaries.
- **Copy to Clipboard:** Easily copy the generated summary with a single click.
- **Customizable API Key:** Securely store your Gemini API key using Chrome's extension storage.
- **Modern UI:** Sleek and easy-to-use interface.

---

## Installation

1. **Clone or Download this Repository:**
   ```
   git clone https://github.com/Suman-369/ExtensionForChrome.git
   ```
   Or download the ZIP and extract it.

2. **Load the Extension in Chrome:**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click on "Load unpacked"
   - Select the extracted project directory

---

## Usage

1. **Set Gemini API Key:**
   - After installation, the Options page will open automatically if no API key is set.
   - Enter your Gemini API key (get one from [Google Gemini](https://aistudio.google.com/apikey)).
   - Click "Save".

2. **Summarize Any Web Page:**
   - Click the Super 369 extension icon in your Chrome toolbar.
   - Select the summary type (`Brief`, `Detailed`, or `Bullet Points`).
   - Click "Summarize".
   - The summary will appear in the extension popup.
   - Click "Copy" to copy the summary to your clipboard.

---

## Screenshots

> _Add screenshots here if desired._

---

## Development

- The extension is built with vanilla JavaScript, HTML, and CSS.
- Main files:
  - `popup.js` - Handles the popup logic and summary generation.
  - `background.js` - Manages extension install and storage.
  - `options.js` / `option.html` - Options page for API key configuration.
  - `content.js` - Extracts page content for summarization.

---

## API Usage

- The extension requires a Gemini API key to function.
- No data is sent to any server except Google Gemini for summarization.

---

## Contributing

Feel free to open issues or submit pull requests for improvements or new features!

---

## License

[MIT License](LICENSE)

---

## Credits

Developed by [Suman-369](https://github.com/Suman-369)
