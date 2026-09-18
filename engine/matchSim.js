import { getPositionProfile } from "./positions.js";

// Rough "how much this exact position contributes to goals/assists" —
// each position now has its own factors (see positions.js) instead of a
// coarse 4-group split. Not meant to be a realistic match engine — just
// enough that a striker's stats visibly translate into goals, a winger's
// into a mix of both, a center-back's into almost neither, etc.

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

// A new stint starts whenever the player's club differs from the most
// recent one on record; consecutive seasons at the same club just
// accumulate onto the existing entry (covers normal tenure, loan spells,
// and moving back to a previous club as separate stints).
function recordClubStint(player, clubId, matches, goals, assists) {
  if (!clubId) return;
  const stints = player.careerLog.clubStints;
  const last = stints[stints.length - 1];
  if (last && last.clubId === clubId) {
    last.matches += matches;
    last.goals += goals;
    last.assists += assists;
  } else {
    stints.push({ clubId, matches, goals, assists });
  }
}

// Simulates `seasons` worth of league matches for the player based on
// their stats, fitness, and exact position. Mutates player.seasonLog (this
// stretch's numbers) and player.careerLog (running totals + per-club
// breakdown), and returns the delta so the UI can show "this season: X
// apps, Y goals, Z assists".
export function simulateSeasons(player, seasons) {
  const { goalFactor, assistFactor } = getPositionProfile(player.identity.position);

  let matches = 0;
  let goals = 0;
  let assists = 0;

  for (let i = 0; i < seasons; i++) {
    const seasonMatches = Math.round(randRange(18, 34));

    const attackStat = player.stats.attack;
    const techMentalAvg = (player.stats.technique + player.stats.mental) / 2;

    const seasonGoals = Math.round(
      seasonMatches * goalFactor * (attackStat / 100) * randRange(0.7, 1.3)
    );
    const seasonAssists = Math.round(
      seasonMatches * assistFactor * (techMentalAvg / 100) * randRange(0.7, 1.3)
    );

    matches += seasonMatches;
    goals += seasonGoals;
    assists += seasonAssists;

    // Attribute this season's numbers to whichever club is current right
    // now — callers run this once per season, after that season's transfer
    // decision has already been applied, so currentClub is always accurate.
    recordClubStint(player, player.career.currentClub, seasonMatches, seasonGoals, seasonAssists);
  }

  player.seasonLog.matchesPlayed = matches;
  player.seasonLog.goals = goals;
  player.seasonLog.assists = assists;

  player.careerLog.totalMatches += matches;
  player.careerLog.totalGoals += goals;
  player.careerLog.totalAssists += assists;

  return { matches, goals, assists };
}