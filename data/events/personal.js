// Life off the pitch.

export default [
  {
    id: "finish_school",
    category: "Personal",
    title: "Exams or football?",
    text: "Final exams are coming up. Your parents want you to finish school before going all in on football.",
    minAge: 17,
    maxAge: 18,
    weight: 12,
    once: true,
    choices: [
      {
        id: "football",
        label: "Focus only on football",
        hint: "Every hour on the training pitch.",
        outcomes: [
          { chance: 60, effects: { ovr: 3 }, text: "Total focus pays off. The coaches can't believe how fast you're improving." },
          { chance: 40, effects: { ovr: -1 }, text: "With nothing else in your life, you burn out halfway through the year." },
        ],
      },
      {
        id: "studies",
        label: "Finish your studies",
        hint: "Balance school and training.",
        effects: { ovr: 1 },
        text: "You graduate, and a calmer head helps you on the pitch too.",
      },
    ],
  },
  {
    id: "homesick",
    category: "Personal",
    title: "Far from home",
    text: "Life in a new country is harder than you expected. You miss your family and the food you grew up with.",
    minAge: 17,
    maxAge: 23,
    weight: 9,
    when: (ctx) => ctx.abroad,
    choices: [
      {
        id: "family",
        label: "Fly your family over",
        hint: "Bring a bit of home to you.",
        effects: { ovr: 1 },
        text: "Your family moves in for a few months. You settle and start enjoying football again.",
      },
      {
        id: "tough_it_out",
        label: "Tough it out alone",
        hint: "Grow up fast.",
        outcomes: [
          { chance: 50, effects: { ovr: 3 }, text: "You learn the language, make friends and come out of it a stronger person." },
          { chance: 50, effects: { ovr: -2 }, text: "Loneliness weighs on you. It shows in every training session." },
        ],
      },
    ],
  },
  {
    id: "night_out",
    category: "Personal",
    title: "The night before",
    text: "Your teammates are heading out to celebrate a birthday. Training is at nine the next morning.",
    minAge: 18,
    maxAge: 27,
    weight: 8,
    choices: [
      {
        id: "stay_in",
        label: "Stay in and rest",
        hint: "Early night, sharp in the morning.",
        effects: { ovr: 1 },
        text: "You're the freshest player at training and the coaches notice.",
      },
      {
        id: "go_out",
        label: "Go out with the squad",
        hint: "Team spirit matters too.",
        outcomes: [
          { chance: 50, effects: { role: 1 }, text: "A great night. You become one of the leaders of the group." },
          { chance: 50, effects: { ovr: -2 }, text: "Photos leak, the manager is furious and your form dips." },
        ],
      },
    ],
  },
];