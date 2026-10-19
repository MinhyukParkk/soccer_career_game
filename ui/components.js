// Small rendering helpers and storage shared by every page.
// Browser-only: the engine itself never touches the DOM or storage.

import { getClub, clubStars } from "../engine/clubInfo.js";
import { roleLabel } from "../engine/squad.js";
import { ovrBand } from "../engine/rating.js";
import { PLAYER_VERSION } from "../engine/player.js";

// ---------------------------------------------------------------- storage

// The career in progress lives in localStorage so closing the tab doesn't
// lose it. Saving a finished career to history is a separate, explicit
// choice (see careerHistory.js).
const CAREER_KEY = "careerManagerCareer";

export function loadCareer() {
  try {
    const raw = localStorage.getItem(CAREER_KEY);
    if (!raw) return null;
    const player = JSON.parse(raw);
    return player?.version === PLAYER_VERSION ? player : null;
  } catch {
    return null;
  }
}

export function saveCareer(player) {
  try {
    localStorage.setItem(CAREER_KEY, JSON.stringify(player));
    return true;
  } catch {
    return false;
  }
}

export function clearCareer() {
  try {
    localStorage.removeItem(CAREER_KEY);
  } catch {
    /* storage unavailable */
  }
}

// ---------------------------------------------------------------- html

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

export function crestHtml(clubOrId, size = 44) {
  const club = typeof clubOrId === "string" ? getClub(clubOrId) : clubOrId;
  if (!club) return `<span class="crest" style="--size:${size}px" aria-hidden="true">?</span>`;
  return `<span class="crest" style="--c:${esc(club.color ?? "#e4d9bf")};--t:${esc(club.text ?? "#1d1e19")};--size:${size}px" aria-hidden="true">${esc(club.short)}</span>`;
}

export function ovrHtml(ovr, { small = false, id = "" } = {}) {
  return `<span class="ovr band-${ovrBand(ovr)}${small ? " small" : ""}"${id ? ` id="${id}"` : ""}><span class="num">${ovr}</span><span class="lbl">OVR</span></span>`;
}

export function roleChipHtml(roleId, age) {
  return `<span class="role-chip role-${roleId}">${esc(roleLabel(roleId, age))}</span>`;
}

export function starsHtml(club) {
  const stars = clubStars(club);
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (stars >= i) html += "★";
    else if (stars >= i - 0.5) html += `<span class="half">★</span>`;
    else html += `<span class="off">★</span>`;
  }
  return `<span class="stars" title="${stars} out of 5" aria-label="${stars} out of 5 stars">${html}</span>`;
}

export const tagHtml = (tag) => `<span class="tag ${esc(tag.tone ?? "info")}">${esc(tag.text)}</span>`;

export const tagsHtml = (tags) => `<span class="tags">${tags.map(tagHtml).join("")}</span>`;

// Rows from describeChoice(): one row per possible outcome.
export function outcomeRowsHtml(rows) {
  return rows
    .map(
      (row) =>
        `<div class="outcome-row">${row.chance != null ? `<span class="chance">${row.chance}%</span>` : ""}${tagsHtml(row.tags)}</div>`,
    )
    .join("");
}

export function honourChipsHtml(honours) {
  return honours
    .map((h) => `<span class="honour ${h.kind === "award" ? "award" : "trophy"}" title="${esc(h.name)}">${esc(h.short ?? h.name)}</span>`)
    .join("");
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------- motion

export const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reducedMotion() ? 0 : ms));

// Counts an OVR badge from one value to another, recolours it for its new
// band, pulses, and floats a "+3" / "-2" chip next to it.
export async function animateOvr(badge, from, to) {
  if (!badge || from === to) return;
  const num = badge.querySelector(".num");
  const steps = Math.abs(to - from);
  const dir = to > from ? 1 : -1;
  const stepTime = Math.max(60, Math.min(160, 900 / steps));
  const setBand = (value) => {
    badge.classList.remove("band-base", "band-bronze", "band-silver", "band-gold", "band-elite");
    badge.classList.add(`band-${ovrBand(value)}`);
  };

  badge.querySelector(".delta-float")?.remove();
  const chip = document.createElement("span");
  chip.className = `delta-float ${dir > 0 ? "up" : "down"}`;
  chip.textContent = `${dir > 0 ? "+" : "−"}${steps}`;
  badge.appendChild(chip);
  badge.classList.remove("pulse-up", "pulse-down");
  void badge.offsetWidth;
  badge.classList.add(dir > 0 ? "pulse-up" : "pulse-down");

  if (reducedMotion()) {
    num.textContent = to;
    setBand(to);
    return;
  }
  for (let value = from + dir; dir > 0 ? value <= to : value >= to; value += dir) {
    num.textContent = value;
    setBand(value);
    await wait(stepTime);
  }
}