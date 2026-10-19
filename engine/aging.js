// Yearly development. After every season OVR moves on its own:
//
//   up to 20   big jumps (+1.5 to +5 a year)
//   21-23      still growing (+1 to +4)
//   24-26      smaller gains (0 to +2.5)
//   27-29      the plateau (-0.5 to +1.5)
//   30-31      the turn (-1.2 to +0.8)
//   32-33      decline (-1 to -3)
//   34+        steep decline (-2 to -4.5)
//
// Each player has a hidden talent (how big the gains are) and a peak shift
// (late bloomers keep improving for a couple more years, early peakers
// fade sooner). There are breakout years and flat years. Gains shrink as
// OVR gets near the top, so 90+ is rare but possible. The club you play for
// has no effect at all.

import { adjustOverall, getOverall } from "./rating.js";
import { chance, clamp, rand, stochasticRound } from "./random.js";

function ageCurve(age) {
  if (age <= 20) return rand(1.5, 5);
  if (age <= 23) return rand(1, 4);
  if (age <= 26) return rand(0, 2.5);
  if (age <= 29) return rand(-0.5, 1.5);
  if (age <= 31) return rand(-1.2, 0.8);
  if (age <= 33) return -rand(1, 3);
  return -rand(2, 4.5);
}

export function developmentDelta(player) {
  const { talent, peakShift } = player.development;
  const curveAge = player.age - peakShift;
  const ovr = getOverall(player);
  let delta = ageCurve(curveAge);

  if (delta > 0) {
    delta *= talent;
    if (curveAge <= 26 && chance(0.1)) delta += rand(2, 5) * talent; // breakout year
    else if (chance(0.1)) delta *= 0.25; // flat year
    delta *= clamp((99 - ovr) / 30, 0.2, 1); // harder to improve near the top
  } else {
    delta *= clamp(1.45 - 0.35 * talent, 0.6, 1.25); // great players age better
    if (curveAge >= 31 && chance(0.08)) delta -= rand(2, 4); // sudden drop
  }
  return stochasticRound(delta);
}

// Applies one year of development and returns the real OVR change.
export function applyDevelopment(player) {
  return adjustOverall(player, developmentDelta(player));
}