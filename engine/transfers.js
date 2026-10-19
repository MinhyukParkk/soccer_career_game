// The transfer window: the heart of the game. One opens at every decision
// point (every season on Intense, every 2 on Normal, every 3 on Express).
//
// A window always offers: stay where you are, two or three offers from
// clubs around your level (one a step up, one a good fit), sometimes a
// loan while you're young and not playing, and from 33 the option to
// retire. A scenario gives each window its own story: a rival signed for
// your spot, fans turning on you, big clubs circling, your loan ending...
//
// Windows are plain JSON (club ids, not club objects) so they survive a
// page refresh without the offers changing.

import { allClubs, getClub } from "./clubInfo.js";
import { getCountry } from "./nations.js";
import { getPace } from "./pace.js";
import { getPositionProfile } from "./positions.js";
import { computeMarketValue, getOverall } from "./rating.js";
import { baseRoleId, roleRank, rolePreview } from "./squad.js";
import { applyEffects, describeChoice } from "./effects.js";
import { chance, pick, rand, weightedPick } from "./random.js";
import { formatValue } from "./format.js";

export const RETIRE_FROM_AGE = 33;

// ---------------------------------------------------------------- helpers

function roundFee(fee) {
  if (fee < 1) return Math.round(fee * 20) / 20;
  if (fee < 10) return Math.round(fee * 10) / 10;
  return Math.round(fee);
}

function transferFee(player) {
  if (player.age >= 32) return 0;
  if (player.age >= 29 && chance(0.3)) return 0; // out of contract
  return roundFee(computeMarketValue(player) * rand(0.85, 1.35));
}

// Picks a club whose level is close to `center`, within [lo, hi], avoiding
// clubs already used and preferring leagues not already in the window.
function pickClub(lo, hi, center, spread, used, filter = () => true) {
  const usedLeagues = new Set([...used].map((id) => getClub(id)?.league));
  const options = allClubs().filter(
    (c) => !used.has(c.id) && c.requiredOvr >= lo && c.requiredOvr <= hi && filter(c),
  );
  const club = weightedPick(options, (c) => {
    const closeness = Math.exp(-((c.requiredOvr - center) ** 2) / (2 * spread ** 2));
    return closeness * (usedLeagues.has(c.league) ? 0.45 : 1);
  });
  if (club) used.add(club.id);
  return club;
}

// Closest clubs to a level, as a last resort when nothing is in range.
function nearestClub(level, used) {
  const sorted = allClubs()
    .filter((c) => !used.has(c.id))
    .sort((a, b) => Math.abs(a.requiredOvr - level) - Math.abs(b.requiredOvr - level));
  const club = pick(sorted.slice(0, 4));
  if (club) used.add(club.id);
  return club;
}

function clubChoice(player, type, club, extra = {}) {
  return {
    id: `${type}:${club.id}`,
    type,
    clubId: club.id,
    preview: rolePreview(player, club.id),
    ...extra,
  };
}

function moveChoice(player, club, note = null) {
  return clubChoice(player, "move", club, { fee: transferFee(player), note });
}

// ---------------------------------------------------------------- first club

export function buildAcademyWindow(player) {
  const country = getCountry(player.identity.countryCode);
  const home = country?.league ?? null;
  const used = new Set();
  const choices = [];

  // A top-flight academy: mostly smaller clubs, occasionally a giant.
  const topFlight = allClubs().filter((c) => c.tier === 1 && !used.has(c.id));
  const homeTop = topFlight.filter((c) => c.country === home);
  const topPool = home && chance(0.6) ? homeTop : topFlight;
  const top = weightedPick(topPool, (c) => Math.exp(-(c.requiredOvr - 68) / 6));
  used.add(top.id);
  choices.push(clubChoice(player, "move", top, { fee: 0 }));

  // Two second-division clubs, one from home when your country has a league.
  const second = allClubs().filter((c) => c.tier === 2);
  const homeSecond = second.filter((c) => c.country === home && !used.has(c.id));
  const first = home && homeSecond.length ? pick(homeSecond) : pick(second.filter((c) => !used.has(c.id)));
  used.add(first.id);
  // ...and at least one where you would actually get minutes.
  const ovr = getOverall(player);
  const rest = second.filter((c) => !used.has(c.id) && c.league !== first.league);
  const playable = rest.filter((c) => c.requiredOvr <= ovr + 8);
  const other = pick(playable.length ? playable : rest);
  used.add(other.id);
  for (const club of [first, other]) choices.push(clubChoice(player, "move", club, { fee: 0 }));

  return {
    stage: "academy",
    season: player.season,
    title: "Choose your first club",
    scenario: {
      id: "academy",
      title: "Three clubs want you",
      text: "Scouts have been watching you for months. Three clubs have offered you your first professional contract. Where does it all begin?",
    },
    choices,
  };
}

