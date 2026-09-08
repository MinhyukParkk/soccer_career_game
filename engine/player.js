export function createPlayer({ lastName, number, preferredFoot, country, position }) {
  return {
    identity: { lastName, number, preferredFoot, country, position },
    age: 17,
    career: {
      currentClub: "academy_north",
      clubHistory: [],
      loanHistory: [],
      internationalCaps: 0,
      internationalGoals: 0,
    },
    stats: {
      attack: 40,
      defense: 20,
      speed: 55,
      stamina: 50,
      technique: 45,
      mental: 30,
    },
    condition: {
      fitness: 100,
      morale: 70,
      injuryStatus: null,
      injuryRiskModifier: 0,
    },
    reputation: {
      fanFame: 0,
      scoutInterest: 0,
      marketValue: 0,
    },
    academics: {
      educationLevel: "high_school",
      studying: false,
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
      titles: [],
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