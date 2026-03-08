// background.js - service worker for messaging and simple logging
import { getProfiles, getActiveProfileId } from "./storage.js";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Job Application Helper installed.");
});

// Handle requests from popup for the active profile
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === "GET_ACTIVE_PROFILE") {
    (async () => {
      const profiles = await getProfiles();
      const activeId = await getActiveProfileId();
      const active =
        profiles.find((p) => p.id === activeId) || profiles.length > 0 ? profiles[0] : null;

      sendResponse({ profile: active });
    })();
    return true; // keep channel open for async response
  }
});