// ---------------------------------------------------------------- regular window

function chooseScenario(player, ovr, club, baseRole) {
  if (player.career.loanReturn) return "loanReturn";
  if (player.age >= 32 && baseRole === "bench") return "released";
  if (player.age >= RETIRE_FROM_AGE) return "final";
  const diff = ovr - club.requiredOvr;
  if (diff >= 4 && ovr >= 72 && chance(0.55)) return "circling";
  if (baseRole === "bench" && player.age >= 21) return "frozen";
  const roll = Math.random();
  if (roll < 0.22 && baseRole !== "bench") return "competition";
  if (roll < 0.34) return "backlash";
  return "quiet";
}

const QUIET_LINES = [
  "A quiet window. Your agent has a few options on the table.",
  "Summer at last. A few clubs have called your agent.",
  "Pre-season is weeks away and your phone keeps buzzing.",
];

function scenarioText(id, player, club) {
  const position = getPositionProfile(player.identity.position).name.toLowerCase();
  const loanClub = getClub(player.career.loanReturn?.clubId);
  switch (id) {
    case "loanReturn":
      return {
        title: "Back from loan",
        text: `Your loan at ${loanClub?.name ?? "your loan club"} is over and you report back to ${club.name}. Time to decide what's next.`,
      };
    case "released":
      return {
        title: "Released",
        text: `${club.name} have decided not to renew your contract. Your agent is looking for a new home.`,
      };
    case "final":
      return {
        title: "Final chapters",
        text: `At ${player.age}, every season could be your last. A couple of clubs still want you, or you could call it a day.`,
      };
    case "circling":
      return {
        title: "Big clubs are circling",
        text: `You've outgrown ${club.name}. One of Europe's biggest clubs has made its move.`,
      };
    case "frozen":
      return {
        title: "Out of the picture",
        text: `You're not in the manager's plans at ${club.name}. Staying means fighting for scraps.`,
      };
    case "competition":
      return {
        title: "Competition for your spot",
        text: `${club.name} have signed a new ${position}. Stay and fight for the shirt, or move on?`,
      };
    case "backlash":
      return {
        title: "The crowd turns",
        text: `After a poor run, part of the ${club.name} crowd has turned on you. Stay and win them back, or start again somewhere else?`,
      };
    default:
      return { title: "Transfer window", text: pick(QUIET_LINES) };
  }
}

function stayChoice(player, club, scenario) {
  const choice = clubChoice(player, "stay", club);
  if (scenario === "competition") {
    choice.outcomes = [
      { chance: 55, effects: { role: 1, ovr: 1 }, text: "You win the battle for the shirt." },
      { chance: 45, effects: { role: -1 }, text: "The new signing takes your place." },
    ];
  } else if (scenario === "backlash") {
    choice.outcomes = [
      { chance: 60, effects: { ovr: 2 }, text: "Your performances win the fans back." },
      { chance: 40, effects: { ovr: -2 }, text: "The boos get louder, and your form suffers." },
    ];
  }
  if (choice.outcomes) choice.outcomePreview = describeChoice(choice);
  return choice;
}

