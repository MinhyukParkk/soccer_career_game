// individualAwards has existed on the player object since the start but
// nothing ever filled it in — collectiveTitles (club trophies) got a real
// system in trophies.js; this is the same idea for personal recognition.
// Every season, a standout performance has a shot at an award, scaled by
// how far above the *league's* level the player actually is (same
// relative-advantage idea as matchSim's goal curve) — dominating a
// second-tier league is a smaller feat than doing it in the top flight.

import { computeOverall } from "./rating.js";
import { currentLeagueBaseline } from "./leagueLevels.js";

function addAward(player, label) {
  const awards = player.careerLog.individualAwards;
  const existingIndex = awards.findIndex((a) => a.startsWith(label + " x"));
  if (existingIndex === -1) {
    awards.push(`${label} x1`);
  } else {
    const count = parseInt(awards[existingIndex].split(" x")[1], 10) + 1;
    awards[existingIndex] = `${label} x${count}`;
  }
}

// Rolls this season's individual awards. A season can win more than one
// (e.g. Golden Boot and Player of the Season together) — returns a
// combined result string, or null if nothing was won.
export function rollSeasonAwards(player, clubs, seasonGoals) {
  const club = clubs.find((c) => c.id === player.career.currentClub);
  if (!club) return null;

  const baseline = currentLeagueBaseline(player, clubs);
  const ovr = computeOverall(player);
  const advantage = ovr - baseline;
  const wins = [];

  // Golden Boot: a genuinely standout scoring season for this league.
  const goalThreshold = club.tier === 1 ? 18 : 22;
  if (seasonGoals >= goalThreshold && Math.random() < 0.35) {
    addAward(player, `${club.league} Golden Boot`);
    wins.push("the Golden Boot");
  }

  // Player of the Season: a real standout relative to the league overall.
  if (advantage >= 15 && Math.random() < 0.2) {
    addAward(player, `${club.league} Player of the Season`);
    wins.push(`${club.league} Player of the Season`);
  }

  // Young Player of the Year: same bar, but scaled down for a teenager/
  // early-20s player who's already punching above their league.
  if (player.age <= 21 && advantage >= 8 && Math.random() < 0.25) {
    addAward(player, `${club.league} Young Player of the Year`);
    wins.push(`${club.league} Young Player of the Year`);
  }

  // World Player of the Year: exceedingly rare — reserved for genuine
  // global superstars (OVR 90+, the top band in engine/rating.js).
  if (ovr >= 90 && Math.random() < 0.07) {
    addAward(player, "World Player of the Year");
    wins.push("World Player of the Year");
  }

  if (wins.length === 0) return null;
  return `You won ${wins.join(" and ")}!`;
}