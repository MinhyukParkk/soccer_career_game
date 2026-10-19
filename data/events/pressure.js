// Media, temptation and pressure.

export default [
  {
    id: "media_storm",
    category: "Media",
    title: "Front page news",
    text: "A tabloid splashes photos of you at a nightclub the week of a big match.",
    minAge: 19,
    maxAge: 34,
    weight: 7,
    choices: [
      {
        id: "respond_on_pitch",
        label: "Answer on the pitch",
        hint: "Say nothing. Score on Saturday.",
        outcomes: [
          { chance: 60, effects: { ovr: 2 }, text: "You're brilliant on Saturday and the story disappears." },
          { chance: 40, effects: { ovr: -2 }, text: "The noise gets to you. Your form drops for weeks." },
        ],
      },
      {
        id: "apologise",
        label: "Issue a public apology",
        hint: "Make it go away.",
        effects: {},
        text: "A short statement, a quiet week, and everyone moves on.",
      },
    ],
  },
  {
    id: "risky_shortcut",
    category: "Media",
    title: "A shortcut",
    text: "A 'recovery specialist' promises you faster recovery with an unlicensed supplement. No one would ever know.",
    minAge: 22,
    maxAge: 34,
    weight: 4,
    once: true,
    choices: [
      {
        id: "refuse",
        label: "Refuse",
        hint: "Not worth it.",
        effects: {},
        text: "You walk away. Your career stays clean.",
      },
      {
        id: "take_it",
        label: "Try it",
        hint: "Everyone's looking for an edge.",
        outcomes: [
          { chance: 50, effects: { ovr: 3 }, text: "You feel incredible, and nobody asks any questions." },
          { chance: 50, effects: { ovr: -3, ban: 8 }, text: "You fail a test. An eight-month ban and your name all over the news." },
        ],
      },
    ],
  },
  {
    id: "fan_abuse",
    category: "Media",
    title: "Booed off",
    text: "After a bad miss, part of the {club} crowd boos you off the pitch.",
    minAge: 19,
    maxAge: 34,
    weight: 6,
    choices: [
      {
        id: "win_them_back",
        label: "Work to win them back",
        hint: "Extra hours, no excuses.",
        outcomes: [
          { chance: 65, effects: { ovr: 2 }, text: "A month later they're singing your name again." },
          { chance: 35, effects: { ovr: -1 }, text: "The pressure follows you into every game." },
        ],
      },
      {
        id: "shush",
        label: "Shush them after your next goal",
        hint: "Show them who's boss.",
        outcomes: [
          { chance: 40, effects: { role: 1 }, text: "It becomes the club's favourite celebration." },
          { chance: 60, effects: { role: -1 }, text: "It backfires. The manager drops you to calm things down." },
        ],
      },
    ],
  },
];