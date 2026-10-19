// National team: call-ups, caps, goals and summer tournaments.
//
// You're called up once your OVR reaches your country's threshold (lower
// for smaller footballing nations). Tournament odds depend on how strong
// the nation is, with a boost when you're one of its stars.

import { INTERNATIONAL_BASELINE } from "./leagueLevels.js";
import { nationalTier, tournamentForSeason } from "./nations.js";
import { getPositionProfile } from "./positions.js";
import { qualityCurve } from "./matchSim.js";
import { chance, clamp, rand, randInt, stochasticRound } from "./random.js";

function isSelected(player, ovr, callUp) {
  if (player.age < 18) return false;
  if (player.age >= 35 && ovr < callUp + 4) return false;
  if (ovr >= callUp) return true;
  return ovr >= callUp - 2 && chance(0.3);
}

export function simulateInternationalSeason(player, ovr, seasonYear) {
  const tier = nationalTier(player.identity.countryCode);
  const selected = isSelected(player, ovr, tier.callUp);
  player.status.nationalTeam = selected;
  if (!selected) return { caps: 0, goals: 0, debut: false, tournament: null, honours: [] };

  const margin = ovr - tier.callUp;
  let caps = margin < 0 ? randInt(1, 3) : margin < 4 ? randInt(2, 5) : margin < 8 ? randInt(4, 7) : randInt(5, 9);

  const honours = [];
  let tournament = null;
  const upcoming = tournamentForSeason(seasonYear, player.identity.countryCode);
  if (upcoming && margin >= 0) {
    caps += randInt(2, 6);
    const baseOdds = upcoming.kind === "worldCup" ? tier.worldCup : tier.continental;
    const starBoost = clamp(1 + 0.03 * (margin - 4), 0.8, 1.6);
    const won = chance(baseOdds * starBoost);
    tournament = { name: upcoming.name, year: upcoming.year, won };
    if (won) honours.push({ name: upcoming.name, short: upcoming.name, kind: "international" });
  }

  const { goalFactor } = getPositionProfile(player.identity.position);
  const goals = stochasticRound(caps * goalFactor * qualityCurve(ovr - INTERNATIONAL_BASELINE) * rand(0.7, 1.2));
  const debut = player.careerLog.intl.caps === 0;

  return { caps, goals, debut, tournament, honours };
}