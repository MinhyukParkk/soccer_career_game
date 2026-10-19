// The career loop, shared by the web UI and the CLI.
//
//   startCareer(player)          opens the first window (choose a club)
//   chooseTransfer(player, id)   resolves the window; may open an event
//   chooseEvent(player, id)      resolves the event
//   playStretch(player)          plays the next 1-3 seasons (career pace)
//
// player.pending always says what comes next:
//   { stage: "transfer", window }  a transfer window is open
//   { stage: "event", event }      an extra event is waiting
//   { stage: "play" }              ready to play the next seasons
//   { stage: "over" }              the career has ended
// Results of the choices made at this decision point are kept in
// pending.results so the UI can show them again after a refresh.

import { getClub } from "./clubInfo.js";
import { getPace } from "./pace.js";
import { computeMarketValue, getOverall } from "./rating.js";
import { simulateClubSeason } from "./matchSim.js";
import { europeanCompetition, rollClubTrophies } from "./trophies.js";
import { simulateInternationalSeason } from "./international.js";
import { rollAwards } from "./awards.js";
import { applyDevelopment } from "./aging.js";
import { buildAcademyWindow, buildTransferWindow, resolveTransfer } from "./transfers.js";
import { drawEvent, resolveEvent } from "./events.js";
import { chance } from "./random.js";

export const LAST_SEASON_AGE = 39;
const FIRST_EVENT_CHANCE = 0.35;

export function startCareer(player) {
  player.pending = { stage: "transfer", window: buildAcademyWindow(player), results: [] };
  return player.pending;
}

export function chooseTransfer(player, choiceId) {
  const pending = player.pending;
  if (pending?.stage !== "transfer") throw new Error("No transfer window is open.");
  const result = resolveTransfer(player, pending.window, choiceId);
  const results = [result];

  if (player.retired) {
    player.pending = { stage: "over", results };
    return result;
  }
  const odds = pending.window.stage === "academy" ? FIRST_EVENT_CHANCE : getPace(player.pace).eventChance;
  const event = chance(odds) ? drawEvent(player) : null;
  player.pending = event ? { stage: "event", event, results } : { stage: "play", results };
  return result;
}

export function chooseEvent(player, choiceId) {
  const pending = player.pending;
  if (pending?.stage !== "event") throw new Error("No event is waiting.");
  const result = resolveEvent(player, pending.event.id, choiceId);
  player.pending = { stage: "play", results: [...pending.results, result] };
  return result;
}

// The seasons the next stretch will cover, for the "Play" button.
export function upcomingSeasons(player) {
  const count = Math.min(getPace(player.pace).seasons, LAST_SEASON_AGE - player.age + 1);
  return { from: player.season, to: player.season + count - 1, count };
}

function recordStint(log, club, onLoan, row) {
  const last = log.stints[log.stints.length - 1];
  let stint = last;
  if (!last || last.clubId !== club.id || last.loan !== onLoan) {
    stint = { clubId: club.id, loan: onLoan, from: row.season, to: row.season, apps: 0, goals: 0, assists: 0, cleanSheets: 0, minutes: 0, honours: [] };
    log.stints.push(stint);
  }
  stint.to = row.season;
  stint.apps += row.apps;
  stint.goals += row.goals;
  stint.assists += row.assists;
  stint.cleanSheets += row.cleanSheets;
  stint.minutes += row.minutes;
  stint.honours.push(...row.honours.filter((h) => h.kind !== "international").map((h) => ({ name: h.name, kind: h.kind })));
}

function playSeason(player) {
  const log = player.careerLog;
  const ovr = getOverall(player);
  const age = player.age;
  const year = player.season;
  const club = getClub(player.career.clubId);
  const onLoan = player.career.loanSeasonsLeft > 0;

  const season = simulateClubSeason(player, ovr);
  const trophies = rollClubTrophies(club, season);
  const intl = simulateInternationalSeason(player, ovr, year);
  const awards = rollAwards({ player, ovr, club, season, age, trophies, intl });
  const honours = [...trophies, ...intl.honours, ...awards].map((h) => ({ name: h.name, short: h.short, kind: h.kind }));

  const value = computeMarketValue(player, ovr);
  if (value > log.peakValue) {
    log.peakValue = value;
    log.peakValueAge = age;
  }

  const ovrChange = applyDevelopment(player);
  const ovrAfter = getOverall(player);
  if (ovrAfter > log.peakOvr) {
    log.peakOvr = ovrAfter;
    log.peakOvrAge = age + 1;
  }
  if (ovr > log.peakOvr) {
    log.peakOvr = ovr;
    log.peakOvrAge = age;
  }

  const row = {
    season: year,
    age,
    clubId: club.id,
    loan: onLoan,
    roleId: season.roleId,
    captain: player.status.captain,
    ovr,
    ovrChange,
    apps: season.apps,
    minutes: season.minutes,
    goals: season.goals,
    assists: season.assists,
    cleanSheets: season.cleanSheets,
    finish: season.finish,
    europe: europeanCompetition(club, season.finish.position),
    missedMonths: season.missedMonths,
    missedReason: season.missedReason,
    caps: intl.caps,
    intlGoals: intl.goals,
    intlDebut: intl.debut && intl.caps > 0,
    tournament: intl.tournament,
    honours,
    value,
  };

  log.seasons.push(row);
  log.honours.push(...honours.map((h) => ({ ...h, season: year, age, clubId: h.kind === "international" ? null : club.id })));
  log.totals.apps += row.apps;
  log.totals.goals += row.goals;
  log.totals.assists += row.assists;
  log.totals.cleanSheets += row.cleanSheets;
  log.totals.minutes += row.minutes;
  log.intl.caps += intl.caps;
  log.intl.goals += intl.goals;
  if (row.intlDebut) log.intl.debutSeason = year;
  recordStint(log, club, onLoan, row);

  // On to the next season
  player.age += 1;
  player.season += 1;
  player.status.unavailable = null;
  if (onLoan) {
    player.career.loanSeasonsLeft -= 1;
    if (player.career.loanSeasonsLeft <= 0) {
      player.career.loanReturn = { clubId: club.id, roleId: season.roleId };
      player.career.clubId = player.career.parentClubId;
    }
  }
  return row;
}

export function playStretch(player) {
  if (player.pending?.stage !== "play") throw new Error("Not ready to play yet.");
  const { count } = upcomingSeasons(player);
  const ovrBefore = getOverall(player);
  const rows = [];
  for (let i = 0; i < count; i++) rows.push(playSeason(player));
  player.status.roleShift = null;

  const recap = { rows, ovrBefore, ovrAfter: getOverall(player) };
  player.lastRecap = recap;

  if (player.age > LAST_SEASON_AGE) {
    player.retired = true;
    player.retirement = { age: player.age, reason: "age", season: player.season };
    player.pending = { stage: "over", results: [] };
  } else {
    player.pending = { stage: "transfer", window: buildTransferWindow(player), results: [] };
  }
  return recap;
}

export const isCareerOver = (player) => player.retired || player.pending?.stage === "over";