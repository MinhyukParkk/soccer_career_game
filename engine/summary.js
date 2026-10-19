// End-of-career summary, legacy tier, and the compact record saved to
// career history.

import { getClub } from "./clubInfo.js";
import { getPositionProfile } from "./positions.js";
import { getOverall } from "./rating.js";

const TOP_FLIGHTS = new Set(["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"]);

const PRESTIGE = {
  "World Cup": 100,
  "Ballon d'Or": 99,
  "Champions League": 95,
  "European Championship": 90,
  "Copa América": 90,
  "Yashin Trophy": 88,
  "European Golden Shoe": 86,
  "Africa Cup of Nations": 85,
  "Asian Cup": 85,
  "Gold Cup": 82,
  "Golden Boy": 80,
  "Europa League": 75,
};

export function prestige(honour) {
  if (PRESTIGE[honour.name]) return PRESTIGE[honour.name];
  if (honour.kind === "league") return TOP_FLIGHTS.has(honour.name) ? 78 : 45;
  if (honour.kind === "cup") return 60;
  if (honour.kind === "award") {
    if (/Player of the|Most Valuable/.test(honour.name)) return TOP_FLIGHTS.has(leagueOf(honour.name)) ? 72 : 48;
    return /^(Premier League|La Liga|Bundesliga|Serie A|Ligue 1|Pichichi|Torjägerkanone|Capocannoniere|Zamora|PFA)/.test(honour.name) ? 65 : 44;
  }
  return 50;
}

const leagueOf = (name) => [...TOP_FLIGHTS].find((league) => name.startsWith(league)) ?? "";

// Groups honours by name: [{ name, kind, count, seasons: [2027, 2029] }],
// most prestigious first.
export function groupHonours(honours) {
  const groups = new Map();
  for (const h of honours) {
    if (!groups.has(h.name)) groups.set(h.name, { name: h.name, short: h.short ?? h.name, kind: h.kind, count: 0, seasons: [] });
    const group = groups.get(h.name);
    group.count += 1;
    group.seasons.push(h.season);
  }
  return [...groups.values()].sort((a, b) => prestige(b) - prestige(a) || b.count - a.count);
}

export const LEGACY_TIERS = [
  { id: "legend", label: "Legend", min: 125, text: "One of the greatest players of a generation." },
  { id: "worldclass", label: "World Class", min: 104, text: "Among the very best in the world at your peak." },
  { id: "star", label: "Star", min: 91, text: "A big name with a career full of big nights." },
  { id: "established", label: "Established Pro", min: 81, text: "A respected top-level professional for years." },
  { id: "journeyman", label: "Journeyman", min: 72, text: "A proper professional career at a solid level." },
  { id: "squad", label: "Squad Player", min: 0, text: "Never quite broke through, but you lived the dream." },
];

export function legacyScore({ peakOvr, trophyCount, awardCount, ballonDors, worldCups }) {
  return (
    peakOvr +
    0.8 * Math.min(trophyCount, 25) +
    1.2 * Math.min(awardCount, 20) +
    5 * Math.min(ballonDors, 5) +
    4 * Math.min(worldCups, 2)
  );
}

export function legacyTier(stats) {
  const score = legacyScore(stats);
  const tier = LEGACY_TIERS.find((t) => score >= t.min) ?? LEGACY_TIERS[LEGACY_TIERS.length - 1];
  return { ...tier, score: Math.round(score) };
}

export function buildCareerSummary(player) {
  const log = player.careerLog;
  const honours = log.honours;
  const trophies = groupHonours(honours.filter((h) => h.kind !== "award"));
  const awards = groupHonours(honours.filter((h) => h.kind === "award"));
  const trophyCount = honours.filter((h) => h.kind !== "award").length;
  const awardCount = honours.filter((h) => h.kind === "award").length;
  const ballonDors = honours.filter((h) => h.name === "Ballon d'Or").length;
  const worldCups = honours.filter((h) => h.name === "World Cup").length;
  const seasons = log.seasons;
  const clubIds = [...new Set(log.stints.map((s) => s.clubId))];
  const biggestMove = log.transfers.filter((t) => t.type === "move").sort((a, b) => b.fee - a.fee)[0] ?? null;

  return {
    id: player.id,
    name: player.identity.lastName,
    number: player.identity.number,
    position: player.identity.position,
    positionName: getPositionProfile(player.identity.position).name,
    country: player.identity.country,
    countryCode: player.identity.countryCode,
    pace: player.pace,
    startYear: player.startYear,
    endYear: seasons.length ? seasons[seasons.length - 1].season + 1 : player.startYear,
    seasonsPlayed: seasons.length,
    retirement: player.retirement,
    totals: { ...log.totals },
    intl: { ...log.intl },
    startOvr: log.startOvr,
    peakOvr: log.peakOvr,
    peakOvrAge: log.peakOvrAge,
    finalOvr: getOverall(player),
    peakValue: log.peakValue,
    peakValueAge: log.peakValueAge,
    trophies,
    awards,
    trophyCount,
    awardCount,
    stints: log.stints,
    seasons,
    transfers: log.transfers,
    biggestMove,
    clubCount: clubIds.length,
    clubIds,
    legacy: legacyTier({ peakOvr: log.peakOvr, trophyCount, awardCount, ballonDors, worldCups }),
  };
}

// Compact, self-contained record for the history page. Club names and
// colours are copied in so old records still read correctly if the club
// list changes in a later version.
export function buildHistoryRecord(player) {
  const s = buildCareerSummary(player);
  const clubs = s.clubIds.slice(0, 10).map((id) => {
    const club = getClub(id);
    return club ? { id, name: club.name, short: club.short, color: club.color, text: club.text } : { id, name: id, short: "???" };
  });
  return {
    id: s.id,
    version: 2,
    savedAt: new Date().toISOString(),
    name: s.name,
    number: s.number,
    position: s.position,
    positionName: s.positionName,
    country: s.country,
    countryCode: s.countryCode,
    startYear: s.startYear,
    endYear: s.endYear,
    seasonsPlayed: s.seasonsPlayed,
    retirementAge: s.retirement?.age ?? null,
    peakOvr: s.peakOvr,
    peakOvrAge: s.peakOvrAge,
    finalOvr: s.finalOvr,
    peakValue: s.peakValue,
    totals: s.totals,
    intl: s.intl,
    trophyCount: s.trophyCount,
    awardCount: s.awardCount,
    topHonours: [...s.trophies, ...s.awards]
      .sort((a, b) => prestige(b) - prestige(a) || b.count - a.count)
      .slice(0, 6)
      .map((h) => ({ name: h.name, count: h.count, kind: h.kind })),
    clubs,
    legacy: { id: s.legacy.id, label: s.legacy.label },
  };
}