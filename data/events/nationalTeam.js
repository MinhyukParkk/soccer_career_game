export default [
  {
    id: "evt_national_call",
    type: "random",
    category: "nationalTeam",
    minAge: 20,
    maxAge: 34,
    weight: 5,
    conditions: { minReputationFanFame: 20 },
    text: "You've been called up to the national team. How do you prepare?",
    choices: [
      {
        id: "prepare_hard",
        label: "Train intensely to make the starting XI",
        effects: {
          "condition.fitness": -5,
          "reputation.fanFame": 10,
          "career.internationalCaps": 1,
        },
        resultText: "You earned your first cap, and the fans noticed.",
      },
      {
        id: "prepare_balanced",
        label: "Rest and manage your energy",
        effects: {
          "condition.morale": 8,
          "reputation.fanFame": 4,
          "career.internationalCaps": 1,
        },
        resultText: "You made a solid, low-risk debut.",
      },
    ],
  },
  {
    id: "evt_national_captain",
    type: "random",
    category: "nationalTeam",
    minAge: 25,
    maxAge: 34,
    weight: 2,
    conditions: { minReputationFanFame: 40 },
    text: "The coach considers naming you national team captain.",
    choices: [
      {
        id: "accept_armband",
        label: "Accept the responsibility",
        effects: {
          "flags.isCaptain": true,
          "stats.mental": 6,
          "reputation.fanFame": 10,
        },
        resultText: "You were named captain of your national team.",
      },
      {
        id: "defer_armband",
        label: "Suggest a more experienced teammate instead",
        effects: { "condition.morale": 6, "reputation.fanFame": 3 },
        resultText: "You stayed humble, and the squad respected the gesture.",
      },
    ],
  },
];