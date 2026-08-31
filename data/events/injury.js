
export default [
  {
    id: "evt_injury_minor",
    type: "random",
    category: "injury",
    minAge: 18,
    maxAge: 35,
    weight: 10,
    conditions: { excludesFlag: "hasRetiredEarly" },
    text: "You twisted your ankle in training. What do you do?",
    choices: [
      {
        id: "rest",
        label: "Rest fully",
        effects: { "condition.fitness": -10, delayTurns: 1 },
        resultText: "You recovered fully but lost a season.",
      },
      {
        id: "push_through",
        label: "Push through and return early",
        effects: {
          "condition.fitness": -5,
          "condition.injuryRiskModifier": 15,
          "stats.speed": -2,
        },
        resultText: "You returned fast, but your injury risk is now higher.",
      },
    ],
  },
];
 