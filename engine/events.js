import injuryEvents from "../data/events/injury.js";
import transferEvents from "../data/events/transfer.js";
import trainingEvents from "../data/events/training.js";
import nationalTeamEvents from "../data/events/nationalTeam.js";
import scandalEvents from "../data/events/scandal.js";
import managerEvents from "../data/events/manager.js";
import { getByPath, setByPath } from "./player.js";

// All event categories combined into one pool. To add a new category,
// create a new file under data/events/ and import + spread it here.
// Note: evt_transfer_window (inside transferEvents) is handled specially
// by engine/turn.js — it's guaranteed every season and isn't drawn from
// this pool via weightedRandomPick like everything else.
export const EVENT_POOL = [
  ...injuryEvents,
  ...transferEvents,
  ...trainingEvents,
  ...nationalTeamEvents,
  ...scandalEvents,
  ...managerEvents,
];

function meetsConditions(event, player) {
  if (player.age < event.minAge || player.age > event.maxAge) return false;
  const c = event.conditions || {};
  if (c.excludesFlag && player.flags[c.excludesFlag]) return false;
  if (c.requiresFlag && !player.flags[c.requiresFlag]) return false;
  if (
    c.minReputationFanFame &&
    player.reputation.fanFame < c.minReputationFanFame
  )
    return false;
  return true;
}

export function filterEligibleEvents(pool, player) {
  return pool.filter((e) => meetsConditions(e, player));
}

export function weightedRandomPick(events) {
  const totalWeight = events.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const e of events) {
    roll -= e.weight;
    if (roll <= 0) return e;
  }
  return events[events.length - 1];
}

// Paths that should stay within a sane bounded range even after many
// seasons of accumulated effects — without this, morale/fanFame in
// particular can drift to nonsensical values over a long career.
const CLAMPS = {
  "condition.fitness": [0, 100],
  "condition.morale": [0, 100],
  "reputation.fanFame": [0, 100],
  "stats.attack": [1, 99],
  "stats.defense": [1, 99],
  "stats.speed": [1, 99],
  "stats.stamina": [1, 99],
  "stats.technique": [1, 99],
  "stats.mental": [1, 99],
};

export function applyEffects(effects, player) {
  for (const [path, value] of Object.entries(effects)) {
    if (path.startsWith("push:")) {
      const arrPath = path.slice("push:".length);
      const arr = getByPath(player, arrPath);
      arr.push(value);
      continue;
    }

    const current = getByPath(player, path);
    let next;
    if (typeof current === "number") {
      next = current + value;
    } else {
      setByPath(player, path, value); // booleans / direct assignment
      continue;
    }

    const clamp = CLAMPS[path];
    if (clamp) next = Math.max(clamp[0], Math.min(clamp[1], next));
    setByPath(player, path, next);
  }
}

// Some choices are risky: instead of one fixed set of effects, they define
// `outcomes`, a list of { probability, label, positive, effects, resultText }.
// This rolls which outcome actually happens. Plain choices (just `effects` +
// `resultText`, no `outcomes`) are returned unchanged for backward compatibility.
export function resolveChoiceOutcome(choice) {
  if (!choice.outcomes) {
    return { effects: choice.effects, resultText: choice.resultText };
  }
  const roll = Math.random();
  let cumulative = 0;
  for (const outcome of choice.outcomes) {
    cumulative += outcome.probability;
    if (roll <= cumulative) {
      return { effects: outcome.effects, resultText: outcome.resultText };
    }
  }
  // Floating point safety net — probabilities should sum to 1, but if they
  // don't quite, fall back to the last outcome rather than returning nothing.
  const last = choice.outcomes[choice.outcomes.length - 1];
  return { effects: last.effects, resultText: last.resultText };
}