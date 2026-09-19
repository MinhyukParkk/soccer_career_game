import { EVENT_POOL, filterEligibleEvents, weightedRandomPick, applyEffects, resolveChoiceOutcome } from "./events.js";
import { simulateSeasons } from "./matchSim.js";
import { applyAging } from "./aging.js";
import { rollSeasonTrophy } from "./trophies.js";
import { rollSeasonAwards } from "./awards.js";
import clubs from "../data/clubs.js";

const TRANSFER_WINDOW_EVENT = EVENT_POOL.find((e) => e.id === "evt_transfer_window");
const OTHER_EVENT_POOL = EVENT_POOL.filter((e) => e.id !== "evt_transfer_window");

// Chance that a second, non-transfer event also happens in a given season,
// on top of the always-present transfer window.
const OTHER_EVENT_CHANCE = 0.45;

// Placeholder choice picker for demo use. Swap this out for real user
// input (CLI prompt or web UI click handler) when you build the interface.
export function autoChoose(eventView) {
  return eventView.choices[Math.floor(Math.random() * eventView.choices.length)];
}

async function resolveDynamicEvent(event, player, chooseFn) {
  let eventView = null;
  if (event.dynamic) {
    const built = event.build(player, clubs);
    if (built) eventView = { ...built, category: event.category };
  } else {
    eventView = event;
  }
  if (!eventView) return null;

  const choice = await chooseFn(eventView, player);
  const resolved = resolveChoiceOutcome(choice);
  applyEffects(resolved.effects, player);

  return { eventId: event.id, choiceId: choice.id, resultText: resolved.resultText };
}

// chooseFn(eventView, player) can be sync or async (return a Promise), so
// real user input (CLI prompt, web click) works the same as autoChoose.
//
// Every season within this turn (turnLength can bundle several seasons at
// once depending on career pace) guarantees a transfer-window decision,
// then has a chance of one additional event on top (injury, manager
// conflict, fan backlash, training, etc.) — transfers are the backbone of
// every season, everything else is a layer on top of that.
export async function runTurn(player, turnLength = 2, chooseFn = autoChoose) {
  const resultParts = [];
  let lastEventId = null;
  let lastChoiceId = null;
  const totalSeason = { matches: 0, goals: 0, assists: 0 };

  for (let s = 0; s < turnLength; s++) {
    player.age += 1;

    // A loan spell automatically ends once the player reaches the agreed
    // return age — independent of any event.
    if (player.career.parentClub && player.age >= player.career.loanReturnAge) {
      const parentClub = clubs.find((c) => c.id === player.career.parentClub);
      player.career.clubHistory.push(player.career.currentClub);
      player.career.currentClub = player.career.parentClub;
      player.career.parentClub = null;
      player.career.loanReturnAge = null;
      resultParts.push(`Your loan spell ended — you're back at ${parentClub ? parentClub.name : "your parent club"}.`);
    }

    // Natural age-based development/decline, independent of any event.
    applyAging(player, 1);

    // 1) The guaranteed transfer window — always happens, every season.
    if (TRANSFER_WINDOW_EVENT) {
      const outcome = await resolveDynamicEvent(TRANSFER_WINDOW_EVENT, player, chooseFn);
      if (outcome) {
        lastEventId = outcome.eventId;
        lastChoiceId = outcome.choiceId;
        if (outcome.resultText) resultParts.push(outcome.resultText);
      }
    }

    // 2) A chance of one more event on top (injury, manager conflict,
    // fan backlash, training focus, national team, scandal, loan offer...).
    if (Math.random() < OTHER_EVENT_CHANCE) {
      const eligible = filterEligibleEvents(OTHER_EVENT_POOL, player);
      if (eligible.length > 0) {
        const event = weightedRandomPick(eligible);
        const outcome = await resolveDynamicEvent(event, player, chooseFn);
        if (outcome) {
          lastEventId = outcome.eventId;
          lastChoiceId = outcome.choiceId;
          if (outcome.resultText) resultParts.push(outcome.resultText);
        }
      }
    }

    const seasonStats = simulateSeasons(player, 1);
    totalSeason.matches += seasonStats.matches;
    totalSeason.goals += seasonStats.goals;
    totalSeason.assists += seasonStats.assists;

    // Whether the club actually wins something this season — the real
    // difference between playing for a giant and playing for a minnow.
    const trophyResult = rollSeasonTrophy(player, clubs);
    if (trophyResult) resultParts.push(trophyResult);

    // Personal recognition for a standout individual season, separate
    // from whatever the club did collectively.
    const awardResult = rollSeasonAwards(player, clubs, seasonStats.goals);
    if (awardResult) resultParts.push(awardResult);
  }

  return {
    event: lastEventId,
    choice: lastChoiceId,
    resultText: resultParts.length ? resultParts.join(" ") : null,
    season: totalSeason,
  };
}

export function checkRetirement(player) {
  return player.age >= 36 || player.flags.hasRetiredEarly;
}