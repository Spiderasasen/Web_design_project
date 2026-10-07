"use strict";
const heatmap = document.querySelector("#heatmap");
if (heatmap) {
  // A deterministic illustrative dataset, not live GitHub activity.
  const contributions = new Map();
  const days = Array.from({ length: 365 }, (_, index) => index);
  days.sort((a, b) => ((a * 137) % 367) - ((b * 137) % 367));
  days.slice(0, 128).forEach((day, index) => contributions.set(day, index < 74 ? 7 : 6));
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 371; index += 1) {
    const cell = document.createElement("span");
    cell.className = "heat-cell";
    const day = index - 3; // January 1, 2025 falls on Wednesday.
    if (day < 0 || day >= 365) {
      cell.style.visibility = "hidden";
    } else {
      const count = contributions.get(day) || 0;
      cell.dataset.level = count ? String(1 + (day % 4)) : "0";
      const date = new Date(Date.UTC(2025, 0, day + 1));
      cell.title = `${date.toISOString().slice(0, 10)}: ${count} sample contributions`;
    }
    fragment.appendChild(cell);
  }
  heatmap.appendChild(fragment);
}
const search = document.querySelector("#repo-search");
const language = document.querySelector("#language-filter");
if (search && language) {
  const rows = [...document.querySelectorAll(".repo-row")];
  function filterRepositories() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach(row => {
      const matches = row.dataset.search.includes(query) &&
        (language.value === "all" || row.dataset.language === language.value);
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    document.querySelector("#result-count").textContent = `${visible} ${visible === 1 ? "project" : "projects"}`;
    document.querySelector("#empty-results").hidden = visible !== 0;
  }
  document.querySelector("#result-count").setAttribute("aria-live", "polite");
  search.addEventListener("input", filterRepositories);
  language.addEventListener("change", filterRepositories);
}

// Demo personalization only: this is not authentication or access control.
const demoSessionKey = "codefolio-demo-username";
let demoUsername = null;
try {
  demoUsername = sessionStorage.getItem(demoSessionKey);
} catch {
  // Guest browsing remains available when browser storage is restricted.
}
if (demoUsername && /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/.test(demoUsername) && demoUsername.length <= 39) {
  document.querySelectorAll(".avatar").forEach(avatar => {
    avatar.textContent = demoUsername[0].toUpperCase();
    avatar.setAttribute("aria-label", `${demoUsername}'s overview`);
  });
  const handle = document.querySelector(".handle");
  if (handle) handle.textContent = `@${demoUsername}`;
  const profileAvatar = document.querySelector(".profile-avatar");
  if (profileAvatar) profileAvatar.firstChild.textContent = demoUsername[0].toUpperCase();
  const badge = document.querySelector(".demo-badge");
  if (badge) badge.textContent = `Demo · @${demoUsername}`;
  document.querySelectorAll(".auth-link").forEach(link => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button secondary auth-link logout-button";
    button.textContent = "Log out";
    button.addEventListener("click", () => {
      try { sessionStorage.removeItem(demoSessionKey); } catch { /* No session to clear. */ }
      window.location.assign("index.html");
    });
    link.replaceWith(button);
  });
  if (document.body.classList.contains("home")) {
    const notice = document.createElement("p");
    notice.className = "session-notice";
    notice.textContent = `Welcome, ${demoUsername}. You're exploring a demo workspace with sample data.`;
    document.querySelector("main").prepend(notice);
  }
}
const loginForm = document.querySelector("#demo-login");
if (loginForm) {
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector("#login-username");
    input.value = input.value.trim();
    if (!loginForm.reportValidity()) return;
    try {
      sessionStorage.setItem(demoSessionKey, input.value);
      window.location.assign("index.html");
    } catch {
      const error = document.querySelector("#login-error");
      error.textContent = "Your browser cannot save this demo session. You can continue as a guest below.";
      error.hidden = false;
    }
  });
}
