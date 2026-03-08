# Job Application Plugin – Chrome Extension

Smart, configurable job application assistant that helps you fill in common fields on job forms using a reusable profile.

## Key Features

- **Profile-based autofill**  
  - Store your name, contact info, links (GitHub, LinkedIn, portfolio), location, and work preferences.  
  - Add multiple **profiles** (e.g. “Software Engineer”, “Data Analyst”) and switch between them.

- **Context-aware form helper**  
  - Content script scans the current page for common fields (name, email, phone, LinkedIn, GitHub, portfolio, location, headline).  
  - Uses a mapping layer to match different label/placeholder text (e.g. “Full Name”, “Your name”, “Legal name”) to the right profile field.  
  - Only fills when you click **“Fill from profile”** in the popup (no auto-submit).

- **Per-site configuration**  
  - Optional site rules to tweak behavior on specific domains (e.g. which profile to use by default).

- **Privacy-first**  
  - All data stored locally in Chrome `storage.sync` or `storage.local`.  
  - No network requests are made by default.

## Structure

- `manifest.json` – Chrome extension manifest (v3).
- `background.js` – Extension service worker, manages messaging and storage helpers.
- `contentScript.js` – Runs in the page, finds and fills fields based on messages from the popup.
- `popup.html` / `popup.js` / `popup.css` – Small control panel to pick a profile and trigger fill.
- `options.html` / `options.js` / `options.css` – Profile editor and site configuration UI.
- `storage.js` – Wrapper around `chrome.storage` with typed helpers.
- `mapping.js` – Field-detection logic (label/placeholder matching).

## How to load in Chrome

1. Open Chrome and go to `chrome://extensions/`.
2. Turn on **Developer mode** (top right).
3. Click **“Load unpacked”** and select the `job-application-helper` folder.
4. The extension icon should appear in the toolbar; pin it for quick access.

## Basic Usage

1. Open the **Options** page from the extension menu and create at least one profile.  
2. Navigate to a job application form in your browser.  
3. Click the extension icon to open the popup, choose your profile, and click **“Fill from profile”**.  
4. Review and adjust the filled fields before submitting (you stay in full control).


