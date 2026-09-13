import { getPositionProfile } from "./positions.js";

// Natural age-based development, independent of any story event — this is
// the "OVR just climbs through your 20s and fades after your early 30s"
// curve seen in real career sims. Applied every season inside runTurn.
//
// Growth/decline amounts are randomized with real variance (and a rare
// "breakout" or "cliff" chance) so different careers actually diverge —
// some players peak as solid pros around 65-70 OVR, others break out into
// 90+ superstar territory, purely from the accumulated dice rolls.

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

const ALL_STATS = ["attack", "defense", "speed", "stamina", "technique", "mental"];
const DECLINE_PHYSICAL = ["speed", "stamina", "defense", "attack"]; // physical stats fade first

function pickStat(player, pool) {
  // 70% of the time, grow/decline a stat that actually matters for this
  // player's position (reinforcing specialization); 30% of the time, pick
  // from the full pool (some general athletic development/decline too).
  const profile = getPositionProfile(player.identity.position);
  const relevant = pool.filter((s) => (profile.weights[s] ?? 0) >= 0.15);
  if (relevant.length > 0 && Math.random() < 0.7) {
    return relevant[Math.floor(Math.random() * relevant.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function applyAging(player, seasons) {
  for (let i = 0; i < seasons; i++) {
    const age = player.age;

    if (age <= 29) {
      // Development phase: young players naturally improve season to
      // season, with a small chance of a breakout campaign.
      const picks = 1 + Math.floor(Math.random() * 3); // 1-3 stats this season
      for (let p = 0; p < picks; p++) {
        const stat = pickStat(player, ALL_STATS);
        let amount = Math.round(randRange(1, 4));
        if (Math.random() < 0.08) amount += Math.round(randRange(3, 6)); // breakout
        player.stats[stat] = Math.min(99, player.stats[stat] + amount);
      }
    } else if (age >= 32) {
      // Decline phase: physical attributes go first; occasional sharp
      // cliff (a bad injury-driven year) on top of normal aging.
      const picks = 1 + Math.floor(Math.random() * 2); // 1-2 stats this season
      for (let p = 0; p < picks; p++) {
        const stat = pickStat(player, DECLINE_PHYSICAL);
        let amount = Math.round(randRange(1, 4));
        if (Math.random() < 0.06) amount += Math.round(randRange(3, 5)); // cliff
        player.stats[stat] = Math.max(1, player.stats[stat] - amount);
      }
    }
    // Ages 30-31: peak plateau — no automatic change either way.
  }
}