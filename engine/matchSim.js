// One club season: playing time, goals, assists, clean sheets and where
// the club finishes in the league.
//
// Output per 90 minutes = the position's base rate x qualityCurve, where
// the curve compares your OVR with the average player in your league
// (leagueLevels.js). Playing time comes from your squad role (squad.js).
// The club you play for never changes how fast you develop.

import { allClubs, getClub } from "./clubInfo.js";
import { leagueBaseline } from "./leagueLevels.js";
import { getPositionProfile, isGoalkeeper } from "./positions.js";
import { clamp, rand, randInt, stochasticRound } from "./random.js";
import { roleFor } from "./squad.js";

// 1.0 for a league-average player; about 2.3x when 15 above the league
// average (a 90 in a top flight, a 70 in a second division) and about
// 0.45x when 15 below it.
export function qualityCurve(advantage) {
  return Math.exp(clamp(advantage, -22, 20) * 0.055);
}

// How much one player lifts (or drags down) the club's chances.
const ROLE_INFLUENCE = { key: 0.35, starter: 0.25, rotation: 0.1, bench: 0.03 };

export function effectiveStrength(club, ovr, roleId) {
  const lift = clamp((ovr - club.requiredOvr) * ROLE_INFLUENCE[roleId], -3, 5);
  return club.requiredOvr + lift;
}

// Roughly normal noise with the given spread.
const noise = (spread) => (Math.random() + Math.random() + Math.random() - 1.5) * 2 * spread;

export function simulateLeagueFinish(club, strength) {
  const table = allClubs()
    .filter((c) => c.league === club.league)
    .map((c) => ({ id: c.id, score: (c.id === club.id ? strength : c.requiredOvr) + noise(2.5) }))
    .sort((a, b) => b.score - a.score);
  return { position: table.findIndex((row) => row.id === club.id) + 1, size: table.length };
}

export function simulateClubSeason(player, ovr) {
  const club = getClub(player.career.clubId);
  const role = roleFor(player, club.id, ovr);
  const position = player.identity.position;
  const profile = getPositionProfile(position);

  let apps = randInt(role.apps[0], role.apps[1]);
  const missedMonths = player.status.unavailable?.months ?? 0;
  if (missedMonths) apps = Math.round(apps * (1 - Math.min(0.9, missedMonths / 10)));

  const minutes = Math.round(apps * role.minutesPerApp * rand(0.93, 1.05));
  const full90s = minutes / 90;
  const baseline = leagueBaseline(club.tier);
  const quality = qualityCurve(ovr - baseline);

  const goals = stochasticRound(full90s * profile.goalFactor * quality * rand(0.8, 1.2));
  const assists = stochasticRound(full90s * profile.assistFactor * quality * rand(0.8, 1.2));

  let cleanSheets = 0;
  if (isGoalkeeper(position)) {
    const rate = clamp(0.26 + 0.012 * (ovr - baseline) + 0.008 * (club.requiredOvr - baseline), 0.08, 0.6);
    cleanSheets = Math.min(apps, stochasticRound(full90s * rate * rand(0.85, 1.15)));
  }

  const strength = effectiveStrength(club, ovr, role.id);
  const finish = simulateLeagueFinish(club, strength);

  return {
    clubId: club.id,
    roleId: role.id,
    apps,
    minutes,
    goals,
    assists,
    cleanSheets,
    strength,
    finish,
    missedMonths,
    missedReason: player.status.unavailable?.reason ?? null,
  };
}