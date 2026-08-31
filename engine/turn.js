import { EVENT_POOL, filterEligibleEvents, weightedRandomPick, applyEffects } from "./events.js";

// Placeholder choice picker for CLI/demo use. Swap this out for real user
// input (CLI prompt or web UI click handler) when you build the interface.
export function autoChoose(event) {
  return event.choices[Math.floor(Math.random() * event.choices.length)];
}

export function runTurn(player, turnLength = 2, chooseFn = autoChoose) {
  player.age += turnLength;

  const eligible = filterEligibleEvents(EVENT_POOL, player);
  if (eligible.length === 0) return null;

  const event = weightedRandomPick(eligible);
  const choice = chooseFn(event);
  applyEffects(choice.effects, player);

  return { event: event.id, choice: choice.id, resultText: choice.resultText };
}

export function checkRetirement(player) {
  return player.age >= 36 || player.flags.hasRetiredEarly;
}