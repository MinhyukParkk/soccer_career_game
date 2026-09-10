import { getPositionGroup } from "./positions.js";

// Rough "how much this role contributes to goals/assists" multipliers.
// Not meant to be a realistic match engine — just enough that an attacker's
// stats visibly translate into goals, a midfielder's into assists, etc.
const GOAL_FACTOR = { attack: 0.35, midfield: 0.12, defense: 0.03, gk: 0 };
const ASSIST_FACTOR = { attack: 0.15, midfield: 0.25, defense: 0.08, gk: 0.01 };

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

// Simulates `seasons` worth of league matches for the player based on their
// stats, fitness, and position. Mutates player.seasonLog (this stretch's
// numbers) and player.careerLog (running totals), and returns the delta so
// the UI can show "this season: X apps, Y goals, Z assists".
export function simulateSeasons(player, seasons) {
  const group = getPositionGroup(player.identity.position);

  let matches = 0;
  let goals = 0;
  let assists = 0;

  for (let i = 0; i < seasons; i++) {
    const fitnessFactor = player.condition.fitness < 40 ? 0.6 : 1;
    const seasonMatches = Math.round(randRange(18, 34) * fitnessFactor);

    const attackStat = player.stats.attack;
    const techMentalAvg = (player.stats.technique + player.stats.mental) / 2;

    const seasonGoals = Math.round(
      seasonMatches * GOAL_FACTOR[group] * (attackStat / 100) * randRange(0.7, 1.3)
    );
    const seasonAssists = Math.round(
      seasonMatches * ASSIST_FACTOR[group] * (techMentalAvg / 100) * randRange(0.7, 1.3)
    );

    matches += seasonMatches;
    goals += seasonGoals;
    assists += seasonAssists;
  }

  player.seasonLog.matchesPlayed = matches;
  player.seasonLog.goals = goals;
  player.seasonLog.assists = assists;

  player.careerLog.totalMatches += matches;
  player.careerLog.totalGoals += goals;
  player.careerLog.totalAssists += assists;

  return { matches, goals, assists };
}