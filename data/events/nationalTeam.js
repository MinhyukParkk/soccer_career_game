// International football.

export default [
  {
    id: "international_break",
    category: "National team",
    title: "Duty calls",
    text: "{nation} call you up for a decisive qualifier, but you're carrying a knock.",
    minAge: 18,
    maxAge: 36,
    weight: 8,
    when: (ctx) => ctx.nationalTeam,
    choices: [
      {
        id: "play",
        label: "Play for {nation}",
        hint: "You don't say no to your country.",
        outcomes: [
          { chance: 60, effects: { ovr: 2 }, text: "You play through it and score in a famous win." },
          { chance: 40, effects: { ovr: -1, injury: 2 }, text: "The knock gets worse. Two months out." },
        ],
      },
      {
        id: "withdraw",
        label: "Withdraw from the squad",
        hint: "Protect your body.",
        effects: {},
        text: "You rest and recover. The national coach understands — this time.",
      },
    ],
  },
  {
    id: "coach_watching",
    category: "National team",
    title: "Someone in the stands",
    text: "The {nation} national coach is in the stands this month, and he's watching you.",
    minAge: 19,
    maxAge: 31,
    weight: 9,
    when: (ctx) => !ctx.nationalTeam && ctx.ovr >= ctx.callUp - 5,
    choices: [
      {
        id: "show_off",
        label: "Raise your game",
        hint: "Try to stand out.",
        outcomes: [
          { chance: 60, effects: { ovr: 2 }, text: "You play the games of your life. He takes notes." },
          { chance: 40, effects: {}, text: "You try too hard and nothing comes off." },
        ],
      },
      {
        id: "stay_calm",
        label: "Keep doing what you do",
        hint: "Consistency is what coaches want.",
        effects: { ovr: 1 },
        text: "Solid, reliable, no drama. A good month.",
      },
    ],
  },
];