// Placeholder club data. Use fictional names to avoid trademark/licensing
// issues (e.g. "River FC" instead of a real club name), or let the player
// name their own clubs in-game.
export default [
  {
    id: "youth_academy",
    name: "Youth Academy",
    tier: 4,
    country: "ARG",
    reputationRequired: 0,
    wageMultiplier: 0.2,
    styleBonus: {},
  },
  {
    id: "club_local_first_division",
    name: "Club Atlético Local",
    tier: 2,
    country: "ARG",
    reputationRequired: 10,
    wageMultiplier: 1.0,
    styleBonus: { technique: 2 },
  },
  {
    id: "club_top_tier",
    name: "Deportivo Nacional",
    tier: 1,
    country: "ARG",
    reputationRequired: 30,
    wageMultiplier: 1.5,
    styleBonus: { attack: 5 },
  },
];
 