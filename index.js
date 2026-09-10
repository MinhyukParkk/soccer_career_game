import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createPlayer } from "./engine/player.js";
import { runTurn, checkRetirement } from "./engine/turn.js";
import { generateSummary } from "./engine/summary.js";
import clubs from "./data/clubs.js";

const rl = readline.createInterface({ input, output });

async function chooseFromList(promptText, options, labelFn) {
  console.log(`\n${promptText}`);
  options.forEach((opt, i) => console.log(`  ${i + 1}. ${labelFn(opt)}`));

  while (true) {
    const answer = await rl.question("> ");
    const index = parseInt(answer, 10) - 1;
    if (index >= 0 && index < options.length) return options[index];
    console.log(`Please enter a number between 1 and ${options.length}.`);
  }
}

function printStatus(player) {
  const s = player.stats;
  const c = player.condition;
  const r = player.reputation;
  const club = clubs.find((cl) => cl.id === player.career.currentClub);

  console.log(
    `\n=== Age ${player.age} — ${club ? club.name : player.career.currentClub} (Tier ${club ? club.tier : "?"}) ===`
  );
  console.log(
    `Fitness ${c.fitness} | Morale ${c.morale} | Fame ${r.fanFame} | Market Value ${r.marketValue}${player.flags.isCaptain ? " | (C)" : ""}`
  );
  console.log(
    `ATT ${s.attack} DEF ${s.defense} SPD ${s.speed} STA ${s.stamina} TEC ${s.technique} MEN ${s.mental}`
  );
}

// Prompts the human player to pick a choice for the given event.
// Passed into runTurn as the chooseFn, replacing the random autoChoose.
async function promptChoose(eventView, player) {
  printStatus(player);
  const picked = await chooseFromList(eventView.text, eventView.choices, (c) => c.label);
  return picked;
}

async function pickStartingClub() {
  const starterClubs = clubs.filter((c) => c.reputationRequired === 0);
  const picked = await chooseFromList(
    "Which academy are you starting your career at?",
    starterClubs,
    (c) => `${c.name} (${c.country})`
  );
  return picked.id;
}

async function playCareer() {
  const lastName = (await rl.question("\nYour player's last name: ")) || "Garcia";
  const startingClub = await pickStartingClub();

  const player = createPlayer({
    lastName,
    number: 10,
    preferredFoot: "left",
    country: "ARG",
    position: "ST",
  });
  player.career.currentClub = startingClub;

  console.log(`\nCareer started: ${player.identity.lastName}, age ${player.age}`);

  while (!checkRetirement(player)) {
    const result = await runTurn(player, 2, promptChoose);
    if (result.resultText) {
      console.log(`\n>> ${result.resultText}`);
    } else {
      console.log(`\n[Age ${player.age}] Quiet season, no major events.`);
    }
    console.log(
      `   This stretch: ${result.season.matches} apps, ${result.season.goals} goals, ${result.season.assists} assists`
    );
  }

  console.log("\n--- Career Summary ---");
  printStatus(player);
  console.log(generateSummary(player));

  rl.close();
}

playCareer();