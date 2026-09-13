// National team call-ups are gated by OVR now (a decent player gets
// called up; a genuine star gets asked to captain the side) instead of an
// abstract "fame" stat.
export default [
  {
    id: "evt_national_call",
    category: "nationalTeam",
    minAge: 20,
    maxAge: 34,
    weight: 5,
    conditions: { minOvr: 62 },
    text: "You've been called up to the national team. How do you prepare?",
    choices: [
      {
        id: "prepare_hard",
        label: "Train intensely to make the starting XI",
        effects: {
          "stats.stamina": 2,
          "career.internationalCaps": 1,
        },
        resultText: "You earned your first cap, and the fans noticed.",
      },
      {
        id: "prepare_balanced",
        label: "Rest and manage your energy",
        effects: {
          "condition.morale": 8,
          "career.internationalCaps": 1,
        },
        resultText: "You made a solid, low-risk debut.",
      },
    ],
  },
  {
    id: "evt_national_captain",
    category: "nationalTeam",
    minAge: 25,
    maxAge: 34,
    weight: 2,
    conditions: { minOvr: 78 },
    text: "The coach considers naming you national team captain.",
    choices: [
      {
        id: "accept_armband",
        label: "Accept the responsibility",
        effects: {
          "flags.isCaptain": true,
          "stats.mental": 6,
        },
        resultText: "You were named captain of your national team.",
      },
      {
        id: "defer_armband",
        label: "Suggest a more experienced teammate instead",
        effects: { "condition.morale": 6 },
        resultText: "You stayed humble, and the squad respected the gesture.",
      },
    ],
  },
];