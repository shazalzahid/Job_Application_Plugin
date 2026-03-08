// storage.js - small typed wrapper around chrome.storage

const STORAGE_KEYS = {
  PROFILES: "profiles",
  ACTIVE_PROFILE_ID: "activeProfileId",
  SITE_RULES: "siteRules",
};

/**
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string} label
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {string} headline
 * @property {string} linkedIn
 * @property {string} github
 * @property {string} portfolio
 * @property {string} summary
 */

/**
 * @returns {Promise<Profile[]>}
 */
export async function getProfiles() {
  const result = await chrome.storage.sync.get([STORAGE_KEYS.PROFILES]);
  return result[STORAGE_KEYS.PROFILES] || [];
}

/**
 * @param {Profile[]} profiles
 */
export async function saveProfiles(profiles) {
  await chrome.storage.sync.set({ [STORAGE_KEYS.PROFILES]: profiles });
}

export async function getActiveProfileId() {
  const result = await chrome.storage.sync.get([STORAGE_KEYS.ACTIVE_PROFILE_ID]);
  return result[STORAGE_KEYS.ACTIVE_PROFILE_ID] || null;
}

export async function setActiveProfileId(id) {
  await chrome.storage.sync.set({ [STORAGE_KEYS.ACTIVE_PROFILE_ID]: id });
}

export async function getSiteRules() {
  const result = await chrome.storage.sync.get([STORAGE_KEYS.SITE_RULES]);
  return result[STORAGE_KEYS.SITE_RULES] || [];
}

export async function saveSiteRules(rules) {
  await chrome.storage.sync.set({ [STORAGE_KEYS.SITE_RULES]: rules });
}

