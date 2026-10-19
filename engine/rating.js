// OVR and market value.
//
// OVR is the position-weighted average of the six attributes, so the same
// attributes give a striker and a centre-back very different ratings.
// Every OVR change in the game (yearly development, event choices) goes
// through adjustOverall, which moves the attributes until the OVR lands
// exactly on the target. "+3 OVR" therefore means the same thing for every
// position.

import { ATTRIBUTES, getPositionProfile } from "./positions.js";
import { clamp } from "./random.js";

export const MIN_OVR = 30;
export const MAX_OVR = 99;

function rawOverall(stats, position) {
  const { weights } = getPositionProfile(position);
  return ATTRIBUTES.reduce((sum, key) => sum + (weights[key] ?? 0) * (stats[key] ?? 0), 0);
}

export function computeOverall(stats, position) {
  return clamp(Math.round(rawOverall(stats, position)), 1, 99);
}

export const getOverall = (player) => computeOverall(player.stats, player.identity.position);

// Moves OVR by exactly `delta` (as far as the 30-99 range allows) and
// returns the change that actually happened. The attributes that matter
// most for the position move the most.
export function adjustOverall(player, delta) {
  const position = player.identity.position;
  const { weights } = getPositionProfile(position);
  const stats = player.stats;
  const before = computeOverall(stats, position);
  const target = clamp(before + Math.round(delta), MIN_OVR, MAX_OVR);
  if (target === before) return 0;

  for (let pass = 0; pass < 8; pass++) {
    const need = target - rawOverall(stats, position);
    if (Math.abs(need) < 0.02) break;
    const free = ATTRIBUTES.filter((key) => {
      if (!weights[key]) return false;
      return need > 0 ? stats[key] < 99 : stats[key] > 1;
    });
    const weightSq = free.reduce((sum, key) => sum + weights[key] ** 2, 0);
    if (weightSq === 0) break;
    for (const key of free) {
      stats[key] = clamp(stats[key] + (need * weights[key]) / weightSq, 1, 99);
    }
  }
  for (const key of ATTRIBUTES) stats[key] = Math.round(stats[key] * 100) / 100;
  return computeOverall(stats, position) - before;
}

// Market value in millions of euros. Grows steeply with OVR (a 90 is worth
// far more than twice a 75), peaks between 21 and 26, and falls away in the
// thirties. Forwards carry a premium over defenders and keepers.
export function computeMarketValue(player, ovr = getOverall(player)) {
  const { valueMultiplier } = getPositionProfile(player.identity.position);
  const base = 0.000325 * Math.max(0, ovr - 40) ** 3.2;
  return Math.max(0.05, base * valueMultiplier * ageValueFactor(player.age));
}

function ageValueFactor(age) {
  if (age <= 19) return 1.15;
  if (age <= 26) return 1.3;
  if (age <= 28) return 1.2;
  if (age <= 30) return 1.0;
  if (age <= 32) return 0.7;
  if (age <= 34) return 0.45;
  return 0.3;
}

// Colour band for OVR badges, shared by the UI and the CLI.
export function ovrBand(ovr) {
  if (ovr >= 90) return "elite";
  if (ovr >= 80) return "gold";
  if (ovr >= 70) return "silver";
  if (ovr >= 60) return "bronze";
  return "base";
}