export default [
  {
    id: "evt_national_call",
    type: "random",
    category: "nationalTeam",
    minAge: 20,
    maxAge: 34,
    weight: 5,
    conditions: { minReputationFanFame: 30 },
    text: "You've been called up to the national team. How do you prepare?",
    choices: [
      {
        id: "prepare_hard",
        label: "Train intensely to make the starting XI",
        effects: { "condition.fitness": -5, "reputation.fanFame": 10 },
        resultText: "You earned your first cap, and the fans noticed.",
      },
      {
        id: "prepare_balanced",
        label: "Rest and manage your energy",
        effects: { "condition.morale": 8, "reputation.fanFame": 4 },
        resultText: "You made a solid, low-risk debut.",
      },
    ],
  },
];