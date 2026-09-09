export default [
  {
    id: "evt_injury_minor",
    type: "random",
    category: "injury",
    minAge: 18,
    maxAge: 35,
    weight: 4,
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
        outcomes: [
          {
            probability: 0.7,
            label: "Recovered fine",
            positive: true,
            effects: { "condition.fitness": -3 },
            resultText: "You returned early and it paid off — no lasting damage.",
          },
          {
            probability: 0.3,
            label: "Setback",
            positive: false,
            effects: {
              "condition.fitness": -12,
              "condition.injuryRiskModifier": 20,
              "stats.speed": -3,
            },
            resultText: "Returning early backfired — the injury lingered and cost you pace.",
          },
        ],
      },
    ],
  },
  {
    id: "evt_injury_severe",
    type: "random",
    category: "injury",
    minAge: 20,
    maxAge: 35,
    weight: 1.5,
    conditions: { excludesFlag: "hasRetiredEarly" },
    text: "A hard tackle leaves you with a serious knee injury. Surgery is recommended.",
    choices: [
      {
        id: "surgery_full_recovery",
        label: "Have surgery and rehab properly",
        effects: {
          "condition.fitness": -20,
          "stats.speed": -3,
          delayTurns: 1,
        },
        resultText: "The surgery went well, but you lost real time and a step of pace.",
      },
      {
        id: "conservative_treatment",
        label: "Try conservative treatment instead",
        effects: {
          "condition.fitness": -10,
          "condition.injuryRiskModifier": 20,
        },
        resultText: "You avoided surgery, but the knee remains a long-term risk.",
      },
    ],
  },
];