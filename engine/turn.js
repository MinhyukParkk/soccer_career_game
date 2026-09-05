import { EVENT_POOL, filterEligibleEvents, weightedRandomPick, applyEffects } from "./events.js";
import clubs from "../data/clubs.js";

// Placeholder choice picker for demo use. Swap this out for real user
// input (CLI prompt or web UI click handler) when you build the interface.
export function autoChoose(eventView) {
  return eventView.choices[Math.floor(Math.random() * eventView.choices.length)];
}

// chooseFn(eventView, player) can be sync or async (return a Promise),
// so real user input (CLI prompt, web click) works the same as autoChoose.
export async function runTurn(player, turnLength = 2, chooseFn = autoChoose) {
  player.age += turnLength;

  const eligible = filterEligibleEvents(EVENT_POOL, player);
  if (eligible.length === 0) return null;

  const event = weightedRandomPick(eligible);

  // Dynamic events (e.g. transfers) build their text/choices at runtime,
  // based on things like which clubs are currently within the player's
  // reach. If build() returns null (nothing available right now), we treat
  // this turn as quiet rather than crashing.
  const eventView = event.dynamic ? event.build(player, clubs) : event;
  if (!eventView) return null;

  const choice = await chooseFn(eventView, player);
  applyEffects(choice.effects, player);

  return { event: event.id, choice: choice.id, resultText: choice.resultText };
}

export function checkRetirement(player) {
  return player.age >= 36 || player.flags.hasRetiredEarly;
}