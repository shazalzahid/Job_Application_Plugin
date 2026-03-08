// contentScript.js - runs in the context of each page
import { FIELD_TYPES, inferFieldType } from "./mapping.js";

/**
 * Collect candidate input/textarea elements with metadata.
 */
function collectFormFields() {
  /** @type {Array<{el: HTMLElement, label: string, placeholder: string, fieldType: string|null}>} */
  const fields = [];

  const inputs = Array.from(
    document.querySelectorAll("input[type='text'], input[type='email'], input[type='url'], input[type='tel'], textarea")
  );

  for (const el of inputs) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) continue;
    const placeholder = el.placeholder || "";

    let labelText = "";
    const id = el.id;
    if (id) {
      const label = document.querySelector(`label[for='${CSS.escape(id)}']`);
      if (label) labelText = label.textContent || "";
    }
    if (!labelText) {
      const parentLabel = el.closest("label");
      if (parentLabel) labelText = parentLabel.textContent || "";
    }

    const fieldType = inferFieldType(labelText, placeholder);

    fields.push({ el, label: labelText, placeholder, fieldType });
  }

  return fields;
}

/**
 * @param {Record<string,string>} profileData
 */
function fillFromProfile(profileData) {
  const fields = collectFormFields();

  for (const f of fields) {
    if (!f.fieldType) continue;
    const value = profileData[f.fieldType];
    if (!value) continue;

    const el = /** @type {HTMLInputElement|HTMLTextAreaElement} */ (f.el);
    if (el.value && el.value.trim().length > 0) continue; // don't overwrite

    el.focus();
    el.value = value;

    // Trigger events so frameworks notice
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message && message.type === "FILL_FROM_PROFILE") {
    fillFromProfile(message.profile || {});
    sendResponse({ ok: true });
  }
});

