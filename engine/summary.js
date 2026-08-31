export function generateSummary(player) {
  const score =
    player.careerLog.totalGoals * 2 +
    player.careerLog.totalAssists +
    player.career.internationalCaps +
    player.reputation.fanFame;

  let legacyTier = "journeyman";
  if (score > 200) legacyTier = "leyenda";
  else if (score > 100) legacyTier = "world class";
  else if (score > 40) legacyTier = "solid pro";

  return {
    totalMatches: player.careerLog.totalMatches,
    totalGoals: player.careerLog.totalGoals,
    totalAssists: player.careerLog.totalAssists,
    clubsPlayedFor: player.career.clubHistory,
    collectiveTitles: player.careerLog.collectiveTitles,
    individualAwards: player.careerLog.individualAwards,
    internationalCaps: player.career.internationalCaps,
    legacyTier,
  };
}