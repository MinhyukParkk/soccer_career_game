# Career Manager

A browser-based (and terminal-based) football career simulator — play through a
career from a 17-year-old academy prospect to retirement, making decisions
each season about transfers, loans, injuries, training, and your national
team. Loosely inspired by [Copero](https://copero.org)'s career sim.

Runs entirely client-side with zero external dependencies — no build step,
no `npm install`, no API keys.

## Quick start

```bash
npm run web
```

Then open the forwarded port (e.g. `http://localhost:3000`) in your browser.
It'll land you straight on the character creation screen.

Prefer a terminal-only experience?

```bash
npm start
```

## How it works

Every season, you'll always get a transfer-window decision (sign somewhere
new, go out on loan, or stay put), plus a chance of one more event on top
(injury, manager conflict, fan backlash, training focus, national team
call-up, or a scandal). Your stats grow and decline with age, and how far
a given stat actually takes you depends on the level of the league you're
playing in — the same player who's a legend in a second-tier side might be
just an average pro in the top flight.

Club trophies and individual awards (Golden Boot, Player of the Season,
etc.) are rolled each season based on how strong your club is and how you
performed. Finished careers can be saved to your browser's local history
and compared against each other.

## Project structure

```
data/                Game data — clubs (5 major European leagues, tiers 1-2)
                      and every narrative event, organized by category
engine/               Pure game logic, shared identically between the CLI
                      and the web UI — player state, the turn/season loop,
                      match simulation, aging, trophies, awards, ratings
ui/                   Browser-only presentation layer (HTML/CSS/JS) — not
                      used by the CLI version at all
index.js              Terminal (CLI) entry point
serve.js              Zero-dependency static file server for the web UI
```

`engine/` and `data/` contain zero browser-specific code (no `localStorage`,
no DOM) so the exact same logic runs whether you're playing in a terminal
or a browser. `ui/careerHistory.js` is the one exception worth knowing about
— it uses `localStorage` and belongs in `ui/`, not `engine/`.

## Disclaimer

Club and league names are used only to make the simulation feel
grounded — no crests, logos, or other assets are reproduced, and this
project has no affiliation with, sponsorship from, or endorsement by any
club or league mentioned.

## License

MIT — see [LICENSE](./LICENSE).