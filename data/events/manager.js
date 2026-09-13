export default [
  {
    id: "evt_manager_conflict",
    category: "manager",
    minAge: 19,
    maxAge: 34,
    weight: 5,
    conditions: {},
    text: "Your manager criticizes your work rate in front of the whole squad.",
    choices: [
      {
        id: "confront",
        label: "Confront the manager privately",
        outcomes: [
          {
            probability: 0.55,
            label: "Cleared the air",
            positive: true,
            effects: { "condition.morale": 8, "stats.mental": 2 },
            resultText: "You cleared the air and earned a bit more trust.",
          },
          {
            probability: 0.45,
            label: "Benched",
            positive: false,
            effects: { "condition.morale": -10, "condition.fitness": -3 },
            resultText: "The conversation went badly — you were dropped for the next few matches.",
          },
        ],
      },
      {
        id: "stay_quiet",
        label: "Say nothing and prove it on the pitch",
        effects: { "stats.mental": 3, "condition.morale": -2 },
        resultText: "You bit your tongue and let your performances do the talking.",
      },
    ],
  },
  {
    id: "evt_tactical_role_change",
    category: "manager",
    minAge: 18,
    maxAge: 33,
    weight: 4,
    conditions: {},
    text: "The manager wants to tweak your role in the system.",
    choices: [
      {
        id: "embrace_role",
        label: "Embrace the new role",
        effects: { "stats.mental": 3, "stats.technique": 2 },
        resultText: "You adapted well and added a new dimension to your game.",
      },
      {
        id: "resist_role",
        label: "Push to keep your usual role",
        effects: { "condition.morale": -4, "stats.attack": 2 },
        resultText: "You got your way, but it created a little friction with the staff.",
      },
    ],
  },
];