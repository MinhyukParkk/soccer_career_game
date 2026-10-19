// Individual awards, by their real names.
//
// League awards depend on your numbers that season (goals for the top
// scorer award, clean sheets for the goalkeeper award) or on how far above
// the league you are. Global awards (Ballon d'Or and friends) need a top
// flight and a truly elite season.

import { leagueBaseline } from "./leagueLevels.js";
import { isGoalkeeper } from "./positions.js";
import { chance, clamp } from "./random.js";

// Real award names where they exist, a plain pattern otherwise.
const NAMES = {
  boot: {
    "Premier League": ["Premier League Golden Boot", "Golden Boot"],
    Championship: ["Championship Golden Boot", "Golden Boot"],
    "La Liga": ["Pichichi Trophy", "Pichichi"],
    Bundesliga: ["Torjägerkanone", "Torjägerkanone"],
    "Serie A": ["Capocannoniere", "Capocannoniere"],
  },
  glove: {
    "Premier League": ["Premier League Golden Glove", "Golden Glove"],
    Championship: ["Championship Golden Glove", "Golden Glove"],
    "La Liga": ["Zamora Trophy", "Zamora"],
  },
  player: {
    "Serie A": ["Serie A Most Valuable Player", "Serie A MVP"],
    "Ligue 1": ["Ligue 1 Player of the Year", "Player of the Year"],
  },
  young: {
    Bundesliga: ["Bundesliga Rookie of the Season", "Rookie of the Season"],
    "Serie A": ["Serie A Best Young Player", "Best Young Player"],
    "Ligue 1": ["Ligue 1 Young Player of the Year", "Young Player"],
  },
  team: {
    "Premier League": ["PFA Team of the Year", "PFA Team of the Year"],
  },
};

const DEFAULT_NAMES = {
  boot: (league) => [`${league} Top Scorer`, "Top Scorer"],
  glove: (league) => [`${league} Goalkeeper of the Season`, "Best Goalkeeper"],
  player: (league) => [`${league} Player of the Season`, "Player of the Season"],
  young: (league) => [`${league} Young Player of the Season`, "Young Player"],
  playmaker: (league) => [`${league} Playmaker of the Season`, "Playmaker"],
  team: (league) => [`${league} Team of the Season`, "Team of the Season"],
};

function leagueAward(type, league) {
  const [name, short] = NAMES[type]?.[league] ?? DEFAULT_NAMES[type](league);
  return { name, short, kind: "award" };
}

const globalAward = (name) => ({ name, short: name, kind: "award" });

const ROLE_WEIGHT = { key: 1, starter: 0.7, rotation: 0.2, bench: 0 };

const BALLON_POSITION = {
  ST: 1, LW: 1, RW: 1, CAM: 1, CM: 0.65, LM: 0.6, RM: 0.6, CDM: 0.45, LB: 0.35, RB: 0.35, CB: 0.35, GK: 0.2,
};

// ctx: { player, ovr, club, season (club season result), age, trophies (array), intl }
export function rollAwards(ctx) {
  const { player, ovr, club, season, age, trophies, intl } = ctx;
  const position = player.identity.position;
  const roleWeight = ROLE_WEIGHT[season.roleId];
  const advantage = ovr - leagueBaseline(club.tier);
  const won = [];
  const has = (kind) => trophies.some((t) => t.kind === kind);
  const leagueWon = has("league");
  const uclWon = trophies.some((t) => t.name === "Champions League");
  const bigInternational = intl?.honours?.length > 0;

  if (season.apps < 12) return won;

  // Top scorer
  const bootStart = club.tier === 1 ? 19 : 17;
  if (chance(clamp((season.goals - bootStart) / 14, 0, 0.9))) won.push(leagueAward("boot", club.league));

  // Most assists
  if (chance(clamp((season.assists - 9) / 10, 0, 0.85))) won.push(leagueAward("playmaker", club.league));

  // Goalkeeper award, decided by clean sheets
  if (isGoalkeeper(position) && chance(clamp((season.cleanSheets - 12) / 8, 0, 0.85))) {
    won.push(leagueAward("glove", club.league));
  }

  // Player of the Season
  if (roleWeight >= 0.7) {
    const p = clamp((advantage - 11) / 10, 0, 0.6) * (roleWeight === 1 ? 1 : 0.6) + (leagueWon ? 0.08 : 0);
    if (advantage >= 9 && chance(p)) won.push(leagueAward("player", club.league));
  }

  // Young Player of the Season
  if (age <= 21 && chance(clamp((advantage - 1) / 10, 0, 0.7) * roleWeight)) {
    won.push(leagueAward("young", club.league));
  }

  // Team of the Season
  if (chance(clamp((advantage - 7) / 10, 0, 0.8) * roleWeight)) won.push(leagueAward("team", club.league));

  if (club.tier !== 1) return won;

  // European Golden Shoe: the top scorer across Europe
  if (chance(clamp((season.goals - 29) / 10, 0, 0.7))) won.push(globalAward("European Golden Shoe"));

  // Golden Boy: best young player in Europe
  if (age <= 20 && chance(clamp((ovr - 76) / 8, 0, 0.75) * Math.max(roleWeight, 0.3))) {
    won.push(globalAward("Golden Boy"));
  }

  // Yashin Trophy: best goalkeeper in the world
  if (isGoalkeeper(position) && ovr >= 88) {
    const p = clamp((ovr - 87) / 8, 0, 0.6) * (uclWon || leagueWon ? 1.3 : 1);
    if (chance(p)) won.push(globalAward("Yashin Trophy"));
  }

  // Ballon d'Or: elite OVR, a big role, and trophies help a lot
  if (ovr >= 91 && roleWeight >= 0.7) {
    const boost = 1 + (uclWon ? 0.6 : 0) + (leagueWon ? 0.3 : 0) + (bigInternational ? 0.6 : 0);
    const p = clamp((ovr - 90) / 15, 0, 0.35) * BALLON_POSITION[position] * boost;
    if (chance(Math.min(0.5, p))) won.push(globalAward("Ballon d'Or"));
  }

  return won;
}