// The player: a fresh 17-year-old with a name, a shirt number, a
// nationality and a position. Everything else (club, stats, honours) is
// built up by the career itself.
//
// The whole object is plain JSON so the web UI can keep it in
// sessionStorage between pages, and resume a career after a refresh.

import { ATTRIBUTES, POSITION_PROFILES } from "./positions.js";
import { adjustOverall, computeMarketValue, getOverall } from "./rating.js";
import { getCountry } from "./nations.js";
import { DEFAULT_PACE, PACES } from "./pace.js";
import { rand, randInt } from "./random.js";

export const START_AGE = 17;
export const PLAYER_VERSION = 2;
export const MAX_NAME_LENGTH = 16;

// Seasons start in July: in October 2026 the current season is 2026/27.
export function currentSeasonStartYear(date = new Date()) {
  return date.getMonth() >= 6 ? date.getFullYear() : date.getFullYear() - 1;
}

export function cleanLastName(raw) {
  return String(raw ?? "")
    .replace(/[^\p{L}\p{M}' .-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NAME_LENGTH);
}

const newId = () => `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export function createPlayer({ lastName, number, preferredFoot, countryCode, position, pace, startYear }) {
  const country = getCountry(countryCode) ?? getCountry("ENG");
  const pos = POSITION_PROFILES[position] ? position : "ST";
  const shirt = Math.min(99, Math.max(1, Math.round(Number(number) || 9)));
  const season = startYear ?? currentSeasonStartYear();

  const stats = {};
  for (const key of ATTRIBUTES) stats[key] = Math.round(rand(34, 56));

  const player = {
    id: newId(),
    version: PLAYER_VERSION,
    identity: {
      lastName: cleanLastName(lastName) || "Player",
      number: shirt,
      preferredFoot: preferredFoot === "left" ? "left" : "right",
      country: country.name,
      countryCode: country.code,
      position: pos,
    },
    pace: PACES[pace] ? pace : DEFAULT_PACE,
    age: START_AGE,
    startYear: season,
    season,
    development: {
      talent: 0.5 + (Math.random() + Math.random()) / 2,
      peakShift: randInt(-1, 2),
    },
    stats,
    career: { clubId: null, parentClubId: null, loanSeasonsLeft: 0, loanReturn: null },
    status: { roleShift: null, unavailable: null, captain: false, nationalTeam: false },
    recentEvents: [],
    seenEvents: [],
    careerLog: {
      seasons: [],
      stints: [],
      honours: [],
      transfers: [],
      totals: { apps: 0, goals: 0, assists: 0, cleanSheets: 0, minutes: 0 },
      intl: { caps: 0, goals: 0, debutSeason: null },
      startOvr: 0,
      peakOvr: 0,
      peakOvrAge: START_AGE,
      peakValue: 0,
      peakValueAge: START_AGE,
    },
    pending: null,
    lastResult: null,
    lastRecap: null,
    retired: false,
    retirement: null,
  };

  adjustOverall(player, randInt(46, 52) - getOverall(player));
  const ovr = getOverall(player);
  player.careerLog.startOvr = ovr;
  player.careerLog.peakOvr = ovr;
  player.careerLog.peakValue = computeMarketValue(player, ovr);
  return player;
}

export const fullName = (player) => player.identity.lastName;