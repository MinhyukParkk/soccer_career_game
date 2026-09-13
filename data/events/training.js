export default [
  {
    id: "evt_training_focus",
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
        effects: {
          "stats.attack": 4,
          "stats.stamina": -1,
        },
        resultText: "Your finishing improved noticeably.",
      },
      {
        id: "focus_fitness",
        label: "Fitness and conditioning",
        effects: {
          "stats.stamina": 4,
          "condition.injuryRiskModifier": -5,
        },
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
  {
    id: "evt_training_mentor",
    category: "training",
    minAge: 17,
    maxAge: 28,
    weight: 6,
    conditions: {},
    text: "A veteran teammate offers to mentor you after training.",
    choices: [
      {
        id: "accept_mentor",
        label: "Accept — learn from their experience",
        effects: { "stats.mental": 5, "condition.morale": 5 },
        resultText: "Their advice sharpened your decision-making on the pitch.",
      },
      {
        id: "decline_mentor",
        label: "Decline — you'd rather train alone",
        effects: { "stats.mental": 1, "condition.fitness": 3 },
        resultText: "You kept your routine, gaining only a little.",
      },
    ],
  },
  {
    id: "evt_training_media_day",
    category: "training",
    minAge: 18,
    maxAge: 34,
    weight: 5,
    conditions: {},
    text: "The club asks you to appear at a fan/media day.",
    choices: [
      {
        id: "engage_fans",
        label: "Spend the day with fans and press",
        effects: { "reputation.fanFame": 6, "condition.fitness": -2 },
        resultText: "Your popularity grew, but it cost you some rest.",
      },
      {
        id: "skip_focus_training",
        label: "Skip it and train instead",
        effects: { "stats.stamina": 2, "reputation.fanFame": -2 },
        resultText: "You improved quietly, though fans noticed your absence.",
      },
    ],
  },
  {
    id: "evt_training_double_session",
    category: "training",
    minAge: 18,
    maxAge: 33,
    weight: 5,
    conditions: {},
    text: "Two training sessions a day to improve your performance.",
    choices: [
      {
        id: "train_hard",
        label: "Train hard",
        outcomes: [
          {
            probability: 0.65,
            label: "Starter",
            positive: true,
            effects: { "stats.stamina": 3, "stats.mental": 1 },
            resultText: "The extra work paid off — you're firmly in the starting XI conversation.",
          },
          {
            probability: 0.35,
            label: "Injury",
            positive: false,
            effects: { "condition.fitness": -15, "condition.injuryRiskModifier": 15 },
            resultText: "The extra sessions caught up with you — you picked up a knock.",
          },
        ],
      },
      {
        id: "reduce_load",
        label: "Reduce the load",
        effects: { "condition.fitness": 3 },
        resultText: "You played it safe and protected your body.",
      },
    ],
  },
];