export function buildTransferWindow(player) {
  const ovr = getOverall(player);
  const club = getClub(player.career.clubId);
  const baseRole = baseRoleId(ovr, club);
  const scenarioId = chooseScenario(player, ovr, club, baseRole);
  const used = new Set([club.id]);
  const choices = scenarioId === "released" ? [] : [stayChoice(player, club, scenarioId)];
  const offers = [];

  // Loan club wants to keep you
  const loanReturn = player.career.loanReturn;
  if (loanReturn) {
    const loanClub = getClub(loanReturn.clubId);
    used.add(loanClub.id);
    if (loanClub.requiredOvr <= ovr + 3 && roleRank(loanReturn.roleId) >= 2 && chance(0.65)) {
      offers.push(moveChoice(player, loanClub, "Make the loan permanent"));
    }
  }

  // A dream move when big clubs are circling
  if (scenarioId === "circling") {
    const big =
      pickClub(ovr - 2, ovr + 6, ovr + 3, 2.5, used, (c) => c.tier === 1 && c.requiredOvr > club.requiredOvr) ??
      pickClub(club.requiredOvr + 1, 99, ovr, 4, used, (c) => c.tier === 1);
    if (big) offers.push(moveChoice(player, big, "Dream move"));
  }

  const age = player.age;
  const count = age >= 34 ? 1 : age >= 31 ? 2 : chance(0.5) ? 3 : 2;
  const wanted = Math.max(1, count - offers.length);
  const plans =
    age >= 31
      ? [
          [ovr - 6, ovr + 2, ovr - 2, 3],
          [ovr - 16, ovr - 3, ovr - 7, 4],
        ]
      : [
          [ovr + 1, ovr + 7, ovr + 3, 2.5],
          [ovr - 8, ovr, ovr - 3, 3],
          [ovr - 10, ovr + 5, ovr, 4],
        ];
  for (const [lo, hi, center, spread] of plans.slice(0, wanted)) {
    const target = pickClub(lo, hi, center, spread, used) ?? pickClub(ovr - 16, ovr + 7, ovr, 5, used) ?? nearestClub(ovr, used);
    if (target) offers.push(moveChoice(player, target));
  }

  // A loan when you're young and not playing much
  if (age <= 23 && roleRank(baseRole) <= 1 && chance(0.85)) {
    const loanClub = pickClub(ovr - 10, ovr - 1, ovr - 4, 3, used) ?? pickClub(ovr - 14, ovr + 2, ovr - 5, 4, used);
    if (loanClub) {
      const seasons = getPace(player.pace).seasons;
      offers.push(clubChoice(player, "loan", loanClub, { seasons, note: seasons === 1 ? "Season-long loan" : `${seasons}-season loan` }));
    }
  }

  choices.push(...offers);
  if (age >= RETIRE_FROM_AGE) choices.push({ id: "retire", type: "retire" });

  return {
    stage: "window",
    season: player.season,
    title: "Transfer window",
    scenario: { id: scenarioId, ...scenarioText(scenarioId, player, club) },
    choices,
  };
}

// ---------------------------------------------------------------- resolving

function joinClub(player, club, fee, type) {
  const fromId = player.career.clubId;
  if (type === "loan") {
    player.career.parentClubId = player.career.parentClubId ?? fromId;
    player.career.clubId = club.id;
    player.career.loanSeasonsLeft = getPace(player.pace).seasons;
  } else {
    player.career.clubId = club.id;
    player.career.parentClubId = club.id;
    player.career.loanSeasonsLeft = 0;
  }
  player.status.captain = false;
  player.status.roleShift = null;
  player.careerLog.transfers.push({ season: player.season, age: player.age, fromId, toId: club.id, fee, type });
}

export function resolveTransfer(player, window, choiceId) {
  const choice = window.choices.find((c) => c.id === choiceId);
  if (!choice) throw new Error(`Unknown transfer choice ${choiceId}`);
  const club = choice.clubId ? getClub(choice.clubId) : null;
  let text;
  let changes = [];

  if (choice.type === "retire") {
    player.retired = true;
    player.retirement = { age: player.age, reason: "choice", season: player.season };
    text = `You announce your retirement at ${player.age}. What a ride.`;
  } else if (choice.type === "stay") {
    text = `You stay at ${club.name}.`;
    if (choice.outcomes?.length) {
      const outcome = weightedPick(choice.outcomes, (o) => o.chance);
      changes = applyEffects(player, outcome.effects);
      text += ` ${outcome.text}`;
    }
  } else if (choice.type === "loan") {
    joinClub(player, club, 0, "loan");
    text = `You join ${club.name} on a ${choice.seasons === 1 ? "season-long" : `${choice.seasons}-season`} loan.`;
  } else if (window.stage === "academy") {
    joinClub(player, club, 0, "academy");
    text = `You sign your first professional contract with ${club.name}.`;
  } else {
    joinClub(player, club, choice.fee, "move");
    text = choice.fee > 0 ? `Done deal: you join ${club.name} for ${formatValue(choice.fee)}.` : `You join ${club.name} on a free transfer.`;
  }

  player.career.loanReturn = null;
  return { title: choice.type === "retire" ? "Retirement" : "Transfer window", text, changes, choiceType: choice.type, clubId: choice.clubId ?? null };
}