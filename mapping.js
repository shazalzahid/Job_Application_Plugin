// mapping.js - heuristic mapping between profile fields and form fields

export const FIELD_TYPES = {
  FULL_NAME: "fullName",
  EMAIL: "email",
  PHONE: "phone",
  LOCATION: "location",
  HEADLINE: "headline",
  LINKEDIN: "linkedIn",
  GITHUB: "github",
  PORTFOLIO: "portfolio",
  SUMMARY: "summary",
};

const LABEL_KEYWORDS = {
  [FIELD_TYPES.FULL_NAME]: ["full name", "name", "legal name"],
  [FIELD_TYPES.EMAIL]: ["email", "e-mail"],
  [FIELD_TYPES.PHONE]: ["phone", "mobile", "telephone"],
  [FIELD_TYPES.LOCATION]: ["location", "city", "current location"],
  [FIELD_TYPES.HEADLINE]: ["headline", "title", "position"],
  [FIELD_TYPES.LINKEDIN]: ["linkedin"],
  [FIELD_TYPES.GITHUB]: ["github"],
  [FIELD_TYPES.PORTFOLIO]: ["portfolio", "website", "personal site"],
  [FIELD_TYPES.SUMMARY]: ["summary", "about you", "about", "profile"],
};

/**
 * @param {string} text
 * @returns {string}
 */
function normalize(text) {
  return (text || "").toLowerCase().trim();
}

/**
 * Try to guess field type based on label or placeholder text.
 * @param {string} labelText
 * @param {string} placeholder
 * @returns {string|null}
 */
export function inferFieldType(labelText, placeholder) {
  const source = normalize(labelText || placeholder);
  if (!source) return null;

  for (const [fieldType, keywords] of Object.entries(LABEL_KEYWORDS)) {
    for (const kw of keywords) {
      if (source.includes(kw)) {
        return fieldType;
      }
    }
  }

  // Basic fallbacks
  if (source.includes("@") && source.includes("email")) return FIELD_TYPES.EMAIL;
  if (source.includes("http") && source.includes("linkedin")) return FIELD_TYPES.LINKEDIN;
  if (source.includes("http") && source.includes("github")) return FIELD_TYPES.GITHUB;

  return null;
}

