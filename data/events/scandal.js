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
  {
    id: "evt_media_controversy",
    type: "random",
    category: "scandal",
    minAge: 19,
    maxAge: 35,
    weight: 3,
    conditions: {},
    text: "A post you made online is being taken out of context by the press.",
    choices: [
      {
        id: "public_apology",
        label: "Issue a calm public apology",
        effects: { "reputation.fanFame": -2, "condition.morale": 3 },
        resultText: "The story faded quickly after your response.",
      },
      {
        id: "stay_silent",
        label: "Say nothing and let it blow over",
        effects: { "reputation.fanFame": -6, "condition.morale": -3 },
        resultText: "The silence let the story grow larger than it should have.",
      },
    ],
  },
  {
    id: "evt_nightlife_invite",
    type: "random",
    category: "scandal",
    minAge: 18,
    maxAge: 30,
    weight: 4,
    conditions: {},
    text: "Teammates invite you out the night before a big match.",
    choices: [
      {
        id: "go_out",
        label: "Go out and enjoy the night",
        effects: {
          "condition.morale": 6,
          "condition.fitness": -8,
          "condition.injuryRiskModifier": 5,
        },
        resultText: "You had fun, but you're not at your sharpest for the match.",
      },
      {
        id: "stay_in",
        label: "Stay in and rest",
        effects: { "condition.fitness": 3, "stats.mental": 1 },
        resultText: "You woke up fresh and focused.",
      },
    ],
  },
];