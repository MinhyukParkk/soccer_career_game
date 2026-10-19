#!/usr/bin/env node
// Career Manager in the terminal. Same engine as the web version:
//   npm start        (or: node index.js)

import readline from "node:readline";
import { stdin, stdout } from "node:process";
import { createPlayer, START_AGE } from "./engine/player.js";
import { POSITION_ORDER, POSITION_PROFILES } from "./engine/positions.js";
import { PACES, PACE_ORDER } from "./engine/pace.js";
import { allCountries, getCountry } from "./engine/nations.js";
import { getClub, clubStars } from "./engine/clubInfo.js";
import { getOverall, computeMarketValue } from "./engine/rating.js";
import { roleFor, roleLabel, expectedMinutes } from "./engine/squad.js";
import { changesToTags } from "./engine/effects.js";
import { chooseEvent, chooseTransfer, LAST_SEASON_AGE, playStretch, startCareer, upcomingSeasons } from "./engine/turn.js";
import { buildCareerSummary } from "./engine/summary.js";
import { formatNumber, formatValue, ordinal, seasonLabel } from "./engine/format.js";

// ------------------------------------------------------------ terminal io

const color = stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (text) => (color ? `\x1b[${code}m${text}\x1b[0m` : String(text));
const bold = paint("1");
const dim = paint("2");
const red = paint("31");
const green = paint("32");
const yellow = paint("33");

const rl = readline.createInterface({ input: stdin, output: stdout, terminal: stdin.isTTY });
const lines = rl[Symbol.asyncIterator]();

async function prompt(question) {
  stdout.write(question);
  const { value, done } = await lines.next();
  if (done) {
    stdout.write("\n\nSee you next time.\n");
    process.exit(0);
  }
  if (!stdin.isTTY) stdout.write(`${value}\n`);
  return value.trim();
}

async function pickNumber(question, count) {
  for (;;) {
    const answer = Number(await prompt(question));
    if (Number.isInteger(answer) && answer >= 1 && answer <= count) return answer - 1;
    console.log(dim(`  Type a number from 1 to ${count}.`));
  }
}

const rule = (char = "─") => dim(char.repeat(64));
const tagText = (tag) => (tag.tone === "up" ? green(tag.text) : tag.tone === "down" ? red(tag.text) : dim(tag.text));
const stars = (club) => {
  const n = clubStars(club);
  return yellow("★".repeat(Math.floor(n)) + (n % 1 ? "½" : "")) + dim("☆".repeat(5 - Math.ceil(n)));
};
const outcomeText = (rows) =>
  rows.map((row) => `${row.chance != null ? `${row.chance}% ` : ""}${row.tags.map(tagText).join(", ")}`).join(dim("  |  "));

// ------------------------------------------------------------ registration

async function register() {
  console.log(`\n${bold("CAREER MANAGER")}  ${dim("a football career simulator")}\n${rule("═")}`);

  let lastName = "";
  while (lastName.replace(/[^\p{L}]/gu, "").length < 2) lastName = await prompt("Last name: ");

  let number = 0;
  while (!(Number.isInteger(number) && number >= 1 && number <= 99)) number = Number(await prompt("Shirt number (1-99): "));

  const foot = (await pickNumber("Preferred foot  1) Left  2) Right : ", 2)) === 0 ? "left" : "right";

  const countries = [...allCountries()].sort((a, b) => a.name.localeCompare(b.name));
  console.log(`\nNationality ${dim("(type the three-letter code)")}`);
  for (let i = 0; i < countries.length; i += 4) {
    console.log("  " + countries.slice(i, i + 4).map((c) => `${c.code} ${c.name}`.padEnd(19)).join(""));
  }
  let country = null;
  while (!country) {
    const answer = (await prompt("Code: ")).toUpperCase();
    country = getCountry(answer) ?? countries.find((c) => c.name.toUpperCase() === answer) ?? null;
    if (!country) console.log(dim("  Not in the list. Try a code like ENG, ESP or KOR."));
  }

  console.log("\nPosition");
  POSITION_ORDER.forEach((pos, i) => console.log(`  ${String(i + 1).padStart(2)}) ${pos.padEnd(4)} ${POSITION_PROFILES[pos].name}`));
  const position = POSITION_ORDER[await pickNumber("Pick 1-12: ", POSITION_ORDER.length)];

  console.log("\nCareer pace");
  PACE_ORDER.forEach((id, i) => console.log(`  ${i + 1}) ${PACES[id].label.padEnd(8)} ${dim(PACES[id].blurb)}`));
  const pace = PACE_ORDER[await pickNumber("Pick 1-3: ", PACE_ORDER.length)];

  return createPlayer({ lastName, number, preferredFoot: foot, countryCode: country.code, position, pace });
}

