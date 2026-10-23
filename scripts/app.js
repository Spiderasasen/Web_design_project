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
