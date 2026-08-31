import { createPlayer } from "./engine/player.js";
import { runTurn, checkRetirement } from "./engine/turn.js";
import { generateSummary } from "./engine/summary.js";
 
// This is a console-only demo entry point. Once you build a real UI
// (web page or CLI prompts), replace this with code that wires user
// input into runTurn's chooseFn parameter instead of the random autoChoose.
function playDemoCareer() {
  const player = createPlayer({
    lastName: "Garcia",
    number: 10,
    preferredFoot: "left",
    country: "ARG",
    position: "ST",
  });
 
  console.log(`Career started: ${player.identity.lastName}, age ${player.age}`);
 
  while (!checkRetirement(player)) {
    const result = runTurn(player);
    if (result) {
      console.log(`[Age ${player.age}] ${result.resultText}`);
    } else {
      console.log(`[Age ${player.age}] Quiet season, no major events.`);
    }
  }
 
  console.log("\n--- Career Summary ---");
  console.log(generateSummary(player));
}
 
playDemoCareer();
 