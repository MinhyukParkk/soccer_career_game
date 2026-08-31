export default [
  {
    id: "evt_doping_temptation",
    type: "random",
    category: "scandal",
    minAge: 22,
    maxAge: 34,
    weight: 2,
    conditions: {},
    text: "Someone offers you a banned substance to speed up recovery.",
    choices: [
      {
        id: "refuse",
        label: "Refuse",
        effects: { "condition.morale": 5 },
        resultText: "You kept your integrity intact.",
      },
      {
        id: "accept_doping",
        label: "Accept it",
        effects: {
          "stats.stamina": 8,
          "flags.hasDoped": true,
          "condition.injuryRiskModifier": 10,
        },
        resultText: "Your performance spiked, but you're carrying a risk now.",
      },
    ],
  },
];