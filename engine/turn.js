import { EVENT_POOL, filterEligibleEvents, weightedRandomPick, applyEffects, resolveChoiceOutcome } from "./events.js";
import { simulateSeasons } from "./matchSim.js";
import { applyAging } from "./aging.js";
import clubs from "../data/clubs.js";

// Placeholder choice picker for demo use. Swap this out for real user
// input (CLI prompt or web UI click handler) when you build the interface.
export function autoChoose(eventView) {
  return eventView.choices[Math.floor(Math.random() * eventView.choices.length)];
}

// chooseFn(eventView, player) can be sync or async (return a Promise),
// so real user input (CLI prompt, web click) works the same as autoChoose.
//
// Returns { event, choice, resultText, season }. `event`/`choice` are null
// on a quiet season (no eligible narrative event), but `resultText` may
// still be set (e.g. a loan spell ending) and `season` (matches/goals/
// assists) is always populated — the player plays matches every stretch
// regardless of whether a decision came up.
export async function runTurn(player, turnLength = 2, chooseFn = autoChoose) {
  player.age += turnLength;

  let resultText = null;

  // A loan spell automatically ends once the player reaches the agreed
  // return age — this happens independently of the random event pool.
  if (player.career.parentClub && player.age >= player.career.loanReturnAge) {
    const parentClub = clubs.find((c) => c.id === player.career.parentClub);
    player.career.clubHistory.push(player.career.currentClub);
    player.career.currentClub = player.career.parentClub;
    player.career.parentClub = null;
    player.career.loanReturnAge = null;
    resultText = `Your loan spell ended — you're back at ${parentClub ? parentClub.name : "your parent club"}.`;
  }

  // Natural age-based development/decline, independent of any story event.
  applyAging(player, turnLength);

  let eventId = null;
  let choiceId = null;

  const eligible = filterEligibleEvents(EVENT_POOL, player);
  if (eligible.length > 0) {
    const event = weightedRandomPick(eligible);

    // Dynamic events (e.g. transfers) build their text/choices at runtime,
    // based on things like which clubs are currently within the player's
    // reach. If build() returns null (nothing available right now), this
    // stretch just has no narrative event, same as an empty eligible pool.
    let eventView = null;
    if (event.dynamic) {
      const built = event.build(player, clubs);
      if (built) eventView = { ...built, category: event.category };
    } else {
      eventView = event;
    }

    if (eventView) {
      const choice = await chooseFn(eventView, player);

      // Risky choices (choice.outcomes present) roll which outcome actually
      // happens; plain choices just use their fixed effects/resultText.
      const resolved = resolveChoiceOutcome(choice);
      applyEffects(resolved.effects, player);

      eventId = event.id;
      choiceId = choice.id;
      resultText = resultText ? `${resultText} ${resolved.resultText}` : resolved.resultText;
    }
  }

  const season = simulateSeasons(player, turnLength);

  return { event: eventId, choice: choiceId, resultText, season };
}

export function checkRetirement(player) {
  return player.age >= 36 || player.flags.hasRetiredEarly;
}