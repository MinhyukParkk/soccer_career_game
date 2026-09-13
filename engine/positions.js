// Per-position profiles — the single source of truth for how each of the
// 12 positions actually plays differently:
//   - weights: which of the 6 stats matter for that position's OVR
//   - goalFactor / assistFactor: per-match scoring/creating rates used by
//     matchSim.js (grounded in real football patterns: strikers score far
//     more than they assist, wide players and CAMs split goals/assists
//     more evenly, fullbacks assist more than they score, center-backs and
//     defensive mids rarely do either, goalkeepers almost never do)
//   - valueMultiplier: reflects the real transfer-market premium placed on
//     attacking/creative positions over defensive ones at the same OVR
//     (strikers and wingers are historically valued highest; center-backs
//     and defensive midfielders lowest, goalkeepers lowest of all)
//
// Note: there's no live web-search tool available in this environment, so
// these numbers are grounded in general football knowledge (how position
// economics and output patterns tend to work) rather than a specific
// pulled dataset — treat them as reasonable modeling, not exact stats.

export const POSITION_PROFILES = {
  GK: {
    weights: { defense: 0.35, mental: 0.35, stamina: 0.10, technique: 0.15, speed: 0.05, attack: 0 },
    goalFactor: 0,
    assistFactor: 0.005,
    valueMultiplier: 0.7,
  },
  CB: {
    weights: { defense: 0.50, mental: 0.25, stamina: 0.10, speed: 0.10, technique: 0.05, attack: 0 },
    goalFactor: 0.02,
    assistFactor: 0.03,
    valueMultiplier: 0.85,
  },
  LB: {
    weights: { defense: 0.35, speed: 0.20, stamina: 0.20, mental: 0.15, technique: 0.10, attack: 0 },
    goalFactor: 0.03,
    assistFactor: 0.12,
    valueMultiplier: 0.95,
  },
  RB: {
    weights: { defense: 0.35, speed: 0.20, stamina: 0.20, mental: 0.15, technique: 0.10, attack: 0 },
    goalFactor: 0.03,
    assistFactor: 0.12,
    valueMultiplier: 0.95,
  },
  CDM: {
    weights: { defense: 0.30, mental: 0.25, stamina: 0.20, technique: 0.15, attack: 0.10, speed: 0 },
    goalFactor: 0.03,
    assistFactor: 0.10,
    valueMultiplier: 0.9,
  },
  CM: {
    weights: { technique: 0.25, mental: 0.25, stamina: 0.20, attack: 0.15, defense: 0.15, speed: 0 },
    goalFactor: 0.10,
    assistFactor: 0.18,
    valueMultiplier: 1.0,
  },
  LM: {
    weights: { technique: 0.25, speed: 0.25, stamina: 0.20, attack: 0.15, mental: 0.15, defense: 0 },
    goalFactor: 0.12,
    assistFactor: 0.22,
    valueMultiplier: 1.05,
  },
  RM: {
    weights: { technique: 0.25, speed: 0.25, stamina: 0.20, attack: 0.15, mental: 0.15, defense: 0 },
    goalFactor: 0.12,
    assistFactor: 0.22,
    valueMultiplier: 1.05,
  },
  CAM: {
    weights: { technique: 0.35, mental: 0.25, attack: 0.20, stamina: 0.15, speed: 0.05, defense: 0 },
    goalFactor: 0.18,
    assistFactor: 0.28,
    valueMultiplier: 1.2,
  },
  LW: {
    weights: { speed: 0.30, technique: 0.25, attack: 0.25, stamina: 0.15, mental: 0.05, defense: 0 },
    goalFactor: 0.22,
    assistFactor: 0.25,
    valueMultiplier: 1.25,
  },
  RW: {
    weights: { speed: 0.30, technique: 0.25, attack: 0.25, stamina: 0.15, mental: 0.05, defense: 0 },
    goalFactor: 0.22,
    assistFactor: 0.25,
    valueMultiplier: 1.25,
  },
  ST: {
    weights: { attack: 0.45, speed: 0.20, technique: 0.20, mental: 0.10, stamina: 0.05, defense: 0 },
    goalFactor: 0.38,
    assistFactor: 0.12,
    valueMultiplier: 1.3,
  },
};

export function getPositionProfile(position) {
  return POSITION_PROFILES[position] ?? POSITION_PROFILES.CM; // sensible fallback
}