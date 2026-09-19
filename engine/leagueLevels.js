// Shared "how good is this league, roughly" baseline — used both by
// matchSim.js (goal/assist output relative to league level) and
// awards.js (whether a season's performance is award-worthy relative to
// the league). Keeping it in one place means the two can never drift
// apart on what counts as "a standout performance."
export const LEAGUE_BASELINE = { 1: 75, 2: 50 };

export function currentLeagueBaseline(player, clubs) {
  const club = clubs.find((c) => c.id === player.career.currentClub);
  return LEAGUE_BASELINE[club?.tier] ?? 60; // unattached: assume a middling level
}