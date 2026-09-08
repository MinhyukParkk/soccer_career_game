// Top-2-tier clubs from Europe's "big five" leagues, plus two fictional
// starting academies (tier 4) used at career creation. Club names are used
// purely as factual game data (like any football sim), not as creative or
// trademarked content — no crests/logos are reproduced here.

export default [
  // ===== Starting academies (tier 4 — where every career begins) =====
  { id: "academy_north", name: "Estrella del Norte Academy", league: "Academy", tier: 4, country: "ARG", reputationRequired: 0, wageMultiplier: 0.2, styleBonus: { speed: 2 } },
  { id: "academy_south", name: "Sur Juvenil Academy", league: "Academy", tier: 4, country: "ARG", reputationRequired: 0, wageMultiplier: 0.2, styleBonus: { technique: 2 } },

  // ===== England: Premier League (tier 1) =====
  { id: "eng_mancity", name: "Manchester City", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 45, wageMultiplier: 2.4, styleBonus: { technique: 3 } },
  { id: "eng_liverpool", name: "Liverpool", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 42, wageMultiplier: 2.2, styleBonus: { stamina: 3 } },
  { id: "eng_arsenal", name: "Arsenal", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 30, wageMultiplier: 1.8, styleBonus: { technique: 2 } },
  { id: "eng_manutd", name: "Manchester United", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 32, wageMultiplier: 1.9, styleBonus: { attack: 2 } },
  { id: "eng_chelsea", name: "Chelsea", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 30, wageMultiplier: 1.8, styleBonus: { mental: 2 } },
  { id: "eng_tottenham", name: "Tottenham Hotspur", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 26, wageMultiplier: 1.6, styleBonus: { attack: 2 } },
  { id: "eng_newcastle", name: "Newcastle United", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 24, wageMultiplier: 1.5, styleBonus: { defense: 2 } },
  { id: "eng_astonvilla", name: "Aston Villa", league: "Premier League", tier: 1, country: "ENG", reputationRequired: 22, wageMultiplier: 1.4, styleBonus: {} },

  // ===== England: Championship (tier 2) =====
  { id: "eng_leeds", name: "Leeds United", league: "Championship", tier: 2, country: "ENG", reputationRequired: 14, wageMultiplier: 0.9, styleBonus: {} },
  { id: "eng_leicester", name: "Leicester City", league: "Championship", tier: 2, country: "ENG", reputationRequired: 13, wageMultiplier: 0.85, styleBonus: {} },
  { id: "eng_southampton", name: "Southampton", league: "Championship", tier: 2, country: "ENG", reputationRequired: 12, wageMultiplier: 0.8, styleBonus: {} },
  { id: "eng_norwich", name: "Norwich City", league: "Championship", tier: 2, country: "ENG", reputationRequired: 10, wageMultiplier: 0.75, styleBonus: {} },
  { id: "eng_sunderland", name: "Sunderland", league: "Championship", tier: 2, country: "ENG", reputationRequired: 11, wageMultiplier: 0.75, styleBonus: {} },

  // ===== Spain: La Liga (tier 1) =====
  { id: "esp_realmadrid", name: "Real Madrid", league: "La Liga", tier: 1, country: "ESP", reputationRequired: 50, wageMultiplier: 2.6, styleBonus: { attack: 3, technique: 2 } },
  { id: "esp_barcelona", name: "Barcelona", league: "La Liga", tier: 1, country: "ESP", reputationRequired: 48, wageMultiplier: 2.5, styleBonus: { technique: 3 } },
  { id: "esp_atletico", name: "Atlético Madrid", league: "La Liga", tier: 1, country: "ESP", reputationRequired: 32, wageMultiplier: 1.8, styleBonus: { defense: 3 } },
  { id: "esp_sociedad", name: "Real Sociedad", league: "La Liga", tier: 1, country: "ESP", reputationRequired: 24, wageMultiplier: 1.4, styleBonus: { technique: 2 } },
  { id: "esp_athletic", name: "Athletic Club", league: "La Liga", tier: 1, country: "ESP", reputationRequired: 22, wageMultiplier: 1.4, styleBonus: { stamina: 2 } },
  { id: "esp_sevilla", name: "Sevilla FC", league: "La Liga", tier: 1, country: "ESP", reputationRequired: 22, wageMultiplier: 1.3, styleBonus: {} },

  // ===== Spain: Segunda División (tier 2) =====
  { id: "esp_racing", name: "Racing de Santander", league: "Segunda División", tier: 2, country: "ESP", reputationRequired: 9, wageMultiplier: 0.6, styleBonus: {} },
  { id: "esp_oviedo", name: "Real Oviedo", league: "Segunda División", tier: 2, country: "ESP", reputationRequired: 8, wageMultiplier: 0.55, styleBonus: {} },
  { id: "esp_levante", name: "Levante UD", league: "Segunda División", tier: 2, country: "ESP", reputationRequired: 10, wageMultiplier: 0.6, styleBonus: {} },
  { id: "esp_eibar", name: "SD Eibar", league: "Segunda División", tier: 2, country: "ESP", reputationRequired: 8, wageMultiplier: 0.55, styleBonus: {} },

  // ===== Germany: Bundesliga (tier 1) =====
  { id: "ger_bayern", name: "Bayern Munich", league: "Bundesliga", tier: 1, country: "GER", reputationRequired: 50, wageMultiplier: 2.6, styleBonus: { technique: 2, mental: 2 } },
  { id: "ger_leverkusen", name: "Bayer Leverkusen", league: "Bundesliga", tier: 1, country: "GER", reputationRequired: 30, wageMultiplier: 1.7, styleBonus: { technique: 2 } },
  { id: "ger_dortmund", name: "Borussia Dortmund", league: "Bundesliga", tier: 1, country: "GER", reputationRequired: 32, wageMultiplier: 1.8, styleBonus: { speed: 2 } },
  { id: "ger_leipzig", name: "RB Leipzig", league: "Bundesliga", tier: 1, country: "GER", reputationRequired: 26, wageMultiplier: 1.5, styleBonus: { stamina: 2 } },
  { id: "ger_unionberlin", name: "Union Berlin", league: "Bundesliga", tier: 1, country: "GER", reputationRequired: 20, wageMultiplier: 1.2, styleBonus: { defense: 2 } },
  { id: "ger_frankfurt", name: "Eintracht Frankfurt", league: "Bundesliga", tier: 1, country: "GER", reputationRequired: 20, wageMultiplier: 1.2, styleBonus: {} },

  // ===== Germany: 2. Bundesliga (tier 2) =====
  { id: "ger_hamburg", name: "Hamburger SV", league: "2. Bundesliga", tier: 2, country: "GER", reputationRequired: 11, wageMultiplier: 0.7, styleBonus: {} },
  { id: "ger_dusseldorf", name: "Fortuna Düsseldorf", league: "2. Bundesliga", tier: 2, country: "GER", reputationRequired: 9, wageMultiplier: 0.6, styleBonus: {} },
  { id: "ger_schalke", name: "Schalke 04", league: "2. Bundesliga", tier: 2, country: "GER", reputationRequired: 12, wageMultiplier: 0.7, styleBonus: {} },
  { id: "ger_hertha", name: "Hertha BSC", league: "2. Bundesliga", tier: 2, country: "GER", reputationRequired: 11, wageMultiplier: 0.65, styleBonus: {} },

  // ===== Italy: Serie A (tier 1) =====
  { id: "ita_inter", name: "Inter Milan", league: "Serie A", tier: 1, country: "ITA", reputationRequired: 38, wageMultiplier: 2.0, styleBonus: { defense: 2, mental: 2 } },
  { id: "ita_milan", name: "AC Milan", league: "Serie A", tier: 1, country: "ITA", reputationRequired: 34, wageMultiplier: 1.9, styleBonus: { technique: 2 } },
  { id: "ita_juventus", name: "Juventus", league: "Serie A", tier: 1, country: "ITA", reputationRequired: 40, wageMultiplier: 2.0, styleBonus: { mental: 3 } },
  { id: "ita_napoli", name: "Napoli", league: "Serie A", tier: 1, country: "ITA", reputationRequired: 30, wageMultiplier: 1.7, styleBonus: { attack: 2 } },
  { id: "ita_roma", name: "AS Roma", league: "Serie A", tier: 1, country: "ITA", reputationRequired: 26, wageMultiplier: 1.5, styleBonus: {} },
  { id: "ita_atalanta", name: "Atalanta", league: "Serie A", tier: 1, country: "ITA", reputationRequired: 22, wageMultiplier: 1.3, styleBonus: { speed: 2 } },

  // ===== Italy: Serie B (tier 2) =====
  { id: "ita_parma", name: "Parma", league: "Serie B", tier: 2, country: "ITA", reputationRequired: 10, wageMultiplier: 0.6, styleBonus: {} },
  { id: "ita_palermo", name: "Palermo", league: "Serie B", tier: 2, country: "ITA", reputationRequired: 9, wageMultiplier: 0.55, styleBonus: {} },
  { id: "ita_bari", name: "Bari", league: "Serie B", tier: 2, country: "ITA", reputationRequired: 8, wageMultiplier: 0.5, styleBonus: {} },
  { id: "ita_sampdoria", name: "Sampdoria", league: "Serie B", tier: 2, country: "ITA", reputationRequired: 11, wageMultiplier: 0.6, styleBonus: {} },

  // ===== France: Ligue 1 (tier 1) =====
  { id: "fra_psg", name: "Paris Saint-Germain", league: "Ligue 1", tier: 1, country: "FRA", reputationRequired: 45, wageMultiplier: 2.4, styleBonus: { attack: 3 } },
  { id: "fra_monaco", name: "AS Monaco", league: "Ligue 1", tier: 1, country: "FRA", reputationRequired: 24, wageMultiplier: 1.4, styleBonus: {} },
  { id: "fra_marseille", name: "Olympique de Marseille", league: "Ligue 1", tier: 1, country: "FRA", reputationRequired: 24, wageMultiplier: 1.4, styleBonus: { mental: 2 } },
  { id: "fra_lyon", name: "Olympique Lyonnais", league: "Ligue 1", tier: 1, country: "FRA", reputationRequired: 22, wageMultiplier: 1.3, styleBonus: {} },
  { id: "fra_lille", name: "Lille OSC", league: "Ligue 1", tier: 1, country: "FRA", reputationRequired: 20, wageMultiplier: 1.2, styleBonus: { defense: 2 } },
  { id: "fra_lens", name: "RC Lens", league: "Ligue 1", tier: 1, country: "FRA", reputationRequired: 18, wageMultiplier: 1.1, styleBonus: {} },

  // ===== France: Ligue 2 (tier 2) =====
  { id: "fra_bordeaux", name: "Girondins de Bordeaux", league: "Ligue 2", tier: 2, country: "FRA", reputationRequired: 11, wageMultiplier: 0.6, styleBonus: {} },
  { id: "fra_saintetienne", name: "AS Saint-Étienne", league: "Ligue 2", tier: 2, country: "FRA", reputationRequired: 10, wageMultiplier: 0.6, styleBonus: {} },
  { id: "fra_auxerre", name: "AJ Auxerre", league: "Ligue 2", tier: 2, country: "FRA", reputationRequired: 8, wageMultiplier: 0.5, styleBonus: {} },
  { id: "fra_metz", name: "FC Metz", league: "Ligue 2", tier: 2, country: "FRA", reputationRequired: 9, wageMultiplier: 0.55, styleBonus: {} },
];