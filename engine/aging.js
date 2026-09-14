import { getPositionProfile } from "./positions.js";

// Natural age-based development, independent of any story event — this is
// the "OVR just climbs through your 20s and fades after your early 30s"
// curve seen in real career sims. Applied every season inside runTurn.
//
// Each player has a hidden, permanent `development.talent` multiplier
// (rolled once at career creation — see engine/player.js) that scales
// every season's growth. This is what actually produces real divergence
// between careers: a high-talent roll compounds season after season into
// a 90+ superstar, while a low-talent roll plateaus around 65-70, on top
// of season-to-season randomness (some years jump, some barely move).

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
  const talent = player.development?.talent ?? 1;

  for (let i = 0; i < seasons; i++) {
    const age = player.age;

    if (age <= 29) {
      // Development phase: young players naturally improve season to
      // season — some years are a big leap, some barely move, and a
      // genuine breakout campaign can happen on top of that.
      const picks = 2 + Math.floor(Math.random() * 3); // 2-4 stats this season
      for (let p = 0; p < picks; p++) {
        const stat = pickStat(player, ALL_STATS);
        let amount = randRange(1, 6) * talent;
        if (Math.random() < 0.15) amount += randRange(5, 10) * talent; // breakout season
        if (Math.random() < 0.10) amount *= 0.2; // quiet, stagnant season
        player.stats[stat] = Math.min(99, Math.round(player.stats[stat] + amount));
      }
    } else if (age >= 32) {
      // Decline phase: physical attributes go first; occasional sharp
      // cliff (a bad injury-driven year) on top of normal aging.
      const picks = 1 + Math.floor(Math.random() * 2); // 1-2 stats this season
      for (let p = 0; p < picks; p++) {
        const stat = pickStat(player, DECLINE_PHYSICAL);
        let amount = randRange(1, 5);
        if (Math.random() < 0.1) amount += randRange(4, 7); // cliff
        player.stats[stat] = Math.max(1, Math.round(player.stats[stat] - amount));
      }
    }
    // Ages 30-31: peak plateau — no automatic change either way.
  }
}