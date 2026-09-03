import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createPlayer } from "./engine/player.js";
import { runTurn, checkRetirement } from "./engine/turn.js";
import { generateSummary } from "./engine/summary.js";

const rl = readline.createInterface({ input, output });

// Prompts the human player to pick a choice for the given event.
// Passed into runTurn as the chooseFn, replacing the random autoChoose.
async function promptChoose(event) {
  console.log(`\n${event.text}`);
  event.choices.forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.label}`);
  });

  while (true) {
    const answer = await rl.question("> ");
    const index = parseInt(answer, 10) - 1;
    if (index >= 0 && index < event.choices.length) {
      return event.choices[index];
    }
    console.log(`Please enter a number between 1 and ${event.choices.length}.`);
  }
}

async function playCareer() {
  const player = createPlayer({
    lastName: "Garcia",
    number: 10,
    preferredFoot: "left",
    country: "ARG",
    position: "ST",
  });

  console.log(`Career started: ${player.identity.lastName}, age ${player.age}`);

  while (!checkRetirement(player)) {
    const result = await runTurn(player, 2, promptChoose);
    if (result) {
      console.log(`[Age ${player.age}] ${result.resultText}`);
    } else {
      console.log(`\n[Age ${player.age}] Quiet season, no major events.`);
    }
  }

  console.log("\n--- Career Summary ---");
  console.log(generateSummary(player));

  rl.close();
}

playCareer();