// ------------------------------------------------------------ the career

function header(player) {
  const club = getClub(player.career.clubId);
  const ovr = getOverall(player);
  const where = club ? `${club.name} (${roleLabel(roleFor(player).id, player.age)})` : "no club yet";
  console.log(`\n${rule("═")}\n${bold(player.identity.lastName.toUpperCase())} #${player.identity.number} · ${player.identity.position} · age ${player.age} · ${seasonLabel(player.season)}`);
  console.log(`OVR ${bold(ovr)} · ${formatValue(computeMarketValue(player, ovr))} · ${where}`);
}

function describeChoice(choice, window, player) {
  if (choice.type === "retire") return `${bold("Retire")} ${dim(`end your career at ${player.age}`)}`;
  const club = getClub(choice.clubId);
  const role = `${choice.preview.label}, ~${formatNumber(choice.preview.minutes)} min`;
  let deal = "";
  if (choice.type === "stay") deal = "stay";
  else if (choice.type === "loan") deal = choice.note;
  else if (window.stage === "academy") deal = "academy deal";
  else deal = choice.fee > 0 ? formatValue(choice.fee) : "free transfer";
  const note = choice.note && choice.type === "move" ? yellow(` [${choice.note}]`) : "";
  let text = `${bold(club.name)} ${dim(club.league)} ${stars(club)}\n       ${role} · ${deal}${note}`;
  if (choice.outcomePreview) text += `\n       ${dim("if you stay:")} ${outcomeText(choice.outcomePreview)}`;
  return text;
}

function printResult(result) {
  const tags = changesToTags(result.changes);
  const showTags = result.choiceType === undefined || result.changes.length;
  console.log(`\n  ${result.text}${showTags ? `  ${tags.map(tagText).join(", ")}` : ""}`);
}

async function transferWindow(player) {
  const window = player.pending.window;
  header(player);
  console.log(`\n${bold(window.stage === "academy" ? "FIRST CONTRACT" : "TRANSFER WINDOW")} · summer ${window.season}`);
  console.log(`${yellow(window.scenario.title)}: ${window.scenario.text}\n`);
  window.choices.forEach((choice, i) => console.log(`  ${i + 1}) ${describeChoice(choice, window, player)}`));
  const index = await pickNumber(`\nYour move (1-${window.choices.length}): `, window.choices.length);
  printResult(chooseTransfer(player, window.choices[index].id));
}

async function eventCard(player) {
  const event = player.pending.event;
  console.log(`\n${bold(event.category.toUpperCase())} · ${bold(event.title)}\n${event.text}\n`);
  event.choices.forEach((choice, i) => console.log(`  ${i + 1}) ${bold(choice.label)} ${dim(choice.hint)}\n       ${outcomeText(choice.preview)}`));
  const index = await pickNumber(`\nChoose (1-${event.choices.length}): `, event.choices.length);
  printResult(chooseEvent(player, event.choices[index].id));
}

