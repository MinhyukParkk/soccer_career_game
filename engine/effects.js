// What a choice does, and how it is shown on a card.
//
// Effect keys:
//   ovr: n       OVR changes by exactly n, straight away
//   role: +1/-1  bigger or smaller role for the coming seasons
//   injury: m    out for m months at the start of the next season
//   ban: m       suspended for m months at the start of the next season
//   captain: true  you become club captain
//
// Cards only ever show things the player can feel: OVR, role, time out,
// the armband. A choice with no effect is shown as a muted "No change".

import { adjustOverall } from "./rating.js";

export function applyEffects(player, effects = {}) {
  const changes = [];
  if (effects.ovr) {
    const actual = adjustOverall(player, effects.ovr);
    if (actual !== 0) changes.push({ kind: "ovr", value: actual });
  }
  if (effects.role) {
    player.status.roleShift = { delta: effects.role };
    changes.push({ kind: "role", value: effects.role });
  }
  if (effects.injury) {
    player.status.unavailable = { months: effects.injury, reason: "injury" };
    changes.push({ kind: "injury", value: effects.injury });
  }
  if (effects.ban) {
    player.status.unavailable = { months: effects.ban, reason: "ban" };
    changes.push({ kind: "ban", value: effects.ban });
  }
  if (effects.captain) {
    player.status.captain = true;
    changes.push({ kind: "captain", value: 1 });
  }
  return changes;
}

const fmtSigned = (n) => (n > 0 ? `+${n}` : `−${Math.abs(n)}`);

// Turns a change (or a planned effect) into a short tag for the UI.
export function changeTag(change) {
  switch (change.kind) {
    case "ovr":
      return { text: `${fmtSigned(change.value)} OVR`, tone: change.value > 0 ? "up" : "down" };
    case "role":
      return { text: change.value > 0 ? "Bigger role" : "Smaller role", tone: change.value > 0 ? "up" : "down" };
    case "injury":
      return { text: `Out ${change.value} month${change.value === 1 ? "" : "s"}`, tone: "down" };
    case "ban":
      return { text: `Banned ${change.value} months`, tone: "down" };
    case "captain":
      return { text: "Club captain", tone: "up" };
    default:
      return { text: "No change", tone: "neutral" };
  }
}

export function effectTags(effects = {}) {
  const tags = [];
  if (effects.ovr) tags.push(changeTag({ kind: "ovr", value: effects.ovr }));
  if (effects.role) tags.push(changeTag({ kind: "role", value: effects.role }));
  if (effects.injury) tags.push(changeTag({ kind: "injury", value: effects.injury }));
  if (effects.ban) tags.push(changeTag({ kind: "ban", value: effects.ban }));
  if (effects.captain) tags.push(changeTag({ kind: "captain", value: 1 }));
  if (!tags.length) tags.push({ text: "No change", tone: "neutral" });
  return tags;
}

// A choice is either certain ({ effects }) or a gamble ({ outcomes }).
// Returns one row of tags per possible outcome, with its chance.
export function describeChoice(choice) {
  if (choice.outcomes?.length) {
    return choice.outcomes.map((outcome) => ({ chance: outcome.chance, tags: effectTags(outcome.effects) }));
  }
  return [{ chance: null, tags: effectTags(choice.effects) }];
}

export const changesToTags = (changes) =>
  changes.length ? changes.map(changeTag) : [{ text: "No change", tone: "neutral" }];