// The dugout: managers, captaincy, your place in the team.

export default [
  {
    id: "manager_conflict",
    category: "Manager",
    title: "Hooked at half-time",
    text: "You're subbed off at the break and the manager blames you in front of the whole squad.",
    minAge: 19,
    maxAge: 34,
    weight: 8,
    choices: [
      {
        id: "apologise",
        label: "Take it and work harder",
        hint: "Let your training do the talking.",
        effects: { ovr: 1 },
        text: "You put in extra hours. A week later he picks you again.",
      },
      {
        id: "confront",
        label: "Confront him",
        hint: "Stand up for yourself.",
        outcomes: [
          { chance: 40, effects: { role: 1 }, text: "He respects that you fought back. You're back in the team, and staying there." },
          { chance: 60, effects: { role: -1, ovr: -1 }, text: "It goes badly. You're frozen out for months." },
        ],
      },
    ],
  },
  {
    id: "new_manager",
    category: "Manager",
    title: "A new manager",
    text: "{club} appoint a new manager with a completely different idea of how football should be played.",
    minAge: 20,
    maxAge: 33,
    weight: 8,
    choices: [
      {
        id: "adapt",
        label: "Adapt to his ideas",
        hint: "Learn a new way of playing.",
        outcomes: [
          { chance: 65, effects: { ovr: 3 }, text: "His methods unlock something new in your game." },
          { chance: 35, effects: { ovr: -1 }, text: "You're thinking instead of playing. A clumsy, confused year." },
        ],
      },
      {
        id: "own_game",
        label: "Keep playing your game",
        hint: "What got you here will keep you here.",
        effects: {},
        text: "You keep doing what you do. Nothing much changes.",
      },
    ],
  },
  {
    id: "captaincy",
    category: "Manager",
    title: "The armband",
    text: "The captain is leaving and the {club} squad wants you to take the armband.",
    minAge: 24,
    maxAge: 34,
    weight: 7,
    when: (ctx) => !ctx.captain && ctx.roleRank >= 2,
    choices: [
      {
        id: "accept",
        label: "Accept the armband",
        hint: "Lead the dressing room.",
        outcomes: [
          { chance: 75, effects: { ovr: 2, captain: true }, text: "Captain of {club}. The responsibility brings out your best." },
          { chance: 25, effects: { ovr: -1, captain: true }, text: "The weight of the armband gets to you at first." },
        ],
      },
      {
        id: "decline",
        label: "Politely decline",
        hint: "Focus on your own game.",
        effects: {},
        text: "You lead by example instead. Nothing changes.",
      },
    ],
  },
  {
    id: "dropped_big_game",
    category: "Manager",
    title: "Dropped for the big one",
    text: "You're left out of the starting eleven for the biggest game of the season.",
    minAge: 20,
    maxAge: 33,
    weight: 6,
    when: (ctx) => ctx.roleRank >= 2,
    choices: [
      {
        id: "be_ready",
        label: "Accept it and be ready",
        hint: "Make an impact off the bench.",
        outcomes: [
          { chance: 50, effects: { ovr: 2 }, text: "You come on with twenty minutes left and score the winner." },
          { chance: 50, effects: {}, text: "You warm up for ninety minutes and never get on." },
        ],
      },
      {
        id: "ask_why",
        label: "Demand an explanation",
        hint: "You've earned your place.",
        outcomes: [
          { chance: 50, effects: { role: 1 }, text: "He admits it was a mistake. You're untouchable after that." },
          { chance: 50, effects: { role: -1 }, text: "He doesn't appreciate being questioned. You lose your place." },
        ],
      },
    ],
  },
];