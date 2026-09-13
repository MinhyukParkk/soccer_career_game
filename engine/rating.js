import { getPositionProfile } from "./positions.js";

// The single OVR number, weighted by what actually matters for the
// player's specific position (see positions.js).
export function computeOverall(player) {
  const { weights } = getPositionProfile(player.identity.position);
  const total = Object.entries(weights).reduce(
    (sum, [stat, w]) => sum + player.stats[stat] * w,
    0
  );
  return Math.round(total);
}

// Market value is derived, not accumulated — it always reflects the
// player's current OVR, position (attackers/creators command a premium
// over defenders at the same rating, mirroring real transfer economics),
// and age (players are worth more in their prime than as teenagers or in
// decline). Returned in € millions.
export function computeMarketValue(player) {
  const ovr = computeOverall(player);
  const { valueMultiplier } = getPositionProfile(player.identity.position);

  const age = player.age;
  const ageFactor = age <= 20 ? 0.9 : age <= 24 ? 1.15 : age <= 29 ? 1.3 : age <= 32 ? 1.0 : 0.6;

  const base = Math.max(0, ovr - 40) ** 2.1 * 0.008;
  const value = base * valueMultiplier * ageFactor;

  return Math.round(value * 10) / 10; // one decimal place, in €M
}

// OVR-to-league-competitiveness bands, used to describe how a given rating
// stacks up: a 55 OVR is solid for a second-tier side but nowhere near
// enough for a top-flight regular, while 90+ is a genuine superstar level.
export function describeCompetitiveness(ovr) {
  if (ovr >= 90) return "Global superstar";
  if (ovr >= 80) return "Top-flight star";
  if (ovr >= 70) return "Top-flight regular";
  if (ovr >= 60) return "Second-tier standout";
  if (ovr >= 50) return "Second-tier squad player";
  return "Fringe / academy level";
}