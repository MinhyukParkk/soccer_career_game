/**
 * FOOTBALL CAREER SIMULATOR — single-file prototype
 * Inspired by Copero's "Convertite en leyenda" (text/choice-based career sim)
 *
 * WHY ONE FILE FOR NOW:
 * For a prototype with a handful of events, a single file is easier to test
 * and share. Everything (player state, event pool, engine functions) lives
 * here so you can just run `node game.js` and see it work end to end.
 *
 * WHEN TO SPLIT (see notes at the bottom of this file):
 * Once you have 30+ events or start building a real UI, split into:
 *   /data/events/injury.js, transfer.js, training.js, nationalTeam.js, scandal.js
 *   /data/clubs.js
 *   /engine/player.js       (createPlayer, state helpers)
 *   /engine/events.js       (filterEligibleEvents, weightedRandomPick, applyEffects)
 *   /engine/turn.js         (runTurn, checkRetirement)
 *   /engine/summary.js      (generateSummary, legacyTier calculation)
 *   /index.js               (entry point / UI wiring)
 */

// ---------------------------------------------------------------------------
// 1. PLAYER STATE
// ---------------------------------------------------------------------------

function createPlayer({ lastName, number, preferredFoot, country, position }) {
  return {
    identity: { lastName, number, preferredFoot, country, position },
    age: 17,
    career: {
      currentClub: "youth_academy",
      clubHistory: [],
      loanHistory: [],
      internationalCaps: 0,
      internationalGoals: 0,
    },
    stats: {
      attack: 40,
      defense: 20,
      speed: 55,
      stamina: 50,
      technique: 45,
      mental: 30,
    },
    condition: {
      fitness: 100,
      morale: 70,
      injuryStatus: null,
      injuryRiskModifier: 0,
    },
    reputation: {
      fanFame: 0,
      scoutInterest: 0,
      marketValue: 0,
    },
    academics: {
      educationLevel: "high_school",
      studying: false,
    },
    flags: {
      hasDoped: false,
      hasRetiredEarly: false,
      isCaptain: false,
    },
    seasonLog: {
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
      titles: [],
    },
    careerLog: {
      totalMatches: 0,
      totalGoals: 0,
      totalAssists: 0,
      collectiveTitles: [],
      individualAwards: [],
    },
  };
}

// ---------------------------------------------------------------------------
// 2. EVENT POOL (all categories in one array — see split notes at bottom)
// ---------------------------------------------------------------------------

