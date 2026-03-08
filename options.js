import { getProfiles, saveProfiles } from "./storage.js";

const listEl = document.getElementById("profilesList");
const addBtn = document.getElementById("addProfile");
const tmpl = document.getElementById("profileTemplate");

function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random().toString(16).slice(2);
}

async function renderProfiles() {
  const profiles = await getProfiles();
  listEl.innerHTML = "";

  if (!profiles.length) {
    const empty = document.createElement("p");
    empty.textContent = "No profiles yet. Click “New profile” to create one.";
    empty.style.fontSize = "13px";
    empty.style.color = "#6b7280";
    listEl.appendChild(empty);
    return;
  }

  for (const p of profiles) {
    const node = tmpl.content.firstElementChild.cloneNode(true);

    const labelInput = node.querySelector(".profile__label");
    const fullNameInput = node.querySelector(".js-fullName");
    const emailInput = node.querySelector(".js-email");
    const phoneInput = node.querySelector(".js-phone");
    const locationInput = node.querySelector(".js-location");
    const headlineInput = node.querySelector(".js-headline");
    const linkedInInput = node.querySelector(".js-linkedIn");
    const githubInput = node.querySelector(".js-github");
    const portfolioInput = node.querySelector(".js-portfolio");
    const summaryInput = node.querySelector(".js-summary");

    labelInput.value = p.label || "";
    fullNameInput.value = p.fullName || "";
    emailInput.value = p.email || "";
    phoneInput.value = p.phone || "";
    locationInput.value = p.location || "";
    headlineInput.value = p.headline || "";
    linkedInInput.value = p.linkedIn || "";
    githubInput.value = p.github || "";
    portfolioInput.value = p.portfolio || "";
    summaryInput.value = p.summary || "";

    const saveBack = () => {
      p.label = labelInput.value.trim();
      p.fullName = fullNameInput.value.trim();
      p.email = emailInput.value.trim();
      p.phone = phoneInput.value.trim();
      p.location = locationInput.value.trim();
      p.headline = headlineInput.value.trim();
      p.linkedIn = linkedInInput.value.trim();
      p.github = githubInput.value.trim();
      p.portfolio = portfolioInput.value.trim();
      p.summary = summaryInput.value.trim();
      saveProfiles(profiles);
    };

    node.addEventListener("input", () => {
      saveBack();
    });

    node.querySelector(".js-delete-profile").addEventListener("click", async () => {
      const newList = profiles.filter((x) => x.id !== p.id);
      await saveProfiles(newList);
      renderProfiles();
    });

    listEl.appendChild(node);
  }
}

addBtn.addEventListener("click", async () => {
  const profiles = await getProfiles();
  profiles.push({
    id: uuid(),
    label: "New profile",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    linkedIn: "",
    github: "",
    portfolio: "",
    summary: "",
  });
  await saveProfiles(profiles);
  renderProfiles();
});

renderProfiles();

