// Saved careers, kept in the browser's localStorage. A career is only
// saved when you press "Save to history" on the summary page.
// This file stays in ui/ because it uses browser storage; the engine
// itself never touches the browser.

import { getClub } from "../engine/clubInfo.js";

const STORAGE_KEY = "careerManagerHistory";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

// Older versions of the game saved a different shape. Map whatever is
// there onto the current one so old records still show up.
const OLD_LEGACY = { leyenda: "Legend", "world class": "World Class", "solid pro": "Established Pro", journeyman: "Journeyman" };

function countNames(names) {
  const counts = new Map();
  for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1);
  return [...counts].map(([name, count]) => ({ name, count }));
}

const recordId = (record, index) => record?.id ?? `legacy-${index}`;

function normalize(record, index) {
  if (record?.version === 2) return record;
  const r = record ?? {};
  const savedAt = typeof r.savedAt === "number" ? new Date(r.savedAt).toISOString() : r.savedAt ?? null;
  const lastClub = r.finalClubId ? getClub(r.finalClubId) : null;
  const honours = [...(r.collectiveTitles ?? []), ...(r.individualAwards ?? [])].filter((x) => typeof x === "string");
  const legacyLabel = OLD_LEGACY[String(r.legacyTier ?? "").toLowerCase()] ?? r.legacyTier ?? "";
  return {
    id: recordId(r, index),
    version: 1,
    savedAt,
    name: r.name ?? r.lastName ?? "Unknown",
    number: r.number ?? null,
    position: r.position ?? "",
    positionName: r.position ?? "",
    country: r.country ?? "",
    countryCode: r.countryCode ?? "",
    seasonsPlayed: r.seasonsPlayed ?? null,
    retirementAge: r.retirementAge ?? r.finalAge ?? null,
    peakOvr: r.peakOvr ?? r.finalOvr ?? 0,
    finalOvr: r.finalOvr ?? null,
    peakValue: r.peakValue ?? r.peakValueM ?? null,
    totals: { apps: r.totalMatches ?? 0, goals: r.totalGoals ?? 0, assists: r.totalAssists ?? 0, cleanSheets: 0 },
    intl: { caps: r.internationalCaps ?? 0, goals: 0 },
    trophyCount: (r.collectiveTitles ?? []).length,
    awardCount: (r.individualAwards ?? []).length,
    topHonours: countNames(honours).slice(0, 6),
    clubs: lastClub ? [{ id: lastClub.id, name: lastClub.name, short: lastClub.short, color: lastClub.color, text: lastClub.text }] : [],
    legacy: { id: "legacy", label: legacyLabel },
  };
}

export function getCareerHistory() {
  return readAll().map((record, index) => normalize(record, index));
}

export const isCareerSaved = (id) => readAll().some((record) => record?.id === id);

// Saves a record once; saving the same career again replaces it.
export function saveCareerRecord(record) {
  const list = readAll().filter((r) => r?.id !== record.id);
  list.unshift(record);
  return writeAll(list);
}

export function deleteCareerRecord(id) {
  return writeAll(readAll().filter((record, index) => recordId(record, index) !== id));
}

export function clearCareerHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}