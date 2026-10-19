// Club trophies: league title, domestic cup and European cups.
//
// The league title goes to whoever tops the simulated table. Cups are a
// weighted draw where stronger clubs (and clubs with a star player) are
// more likely to win, but upsets happen. Every trophy uses its real name.

import { allClubs } from "./clubInfo.js";
import { DOMESTIC_CUP } from "./leagueLevels.js";
import { chance } from "./random.js";

const CUP_STEEPNESS = 0.2;
const EUROPE_STEEPNESS = 0.3;

// The usual European field: the four strongest clubs of each top flight
// play the Champions League, the next four the Europa League.
function europeanField(fromRank, toRank) {
  const leagues = [...new Set(allClubs().filter((c) => c.tier === 1).map((c) => c.league))];
  return leagues.flatMap((league) =>
    allClubs()
      .filter((c) => c.league === league)
      .sort((a, b) => b.requiredOvr - a.requiredOvr)
      .slice(fromRank - 1, toRank),
  );
}

const CHAMPIONS_FIELD = europeanField(1, 4);
const EUROPA_FIELD = europeanField(5, 8);

function drawWinChance(field, club, strength, steepness) {
  const own = Math.exp(steepness * strength);
  const others = field
    .filter((c) => c.id !== club.id)
    .reduce((sum, c) => sum + Math.exp(steepness * c.requiredOvr), 0);
  return own / (own + others);
}

function cupWinChance(club, strength) {
  const field = allClubs().filter((c) => c.country === club.country);
  return drawWinChance(field, club, strength, CUP_STEEPNESS);
}

// clubSeason comes from simulateClubSeason (club, finish, strength).
export function rollClubTrophies(club, clubSeason) {
  const won = [];
  const { finish, strength } = clubSeason;

  if (finish.position === 1) won.push({ name: club.league, short: club.league, kind: "league" });

  if (chance(cupWinChance(club, strength))) {
    const cup = DOMESTIC_CUP[club.country];
    won.push({ name: cup, short: cup, kind: "cup" });
  }

  if (club.tier === 1 && finish.position <= 4) {
    if (chance(drawWinChance(CHAMPIONS_FIELD, club, strength, EUROPE_STEEPNESS))) {
      won.push({ name: "Champions League", short: "Champions League", kind: "europe" });
    }
  } else if (club.tier === 1 && finish.position <= 6) {
    if (chance(drawWinChance(EUROPA_FIELD, club, strength, EUROPE_STEEPNESS))) {
      won.push({ name: "Europa League", short: "Europa League", kind: "europe" });
    }
  }

  return won;
}

// Which European competition the finish implies, for the season row.
export function europeanCompetition(club, position) {
  if (club.tier !== 1) return null;
  if (position <= 4) return "Champions League";
  if (position <= 6) return "Europa League";
  return null;
}