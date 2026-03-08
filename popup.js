import { getProfiles, setActiveProfileId } from "./storage.js";

const profileSelect = document.getElementById("profileSelect");
const fillButton = document.getElementById("fillButton");
const statusEl = document.getElementById("status");
const openOptionsBtn = document.getElementById("openOptions");

async function loadProfiles() {
  const profiles = await getProfiles();
  profileSelect.innerHTML = "";

  if (!profiles.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No profiles yet";
    profileSelect.appendChild(opt);
    fillButton.disabled = true;
    statusEl.textContent = "Open settings to create a profile.";
    return;
  }

  for (const p of profiles) {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.label || p.fullName || "Profile";
    profileSelect.appendChild(opt);
  }

  fillButton.disabled = false;
  statusEl.textContent = "";
}

fillButton.addEventListener("click", async () => {
  const profileId = profileSelect.value;
  const profiles = await getProfiles();
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) {
    statusEl.textContent = "No profile selected.";
    return;
  }

  await setActiveProfileId(profile.id);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.id) return;

    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "FILL_FROM_PROFILE",
        profile: {
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          headline: profile.headline,
          linkedIn: profile.linkedIn,
          github: profile.github,
          portfolio: profile.portfolio,
          summary: profile.summary,
        },
      },
      () => {
        statusEl.textContent = "Attempted to fill visible fields.";
      }
    );
  });
});

openOptionsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

loadProfiles();

