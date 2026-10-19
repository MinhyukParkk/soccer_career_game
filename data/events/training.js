// Training and development choices.
// Every event has at least one choice that moves OVR; chances add up to 100.

export default [
  {
    id: "double_sessions",
    category: "Training",
    title: "Double sessions",
    text: "The coaches at {club} offer you a place in their extra double sessions all through pre-season.",
    minAge: 17,
    maxAge: 23,
    weight: 10,
    choices: [
      {
        id: "all_in",
        label: "Do every single session",
        hint: "Push your body to the limit.",
        outcomes: [
          { chance: 70, effects: { ovr: 3 }, text: "You come back sharper, quicker and stronger than anyone in the squad." },
          { chance: 30, effects: { ovr: -1, injury: 2 }, text: "Your body gives out. A muscle strain keeps you out for two months." },
        ],
      },
      {
        id: "normal",
        label: "Stick to the normal plan",
        hint: "Steady progress, no risk.",
        effects: { ovr: 1 },
        text: "Steady work, no setbacks. You start the season in good shape.",
      },
    ],
  },
  {
    id: "summer_camp",
    category: "Training",
    title: "Private summer camp",
    text: "A renowned individual coach offers you a private programme. It means giving up your summer holiday.",
    minAge: 18,
    maxAge: 29,
    weight: 8,
    choices: [
      {
        id: "sign_up",
        label: "Sign up for the camp",
        hint: "Hard work while everyone else is on the beach.",
        outcomes: [
          { chance: 75, effects: { ovr: 3 }, text: "Six weeks of hard graft. You return a noticeably better player." },
          { chance: 25, effects: { injury: 2 }, text: "Tired legs catch up with you: a strain in the first week of the season." },
        ],
      },
      {
        id: "holiday",
        label: "Take a proper break",
        hint: "Recharge the batteries.",
        effects: {},
        text: "You switch off completely and come back fresh.",
      },
    ],
  },
  {
    id: "veteran_mentor",
    category: "Training",
    title: "An old head",
    text: "A veteran in the {club} dressing room offers to take you under his wing.",
    minAge: 17,
    maxAge: 22,
    weight: 8,
    choices: [
      {
        id: "accept",
        label: "Learn from him",
        hint: "Habits, positioning, game management.",
        effects: { ovr: 2 },
        text: "He teaches you the things no coach can. Your game matures quickly.",
      },
      {
        id: "own_way",
        label: "Do it your own way",
        hint: "Trust your own instincts.",
        outcomes: [
          { chance: 50, effects: { ovr: 4 }, text: "Your way works. You develop a style that is entirely your own." },
          { chance: 50, effects: { ovr: -1 }, text: "Without guidance you pick up bad habits. A frustrating year." },
        ],
      },
    ],
  },
  {
    id: "analytics",
    category: "Training",
    title: "The data department",
    text: "The club's new performance analyst wants to rebuild your game around the numbers.",
    minAge: 23,
    maxAge: 33,
    weight: 7,
    choices: [
      {
        id: "buy_in",
        label: "Buy in completely",
        hint: "Change habits you've had for years.",
        outcomes: [
          { chance: 60, effects: { ovr: 3 }, text: "Small tweaks, big gains. Your decision-making has never been better." },
          { chance: 40, effects: {}, text: "Interesting charts, but nothing really changes on the pitch." },
        ],
      },
      {
        id: "instinct",
        label: "Trust your instincts",
        hint: "Take the useful bits, ignore the rest.",
        effects: { ovr: 1 },
        text: "You pick out a couple of useful ideas and move on.",
      },
    ],
  },
  {
    id: "body_overhaul",
    category: "Training",
    title: "Time catches up",
    text: "A specialist tells you your body is changing. He proposes a complete overhaul: diet, sleep, recovery.",
    minAge: 29,
    maxAge: 37,
    weight: 8,
    once: true,
    choices: [
      {
        id: "commit",
        label: "Commit to everything",
        hint: "No more pizza. No more late nights.",
        effects: { ovr: 2 },
        text: "You feel five years younger. Teammates start copying your routine.",
      },
      {
        id: "routine",
        label: "Keep your routine",
        hint: "It has worked so far.",
        outcomes: [
          { chance: 50, effects: {}, text: "Your old routine holds up fine for now." },
          { chance: 50, effects: { ovr: -2 }, text: "You're a step slower this year, and everyone can see it." },
        ],
      },
    ],
  },
];