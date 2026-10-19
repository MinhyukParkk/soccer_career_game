// The 12 playable positions and what makes each one different.
//
//   weights       which of the six attributes make up the OVR (sum to 1)
//   goalFactor    goals per 90 minutes for an average player at the level
//   assistFactor  assists per 90 minutes, same idea
//   valueMultiplier  market premium: forwards cost more than defenders at
//                 the same OVR, keepers least of all
//
// The per-90 rates follow typical top-flight numbers: an average starting
// striker scores roughly 0.4 per 90 and an elite one close to 1.0, wingers
// and No.10s split goals and assists, full-backs create more than they
// score, centre-backs mostly score from set pieces, keepers almost never
// show up on the scoresheet (they are judged on clean sheets instead).

export const POSITION_ORDER = ["ST", "LW", "RW", "CAM", "LM", "CM", "RM", "CDM", "LB", "CB", "RB", "GK"];

export const ATTRIBUTES = ["attack", "technique", "speed", "stamina", "defense", "mental"];

export const ATTRIBUTE_LABELS = {
  attack: "Finishing",
  technique: "Technique",
  speed: "Pace",
  stamina: "Stamina",
  defense: "Defending",
  mental: "Vision",
};

export const POSITION_PROFILES = {
  ST: {
    name: "Striker",
    line: "attack",
    blurb: "Lives in the box. Judged on goals, and goals alone.",
    weights: { attack: 0.45, speed: 0.2, technique: 0.2, mental: 0.1, stamina: 0.05, defense: 0 },
    goalFactor: 0.38,
    assistFactor: 0.12,
    valueMultiplier: 1.3,
  },
  LW: {
    name: "Left Winger",
    line: "attack",
    blurb: "Beats the full-back, cuts inside, scores and creates.",
    weights: { speed: 0.3, technique: 0.25, attack: 0.25, stamina: 0.15, mental: 0.05, defense: 0 },
    goalFactor: 0.24,
    assistFactor: 0.2,
    valueMultiplier: 1.25,
  },
  RW: {
    name: "Right Winger",
    line: "attack",
    blurb: "Pace on the right flank, end product in both feet.",
    weights: { speed: 0.3, technique: 0.25, attack: 0.25, stamina: 0.15, mental: 0.05, defense: 0 },
    goalFactor: 0.24,
    assistFactor: 0.2,
    valueMultiplier: 1.25,
  },
  CAM: {
    name: "Attacking Midfielder",
    line: "midfield",
    blurb: "The No.10. Finds the pass nobody else sees.",
    weights: { technique: 0.35, mental: 0.25, attack: 0.2, stamina: 0.15, speed: 0.05, defense: 0 },
    goalFactor: 0.18,
    assistFactor: 0.24,
    valueMultiplier: 1.2,
  },
  LM: {
    name: "Left Midfielder",
    line: "midfield",
    blurb: "Covers the whole left side, crosses on the run.",
    weights: { technique: 0.25, speed: 0.25, stamina: 0.2, attack: 0.15, mental: 0.15, defense: 0 },
    goalFactor: 0.13,
    assistFactor: 0.18,
    valueMultiplier: 1.05,
  },
  CM: {
    name: "Central Midfielder",
    line: "midfield",
    blurb: "Box to box. Keeps the team ticking in both directions.",
    weights: { technique: 0.25, mental: 0.25, stamina: 0.2, attack: 0.15, defense: 0.15, speed: 0 },
    goalFactor: 0.1,
    assistFactor: 0.13,
    valueMultiplier: 1.0,
  },
  RM: {
    name: "Right Midfielder",
    line: "midfield",
    blurb: "Works the right touchline from box to box.",
    weights: { technique: 0.25, speed: 0.25, stamina: 0.2, attack: 0.15, mental: 0.15, defense: 0 },
    goalFactor: 0.13,
    assistFactor: 0.18,
    valueMultiplier: 1.05,
  },
  CDM: {
    name: "Defensive Midfielder",
    line: "midfield",
    blurb: "Shields the back four and breaks up play.",
    weights: { defense: 0.3, mental: 0.25, stamina: 0.2, technique: 0.15, attack: 0.1, speed: 0 },
    goalFactor: 0.045,
    assistFactor: 0.065,
    valueMultiplier: 0.9,
  },
  LB: {
    name: "Left Back",
    line: "defense",
    blurb: "Defends the flank first, then overlaps to cross.",
    weights: { defense: 0.35, speed: 0.2, stamina: 0.2, mental: 0.15, technique: 0.1, attack: 0 },
    goalFactor: 0.04,
    assistFactor: 0.11,
    valueMultiplier: 0.95,
  },
  CB: {
    name: "Centre Back",
    line: "defense",
    blurb: "Wins headers, reads danger, scores the odd set piece.",
    weights: { defense: 0.5, mental: 0.25, stamina: 0.1, speed: 0.1, technique: 0.05, attack: 0 },
    goalFactor: 0.06,
    assistFactor: 0.025,
    valueMultiplier: 0.85,
  },
  RB: {
    name: "Right Back",
    line: "defense",
    blurb: "Locks down the right side and bombs forward.",
    weights: { defense: 0.35, speed: 0.2, stamina: 0.2, mental: 0.15, technique: 0.1, attack: 0 },
    goalFactor: 0.04,
    assistFactor: 0.11,
    valueMultiplier: 0.95,
  },
  GK: {
    name: "Goalkeeper",
    line: "goalkeeper",
    blurb: "The last line. Judged on saves and clean sheets.",
    weights: { defense: 0.35, mental: 0.35, technique: 0.15, stamina: 0.1, speed: 0.05, attack: 0 },
    goalFactor: 0,
    assistFactor: 0.008,
    valueMultiplier: 0.7,
  },
};

export function getPositionProfile(position) {
  return POSITION_PROFILES[position] ?? POSITION_PROFILES.CM;
}

export const isGoalkeeper = (position) => position === "GK";