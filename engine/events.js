// The extra event that sometimes follows a transfer window: picking one
// that fits the player, showing it, and resolving the chosen option.

import EVENTS from "../data/events/index.js";
import { getClub } from "./clubInfo.js";
import { getCountry, nationalTier } from "./nations.js";
import { getOverall } from "./rating.js";
import { roleFor, roleRank } from "./squad.js";
import { applyEffects, describeChoice } from "./effects.js";
import { weightedPick } from "./random.js";
import { getPositionProfile } from "./positions.js";

const BY_ID = new Map(EVENTS.map((event) => [event.id, event]));
const RECENT_MEMORY = 5;

function eventContext(player) {
  const club = getClub(player.career.clubId);
  const country = getCountry(player.identity.countryCode);
  const ovr = getOverall(player);
  return {
    player,
    ovr,
    club,
    roleRank: roleRank(roleFor(player).id),
    abroad: !country?.league || country.league !== club.country,
    nationalTeam: player.status.nationalTeam,
    captain: player.status.captain,
    callUp: nationalTier(player.identity.countryCode).callUp,
  };
}

function isEligible(event, player, ctx) {
  if (event.minAge && player.age < event.minAge) return false;
  if (event.maxAge && player.age > event.maxAge) return false;
  if (event.positions && !event.positions.includes(player.identity.position)) return false;
  if (player.recentEvents.includes(event.id)) return false;
  if (event.once && player.seenEvents.includes(event.id)) return false;
  if (event.when && !event.when(ctx)) return false;
  return true;
}

function fillText(text, player) {
  const club = getClub(player.career.clubId);
  return text
    .replaceAll("{club}", club?.name ?? "the club")
    .replaceAll("{nation}", player.identity.country)
    .replaceAll("{position}", getPositionProfile(player.identity.position).name.toLowerCase());
}

// Returns a ready-to-show (and JSON-safe) event, or null if nothing fits.
export function drawEvent(player) {
  const ctx = eventContext(player);
  const event = weightedPick(EVENTS.filter((e) => isEligible(e, player, ctx)));
  if (!event) return null;
  return {
    id: event.id,
    category: event.category,
    title: event.title,
    text: fillText(event.text, player),
    choices: event.choices.map((choice) => ({
      id: choice.id,
      label: fillText(choice.label, player),
      hint: choice.hint ?? "",
      preview: describeChoice(choice),
    })),
  };
}

export function resolveEvent(player, eventId, choiceId) {
  const event = BY_ID.get(eventId);
  const choice = event?.choices.find((c) => c.id === choiceId);
  if (!choice) throw new Error(`Unknown choice ${eventId}/${choiceId}`);

  let effects = choice.effects ?? {};
  let text = choice.text ?? "";
  if (choice.outcomes?.length) {
    const outcome = weightedPick(choice.outcomes, (o) => o.chance);
    effects = outcome.effects ?? {};
    text = outcome.text;
  }

  const changes = applyEffects(player, effects);
  player.recentEvents = [event.id, ...player.recentEvents].slice(0, RECENT_MEMORY);
  if (!player.seenEvents.includes(event.id)) player.seenEvents.push(event.id);
  return { title: event.title, text: fillText(text, player), changes };
}

export const eventCount = () => EVENTS.length;