const EVENT_POOL = [
  // --- INJURY ---
  {
    id: "evt_injury_minor",
    type: "random",
    category: "injury",
    minAge: 18,
    maxAge: 35,
    weight: 10,
    conditions: { excludesFlag: "hasRetiredEarly" },
    text: "You twisted your ankle in training. What do you do?",
    choices: [
      {
        id: "rest",
        label: "Rest fully",
        effects: { "condition.fitness": -10, delayTurns: 1 },
        resultText: "You recovered fully but lost a season.",
      },
      {
        id: "push_through",
        label: "Push through and return early",
        effects: {
          "condition.fitness": -5,
          "condition.injuryRiskModifier": 15,
          "stats.speed": -2,
        },
        resultText: "You returned fast, but your injury risk is now higher.",
      },
    ],
  },

  // --- TRANSFER ---
  {
    id: "evt_transfer_offer",
    type: "random",
    category: "transfer",
    minAge: 19,
    maxAge: 33,
    weight: 8,
    conditions: { minReputationScoutInterest: 20 },
    text: "A bigger club has made an offer for you. Do you accept the move?",
    choices: [
      {
        id: "accept",
        label: "Accept the transfer",
        effects: {
          "reputation.marketValue": 15,
          "reputation.fanFame": 5,
          "condition.morale": 10,
        },
        resultText: "You joined a new club with higher expectations.",
      },
      {
        id: "stay",
        label: "Stay loyal to your current club",
        effects: { "reputation.fanFame": 8, "condition.morale": 5 },
        resultText: "The fans love your loyalty.",
      },
    ],
  },

  // --- TRAINING ---
  {
    id: "evt_training_focus",
    type: "random",
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
        effects: { "stats.attack": 4, "stats.stamina": -1 },
        resultText: "Your finishing improved noticeably.",
      },
      {
        id: "focus_fitness",
        label: "Fitness and conditioning",
        effects: { "stats.stamina": 4, "condition.injuryRiskModifier": -5 },
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

  // --- NATIONAL TEAM ---
  {
    id: "evt_national_call",
    type: "random",
    category: "nationalTeam",
    minAge: 20,
    maxAge: 34,
    weight: 5,
    conditions: { minReputationFanFame: 30 },
    text: "You've been called up to the national team. How do you prepare?",
    choices: [
      {
        id: "prepare_hard",
        label: "Train intensely to make the starting XI",
        effects: { "condition.fitness": -5, "reputation.fanFame": 10 },
        resultText: "You earned your first cap, and the fans noticed.",
      },
      {
        id: "prepare_balanced",
        label: "Rest and manage your energy",
        effects: { "condition.morale": 8, "reputation.fanFame": 4 },
        resultText: "You made a solid, low-risk debut.",
      },
    ],
  },

  // --- SCANDAL / LIFESTYLE ---
  {
    id: "evt_doping_temptation",
    type: "random",
    category: "scandal",
    minAge: 22,
    maxAge: 34,
    weight: 2,
    conditions: {},
    text: "Someone offers you a banned substance to speed up recovery.",
    choices: [
      {
        id: "refuse",
        label: "Refuse",
        effects: { "condition.morale": 5 },
        resultText: "You kept your integrity intact.",
      },
      {
        id: "accept_doping",
        label: "Accept it",
        effects: {
          "stats.stamina": 8,
          "flags.hasDoped": true,
          "condition.injuryRiskModifier": 10,
        },
        resultText: "Your performance spiked, but you're carrying a risk now.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 3. ENGINE FUNCTIONS
// ---------------------------------------------------------------------------

function getByPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

function setByPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((o, k) => o[k], obj);
  target[last] = value;
}

function meetsConditions(event, player) {
  if (player.age < event.minAge || player.age > event.maxAge) return false;
  const c = event.conditions || {};
  if (c.excludesFlag && player.flags[c.excludesFlag]) return false;
  if (c.requiresFlag && !player.flags[c.requiresFlag]) return false;
  if (
    c.minReputationScoutInterest &&
    player.reputation.scoutInterest < c.minReputationScoutInterest
  )
    return false;
  if (
    c.minReputationFanFame &&
    player.reputation.fanFame < c.minReputationFanFame
  )
    return false;
  return true;
}

function filterEligibleEvents(pool, player) {
  return pool.filter((e) => meetsConditions(e, player));
}

function weightedRandomPick(events) {
  const totalWeight = events.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const e of events) {
    roll -= e.weight;
    if (roll <= 0) return e;
  }
  return events[events.length - 1];
}

function applyEffects(effects, player) {
  for (const [path, delta] of Object.entries(effects)) {
    if (path === "delayTurns") continue; // handled by caller if needed
    const current = getByPath(player, path);
    if (typeof current === "number") {
      setByPath(player, path, current + delta);
    } else {
      setByPath(player, path, delta); // booleans / direct assignment
    }
  }
}

// Simple auto-pick for demo purposes; replace with real user input in a UI.
function autoChoose(event) {
  return event.choices[Math.floor(Math.random() * event.choices.length)];
}

function runTurn(player, turnLength = 2) {
  player.age += turnLength;

  const eligible = filterEligibleEvents(EVENT_POOL, player);
  if (eligible.length === 0) return null;

  const event = weightedRandomPick(eligible);
  const choice = autoChoose(event); // swap this for real user input
  applyEffects(choice.effects, player);

  return { event: event.id, choice: choice.id, resultText: choice.resultText };
}

function checkRetirement(player) {
  return player.age >= 36 || player.flags.hasRetiredEarly;
}

function generateSummary(player) {
  const score =
    player.careerLog.totalGoals * 2 +
    player.careerLog.totalAssists +
    player.career.internationalCaps +
    player.reputation.fanFame;

  let legacyTier = "journeyman";
  if (score > 200) legacyTier = "leyenda";
  else if (score > 100) legacyTier = "world class";
  else if (score > 40) legacyTier = "solid pro";

  return {
    totalMatches: player.careerLog.totalMatches,
    totalGoals: player.careerLog.totalGoals,
    totalAssists: player.careerLog.totalAssists,
    clubsPlayedFor: player.career.clubHistory,
    collectiveTitles: player.careerLog.collectiveTitles,
    individualAwards: player.careerLog.individualAwards,
    internationalCaps: player.career.internationalCaps,
    legacyTier,
  };
}

// ---------------------------------------------------------------------------
// 4. DEMO RUN (console only — replace with real UI later)
// ---------------------------------------------------------------------------

function playDemoCareer() {
  const player = createPlayer({
    lastName: "Garcia",
    number: 10,
    preferredFoot: "left",
    country: "ARG",
    position: "ST",
  });

  console.log(`Career started: ${player.identity.lastName}, age ${player.age}`);

  while (!checkRetirement(player)) {
    const result = runTurn(player);
    if (result) {
      console.log(`[Age ${player.age}] ${result.resultText}`);
    } else {
      console.log(`[Age ${player.age}] Quiet season, no major events.`);
    }
  }

  console.log("\n--- Career Summary ---");
  console.log(generateSummary(player));
}

playDemoCareer();

// ---------------------------------------------------------------------------
// NOTES: WHEN AND HOW TO SPLIT THIS FILE
// ---------------------------------------------------------------------------
//
// Keep it as ONE file while:
//   - You're prototyping the core loop and testing balance (weights, effects)
//   - Event count is small (under ~20-30)
//   - No real UI yet — just console/CLI testing
//
// Split into multiple files once:
//   - Event count grows large (each category becomes its own JSON/JS module,
//     e.g. data/events/injury.js exporting an array, then merged in engine/events.js
//     via `import` + array concat)
//   - You add a real UI (web page) — separate rendering code from game logic
//     entirely, so the engine has zero DOM/UI dependencies
//   - Multiple people work on content (writers add events) vs logic (devs
//     touch engine) — separate folders avoid merge conflicts
//   - You want to unit test the engine functions independently of event data
//
// Suggested structure at that point:
//   /data/events/{injury,transfer,training,nationalTeam,scandal}.js
//   /data/clubs.js
//   /engine/player.js   -> createPlayer, getByPath, setByPath
//   /engine/events.js   -> filterEligibleEvents, weightedRandomPick, applyEffects
//   /engine/turn.js     -> runTurn, checkRetirement
//   /engine/summary.js  -> generateSummary
//   /ui/                -> whatever renders the game (web page, CLI prompts, etc.)
//   /index.js           -> wires it all together