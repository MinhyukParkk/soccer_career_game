// Single source of truth for position -> role group mapping. Used by both
// matchSim.js (goals/assists formulas) and the web UI (OVR weighting), so
// the two never drift apart.
export const POSITION_GROUPS = {
  attack: ["ST"],
  midfield: ["CAM", "CM", "CDM", "LM", "RM", "LW", "RW"],
  defense: ["LB", "CB", "RB"],
  gk: ["GK"],
};

export function getPositionGroup(position) {
  for (const [group, positions] of Object.entries(POSITION_GROUPS)) {
    if (positions.includes(position)) return group;
  }
  return "midfield"; // fallback for any unrecognized position value
}