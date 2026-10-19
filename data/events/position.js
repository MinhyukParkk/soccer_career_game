// Position-specific moments: each only appears for the positions listed.

const ATTACKERS = ["ST", "LW", "RW", "CAM"];
const CREATORS = ["CAM", "CM", "LM", "RM", "LW", "RW"];
const DEFENDERS = ["CB", "CDM", "LB", "RB"];

export default [
  {
    id: "penalty_duty",
    category: "On the pitch",
    title: "From the spot",
    text: "The regular penalty taker is off injured. Eighty-ninth minute, and the referee points to the spot.",
    positions: ATTACKERS,
    minAge: 19,
    maxAge: 35,
    weight: 8,
    choices: [
      {
        id: "take_it",
        label: "Take the ball",
        hint: "Your moment.",
        outcomes: [
          { chance: 70, effects: { ovr: 2 }, text: "Bottom corner. The penalties are yours from now on." },
          { chance: 30, effects: { ovr: -1 }, text: "Saved. The confidence takes a while to come back." },
        ],
      },
      {
        id: "hand_over",
        label: "Hand it to a teammate",
        hint: "Let someone else carry it.",
        effects: {},
        text: "He scores. Nobody remembers who stepped aside.",
      },
    ],
  },
  {
    id: "weaker_foot",
    category: "On the pitch",
    title: "The other foot",
    text: "A coach points out that you hardly ever use your weaker foot.",
    positions: ["ST", "LW", "RW", "CAM", "LM", "RM"],
    minAge: 17,
    maxAge: 24,
    weight: 8,
    choices: [
      {
        id: "work_on_it",
        label: "Spend the summer on it",
        hint: "Hours against a wall.",
        outcomes: [
          { chance: 70, effects: { ovr: 3 }, text: "Defenders can't show you onto one side any more." },
          { chance: 30, effects: { ovr: 1 }, text: "Slow progress, but progress." },
        ],
      },
      {
        id: "strengths",
        label: "Play to your strengths",
        hint: "Perfect what already works.",
        effects: {},
        text: "You keep doing what you're good at.",
      },
    ],
  },
  {
    id: "free_role",
    category: "On the pitch",
    title: "Free role",
    text: "The manager offers you a free role between the lines, or a strict position in his system.",
    positions: CREATORS,
    minAge: 20,
    maxAge: 32,
    weight: 8,
    choices: [
      {
        id: "freedom",
        label: "Ask for freedom",
        hint: "Roam and create.",
        outcomes: [
          { chance: 60, effects: { ovr: 3 }, text: "Given the keys to the team, you play the best football of your life." },
          { chance: 40, effects: { ovr: -2 }, text: "Without structure you drift out of games." },
        ],
      },
      {
        id: "system",
        label: "Play the system",
        hint: "Discipline wins titles.",
        effects: { ovr: 1 },
        text: "You do your job, week in, week out.",
      },
    ],
  },
  {
    id: "defensive_leader",
    category: "On the pitch",
    title: "Leaking goals",
    text: "The defence is conceding every week, and the dressing room is looking at you.",
    positions: DEFENDERS,
    minAge: 21,
    maxAge: 34,
    weight: 8,
    choices: [
      {
        id: "take_charge",
        label: "Take charge of the back line",
        hint: "Organise, shout, lead.",
        outcomes: [
          { chance: 65, effects: { ovr: 3 }, text: "Clean sheet after clean sheet. You're the boss back there now." },
          { chance: 35, effects: { ovr: -1 }, text: "Too much on your plate. Your own game suffers." },
        ],
      },
      {
        id: "own_job",
        label: "Focus on your own job",
        hint: "Keep it simple.",
        effects: { ovr: 1 },
        text: "You keep your own house in order.",
      },
    ],
  },
  {
    id: "overlap",
    category: "On the pitch",
    title: "Bomb forward",
    text: "The manager wants you overlapping on every single attack.",
    positions: ["LB", "RB"],
    minAge: 19,
    maxAge: 31,
    weight: 7,
    choices: [
      {
        id: "go_forward",
        label: "Go all in",
        hint: "Crosses, overlaps, assists.",
        outcomes: [
          { chance: 60, effects: { ovr: 3 }, text: "You become one of the most dangerous full-backs in the league." },
          { chance: 40, effects: { ovr: -2 }, text: "Opponents target the space behind you, again and again." },
        ],
      },
      {
        id: "disciplined",
        label: "Stay disciplined",
        hint: "Defend first.",
        effects: { ovr: 1 },
        text: "Your winger rarely gets past you.",
      },
    ],
  },
  {
    id: "set_pieces",
    category: "On the pitch",
    title: "Attack every corner",
    text: "The coach wants you up for every corner and free kick.",
    positions: ["CB"],
    minAge: 20,
    maxAge: 33,
    weight: 7,
    choices: [
      {
        id: "attack",
        label: "Attack the ball",
        hint: "Become a threat at both ends.",
        outcomes: [
          { chance: 65, effects: { ovr: 2 }, text: "Headers, goals, and a reputation at both ends of the pitch." },
          { chance: 35, effects: { ovr: -1 }, text: "You get caught upfield on the counter one too many times." },
        ],
      },
      {
        id: "stay_back",
        label: "Stay back and cover",
        hint: "Someone has to.",
        effects: {},
        text: "You hold the fort while the others go up.",
      },
    ],
  },
  {
    id: "sweeper_keeper",
    category: "On the pitch",
    title: "Play it out",
    text: "The new coach wants a goalkeeper who plays out from the back under pressure.",
    positions: ["GK"],
    minAge: 19,
    maxAge: 33,
    weight: 9,
    choices: [
      {
        id: "embrace",
        label: "Embrace it",
        hint: "Become the first attacker.",
        outcomes: [
          { chance: 60, effects: { ovr: 3 }, text: "Your passing becomes the first weapon in the team's attack." },
          { chance: 40, effects: { ovr: -2 }, text: "A misplaced pass gifts a goal and it haunts you." },
        ],
      },
      {
        id: "simple",
        label: "Keep it simple",
        hint: "Long when in doubt.",
        effects: { ovr: 1 },
        text: "Safe hands and long kicks. Nobody complains.",
      },
    ],
  },
  {
    id: "shootout",
    category: "On the pitch",
    title: "Penalty shoot-out",
    text: "Cup semi-final, sudden death. The fifth taker steps up.",
    positions: ["GK"],
    minAge: 19,
    maxAge: 37,
    weight: 8,
    choices: [
      {
        id: "dive_early",
        label: "Guess and dive early",
        hint: "Fortune favours the brave.",
        outcomes: [
          { chance: 50, effects: { ovr: 3 }, text: "You guess right and save it. You're carried off on shoulders." },
          { chance: 50, effects: { ovr: -1 }, text: "He rolls it down the middle while you're on the floor." },
        ],
      },
      {
        id: "wait",
        label: "Stand tall and wait",
        hint: "Make him decide.",
        effects: { ovr: 1 },
        text: "He hits the post. Close enough.",
      },
    ],
  },
];