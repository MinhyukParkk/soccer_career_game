export default [
  {
    id: "evt_training_focus",
    type: "random",
    category: "training",
    minAge: 17,
    maxAge: 30,
    weight: 12,
    conditions: {},
    text: "Preseason has started. What will you focus on?",
    choices: [
      {
        id: "focus_attack",
        label: "Attacking drills",
        effects: { "stats.attack": 4, "stats.stamina": -1 },
        resultText: "Your finishing improved noticeably.",
      },
      {
        id: "focus_fitness",
        label: "Fitness and conditioning",
        effects: { "stats.stamina": 4, "condition.injuryRiskModifier": -5 },
        resultText: "You're in the best shape of your career.",
      },
      {
        id: "focus_technique",
        label: "Technical work",
        effects: { "stats.technique": 4 },
        resultText: "Your ball control took a step forward.",
      },
    ],
  },
];