async function play(player) {
  const next = upcomingSeasons(player);
  const range = next.count === 1 ? seasonLabel(next.from) : `${seasonLabel(next.from)} to ${seasonLabel(next.to)}`;
  const club = getClub(player.career.clubId);
  const role = roleFor(player);
  console.log(`\nNext: ${range} at ${club.name}, ${roleLabel(role.id, player.age)} (~${formatNumber(expectedMinutes(role.id))} min a season)`);
  await prompt(dim("Press Enter to play... "));

  const recap = playStretch(player);
  const gk = player.identity.position === "GK";
  console.log(`\n  ${dim("Season   Club                       Apps  " + (gk ? " CS" : "Gls") + "  Ast  Lge  Honours")}`);
  for (const row of recap.rows) {
    const rowClub = getClub(row.clubId);
    const name = (rowClub.name + (row.loan ? " (loan)" : "")).slice(0, 26).padEnd(26);
    const honours = row.honours.map((h) => (h.kind === "award" ? h.short : yellow(h.short))).join(", ");
    console.log(`  ${seasonLabel(row.season)}  ${name} ${String(row.apps).padStart(4)}  ${String(gk ? row.cleanSheets : row.goals).padStart(3)}  ${String(row.assists).padStart(3)}  ${ordinal(row.finish.position).padStart(4)}  ${honours}`);
    if (row.intlDebut) console.log(green(`           International debut for ${player.identity.country}`));
    if (row.tournament?.won) console.log(yellow(`           Won the ${row.tournament.year} ${row.tournament.name}!`));
  }
  const delta = recap.ovrAfter - recap.ovrBefore;
  const change = delta > 0 ? green(`+${delta}`) : delta < 0 ? red(`${delta}`) : dim("no change");
  console.log(`\n  OVR ${recap.ovrBefore} -> ${bold(recap.ovrAfter)} (${change})`);
}

function printSummary(player) {
  const s = buildCareerSummary(player);
  const gk = s.position === "GK";
  console.log(`\n${rule("═")}\n${bold("FULL TIME")} · ${s.name.toUpperCase()} retires at ${s.retirement?.age}\n${rule("═")}`);
  console.log(`${yellow(s.legacy.label.toUpperCase())}  ${dim(s.legacy.text)}\n`);
  console.log(`Peak OVR ${bold(s.peakOvr)} (age ${s.peakOvrAge}) · ${s.seasonsPlayed} seasons · ${s.clubCount} clubs · peak value ${formatValue(s.peakValue)}`);
  console.log(`${formatNumber(s.totals.apps)} apps · ${gk ? `${formatNumber(s.totals.cleanSheets)} clean sheets` : `${formatNumber(s.totals.goals)} goals`} · ${formatNumber(s.totals.assists)} assists · ${s.intl.caps} caps (${s.intl.goals} goals)`);

  if (s.trophies.length || s.awards.length) {
    console.log(`\n${bold("Honours")}`);
    for (const h of [...s.trophies, ...s.awards]) console.log(`  ${h.count > 1 ? `${h.count}x ` : "   "}${h.name}`);
  }
  console.log(`\n${bold("Clubs")}`);
  for (const st of s.stints) {
    const club = getClub(st.clubId);
    const years = st.from === st.to ? seasonLabel(st.from) : `${seasonLabel(st.from)}-${seasonLabel(st.to)}`;
    console.log(`  ${(club.name + (st.loan ? " (loan)" : "")).padEnd(30)} ${years.padEnd(16)} ${String(st.apps).padStart(4)} apps  ${String(gk ? st.cleanSheets : st.goals).padStart(3)} ${gk ? "CS " : "gls"}  ${String(st.assists).padStart(3)} ast`);
  }
  console.log(`\n${dim("Play in the browser to save careers to your history: npm run web")}\n`);
}

// ------------------------------------------------------------ main

const player = await register();
console.log(dim(`\nSeasons from age ${START_AGE} to ${LAST_SEASON_AGE}. Every window you stay, move, go on loan, or retire.`));
startCareer(player);

while (player.pending.stage !== "over") {
  const stage = player.pending.stage;
  if (stage === "transfer") await transferWindow(player);
  else if (stage === "event") await eventCard(player);
  else if (stage === "play") await play(player);
}

printSummary(player);
rl.close();