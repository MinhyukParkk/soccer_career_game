// Injuries. Kept rare on purpose; the transfer window is the main story.

export default [
  {
    id: "minor_knock",
    category: "Injury",
    title: "A twinge in the hamstring",
    text: "You feel your hamstring tighten in training, two days before a big match.",
    minAge: 18,
    maxAge: 36,
    weight: 6,
    choices: [
      {
        id: "play",
        label: "Play through it",
        hint: "The team needs you.",
        outcomes: [
          { chance: 60, effects: { ovr: 1 }, text: "It holds. You play the full ninety and win man of the match." },
          { chance: 40, effects: { ovr: -2, injury: 3 }, text: "It tears in the first half. Three months on the sidelines." },
        ],
      },
      {
        id: "rest",
        label: "Sit out and recover",
        hint: "Miss a few weeks, stay safe.",
        effects: { injury: 1 },
        text: "You miss a month, then come back fully fit.",
      },
    ],
  },
  {
    id: "serious_injury",
    category: "Injury",
    title: "Bad news from the scan",
    text: "You went down awkwardly in training. The scan shows a torn knee ligament.",
    minAge: 20,
    maxAge: 35,
    weight: 3,
    choices: [
      {
        id: "full_rehab",
        label: "Surgery and full rehab",
        hint: "Long road, but done properly.",
        effects: { ovr: -1, injury: 7 },
        text: "Seven long months of rehab. You come back almost as good as before.",
      },
      {
        id: "fast_track",
        label: "Fast-track your comeback",
        hint: "Back sooner, if it holds.",
        outcomes: [
          { chance: 50, effects: { injury: 4 }, text: "The gamble works. You're back in four months, no worse for it." },
          { chance: 50, effects: { ovr: -4, injury: 7 }, text: "The knee gives way again. A second operation, and you lose a yard of pace." },
        ],
      },
    ],
  },
  {
    id: "burnout",
    category: "Injury",
    title: "Running on empty",
    text: "After a packed season your body is screaming for rest, but {club} want you on the summer tour.",
    minAge: 21,
    maxAge: 33,
    weight: 5,
    choices: [
      {
        id: "rest",
        label: "Skip the tour and rest",
        hint: "The manager won't love it.",
        outcomes: [
          { chance: 60, effects: { ovr: 1 }, text: "Fully recharged, you start the season flying." },
          { chance: 40, effects: { role: -1 }, text: "You're fresh, but the manager makes a point by starting you on the bench." },
        ],
      },
      {
        id: "tour",
        label: "Go on the tour",
        hint: "Show the club you're committed.",
        outcomes: [
          { chance: 50, effects: { role: 1 }, text: "The manager loves your attitude. You're first on the team sheet." },
          { chance: 50, effects: { ovr: -2, injury: 2 }, text: "Tired legs give out in a friendly. Two months out." },
        ],
      },
    ],
  },
];