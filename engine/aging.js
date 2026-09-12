// Natural age-based development, independent of any story event — this is
// the "OVR just climbs through your 20s and fades after your early 30s"
// curve seen in real career sims. Applied every season inside runTurn.

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

const GROWTH_POOL = ["attack", "technique", "mental", "speed", "stamina", "defense"];
const DECLINE_POOL = ["speed", "stamina", "defense", "attack"]; // physical stats fade first

export function applyAging(player, seasons) {
  for (let i = 0; i < seasons; i++) {
    const age = player.age;

    if (age <= 29) {
      // Development phase: young players naturally improve season to season.
      for (let pick = 0; pick < 2; pick++) {
        const stat = GROWTH_POOL[Math.floor(Math.random() * GROWTH_POOL.length)];
        const amount = Math.round(randRange(1, 3));
        player.stats[stat] = Math.min(99, player.stats[stat] + amount);
      }
    } else if (age >= 32) {
      // Decline phase: physical attributes go first, technique/mental hold up longer.
      for (let pick = 0; pick < 2; pick++) {
        const stat = DECLINE_POOL[Math.floor(Math.random() * DECLINE_POOL.length)];
        const amount = Math.round(randRange(1, 3));
        player.stats[stat] = Math.max(1, player.stats[stat] - amount);
      }
    }
    // Ages 30-31: peak plateau — no automatic change either way.
  }
}