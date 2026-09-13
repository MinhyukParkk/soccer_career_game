import { getPositionProfile } from "./positions.js";

export function createPlayer({ lastName, number, preferredFoot, country, position }) {
  // Base stats are generic; we then nudge them toward what actually
  // matters for this position, so a CB and a ST don't start identical.
  const baseStats = {
    attack: 40,
    defense: 20,
    speed: 55,
    stamina: 50,
    technique: 45,
    mental: 30,
  };

  const { weights } = getPositionProfile(position);
  const stats = {};
  for (const stat of Object.keys(baseStats)) {
    const w = weights[stat] ?? 0;
    let adjust = 0;
    if (w >= 0.25) adjust = 8;
    else if (w >= 0.15) adjust = 3;
    else if (w === 0) adjust = -5;
    stats[stat] = Math.max(1, Math.min(99, baseStats[stat] + adjust));
  }

  return {
    identity: { lastName, number, preferredFoot, country, position },
    age: 17,
    career: {
      currentClub: null, // assigned via the academy-offer step at career start
      parentClub: null, // set while out on loan; cleared automatically on return
      loanReturnAge: null,
      clubHistory: [],
      loanHistory: [],
      internationalCaps: 0,
    },
    stats,
    condition: {
      fitness: 100,
      morale: 70,
      injuryRiskModifier: 0,
    },
    reputation: {
      fanFame: 0,
      // No stored marketValue — it's derived from OVR/position/age via
      // engine/rating.js's computeMarketValue(), so it never drifts out of
      // sync with the player's actual stats.
    },
    flags: {
      hasDoped: false,
      hasRetiredEarly: false,
      isCaptain: false,
    },
    seasonLog: {
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
    },
    careerLog: {
      totalMatches: 0,
      totalGoals: 0,
      totalAssists: 0,
      collectiveTitles: [],
      individualAwards: [],
    },
  };
}

// Dot-notation helpers, e.g. getByPath(player, "stats.attack")
export function getByPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

export function setByPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((o, k) => o[k], obj);
  target[last] = value;
}