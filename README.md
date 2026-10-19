# Career Manager

A football career simulator. Create a 17-year-old prospect, sign your first
contract and steer a whole career through transfer windows, loans, injuries
and trophies, one decision at a time. Inspired by Copero's *Convertite en
leyenda*.

Runs entirely in the browser (or the terminal) with zero dependencies: no
build step, no `npm install`, no API keys.

## Quick start

```bash
npm run web
```

Open `http://localhost:3000` (in GitHub Codespaces: the **Ports** tab, port
3000). Stop the server with `Ctrl+C`.

Prefer the terminal?

```bash
npm start
```

## How a career plays

1. **Register.** Last name, shirt number, preferred foot, nationality and one
   of 12 positions: ST, LW, RW, CAM, LM, CM, RM, CDM, LB, CB, RB, GK.
2. **First contract.** Three clubs make an offer: a top-flight academy where
   you start on the bench, or second-division clubs where you play.
3. **Transfer windows.** Every decision point opens a window: stay, sign for
   another club, go on loan (while you're young and not playing), or retire
   (from 33). Each window has its own story: a rival signed for your spot,
   the crowd turning on you, big clubs circling, your loan ending.
4. **Events.** Sometimes one extra event follows: training choices, injuries,
   managers, media, the national team, position-specific moments. Every card
   shows exactly what it does, like `+3 OVR · 70%` or `Out 3 months`.
5. **Legacy.** Retire (or play until 39) and get a summary: honours, club
   journey, season-by-season stats and a legacy tier. Save the careers worth
   keeping to your history, ranked by peak OVR.

### Career pace

| Pace    | Seasons per decision | Transfer windows |
|---------|----------------------|------------------|
| Intense | 1                    | up to 23         |
| Normal  | 2                    | up to 12         |
| Express | 3                    | up to 8          |

### What drives the numbers

- **OVR develops every season on its own**: big jumps until 20, smaller
  gains to the mid-twenties, a plateau, then decline from about 30. Each
  player has hidden talent and a personal peak age, so some careers top out
  around 70 and a few reach 90+. The club you play for doesn't change how
  fast you develop.
- **Your role** (Key Player, Starter, Rotation, Bench) comes from your OVR
  against the club's level, and sets your minutes.
- **Output depends on OVR relative to your league.** A 70 in a second
  division plays like a 90 in a top flight: both dominate. In a top flight
  you need 90+ to score like a superstar.
- **Positions play differently.** Strikers live on goals, wingers and No.10s
  split goals and assists, full-backs create more than they score,
  goalkeepers are judged on clean sheets. Market value differs by position
  too.
- **Honours use their real names**: league titles, domestic cups, the
  Champions League and Europa League, the World Cup and continental
  championships, Golden Boots (Pichichi, Torjägerkanone, Capocannoniere),
  Player of the Season, the Ballon d'Or and more.

## Project structure

```
data/
  clubs.js             top two divisions of England, Spain, Germany, Italy, France
  countries.js         nationalities, national team strength and tournaments
  events/              event cards by category (training, injury, manager...)
engine/                game logic, shared by the web and terminal versions
  turn.js              the career loop: windows, events, playing seasons
  transfers.js         transfer windows, scenarios, loans, retirement
  matchSim.js          a season: minutes, goals, assists, clean sheets, table
  aging.js             yearly OVR development
  squad.js             roles and minutes
  trophies.js, awards.js, international.js
  rating.js            OVR and market value
  summary.js           career summary, legacy tier, history record
ui/                    the web pages (home, new career, game, summary, history)
index.js               terminal version
serve.js               tiny static server for the web version
```

The engine never touches the browser, so the same code runs in both versions.
Browser storage lives in `ui/` (`components.js` for the career in progress,
`careerHistory.js` for saved careers).

Adding content is mostly data: a club is one line in `data/clubs.js`, an
event is one object in a file under `data/events/`.

## Disclaimer

Club and league names are used only to identify them. No crests, logos or
other assets are reproduced, and this project is not affiliated with or
endorsed by any club or league.

## License

MIT, see [LICENSE](./LICENSE).