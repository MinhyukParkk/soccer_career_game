// Top-2-tier clubs from Europe's "big five" leagues. Club names are used
// purely as factual game data (like any football sim), not as creative or
// trademarked content — no crests/logos are reproduced here.
//
// `requiredOvr` is the player's overall rating needed to realistically
// have a shot at this club: second-tier sides sit in the 50-60s (a 50-70
// OVR player is competitive there), top-flight mid-table clubs need
// 70-80, and the historic giants only come calling at 85+ (90+ is
// genuine global-superstar territory).

export default [
  // ===== England: Premier League (tier 1) =====
  { id: "eng_mancity", name: "Manchester City", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 88 },
  { id: "eng_liverpool", name: "Liverpool", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 86 },
  { id: "eng_manutd", name: "Manchester United", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 78 },
  { id: "eng_arsenal", name: "Arsenal", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 76 },
  { id: "eng_chelsea", name: "Chelsea", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 76 },
  { id: "eng_tottenham", name: "Tottenham Hotspur", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 74 },
  { id: "eng_newcastle", name: "Newcastle United", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 72 },
  { id: "eng_astonvilla", name: "Aston Villa", league: "Premier League", tier: 1, country: "ENG", requiredOvr: 70 },

  // ===== England: Championship (tier 2) =====
  { id: "eng_leeds", name: "Leeds United", league: "Championship", tier: 2, country: "ENG", requiredOvr: 60 },
  { id: "eng_leicester", name: "Leicester City", league: "Championship", tier: 2, country: "ENG", requiredOvr: 58 },
  { id: "eng_sunderland", name: "Sunderland", league: "Championship", tier: 2, country: "ENG", requiredOvr: 54 },
  { id: "eng_southampton", name: "Southampton", league: "Championship", tier: 2, country: "ENG", requiredOvr: 56 },
  { id: "eng_norwich", name: "Norwich City", league: "Championship", tier: 2, country: "ENG", requiredOvr: 52 },

  // ===== Spain: La Liga (tier 1) =====
  { id: "esp_realmadrid", name: "Real Madrid", league: "La Liga", tier: 1, country: "ESP", requiredOvr: 92 },
  { id: "esp_barcelona", name: "Barcelona", league: "La Liga", tier: 1, country: "ESP", requiredOvr: 90 },
  { id: "esp_atletico", name: "Atlético Madrid", league: "La Liga", tier: 1, country: "ESP", requiredOvr: 80 },
  { id: "esp_sociedad", name: "Real Sociedad", league: "La Liga", tier: 1, country: "ESP", requiredOvr: 73 },
  { id: "esp_athletic", name: "Athletic Club", league: "La Liga", tier: 1, country: "ESP", requiredOvr: 72 },
  { id: "esp_sevilla", name: "Sevilla FC", league: "La Liga", tier: 1, country: "ESP", requiredOvr: 71 },

  // ===== Spain: Segunda División (tier 2) =====
  { id: "esp_levante", name: "Levante UD", league: "Segunda División", tier: 2, country: "ESP", requiredOvr: 53 },
  { id: "esp_racing", name: "Racing de Santander", league: "Segunda División", tier: 2, country: "ESP", requiredOvr: 51 },
  { id: "esp_oviedo", name: "Real Oviedo", league: "Segunda División", tier: 2, country: "ESP", requiredOvr: 50 },
  { id: "esp_eibar", name: "SD Eibar", league: "Segunda División", tier: 2, country: "ESP", requiredOvr: 50 },

  // ===== Germany: Bundesliga (tier 1) =====
  { id: "ger_bayern", name: "Bayern Munich", league: "Bundesliga", tier: 1, country: "GER", requiredOvr: 91 },
  { id: "ger_dortmund", name: "Borussia Dortmund", league: "Bundesliga", tier: 1, country: "GER", requiredOvr: 80 },
  { id: "ger_leverkusen", name: "Bayer Leverkusen", league: "Bundesliga", tier: 1, country: "GER", requiredOvr: 79 },
  { id: "ger_leipzig", name: "RB Leipzig", league: "Bundesliga", tier: 1, country: "GER", requiredOvr: 75 },
  { id: "ger_frankfurt", name: "Eintracht Frankfurt", league: "Bundesliga", tier: 1, country: "GER", requiredOvr: 70 },
  { id: "ger_unionberlin", name: "Union Berlin", league: "Bundesliga", tier: 1, country: "GER", requiredOvr: 70 },

  // ===== Germany: 2. Bundesliga (tier 2) =====
  { id: "ger_schalke", name: "Schalke 04", league: "2. Bundesliga", tier: 2, country: "GER", requiredOvr: 56 },
  { id: "ger_hamburg", name: "Hamburger SV", league: "2. Bundesliga", tier: 2, country: "GER", requiredOvr: 55 },
  { id: "ger_hertha", name: "Hertha BSC", league: "2. Bundesliga", tier: 2, country: "GER", requiredOvr: 55 },
  { id: "ger_dusseldorf", name: "Fortuna Düsseldorf", league: "2. Bundesliga", tier: 2, country: "GER", requiredOvr: 51 },

  // ===== Italy: Serie A (tier 1) =====
  { id: "ita_juventus", name: "Juventus", league: "Serie A", tier: 1, country: "ITA", requiredOvr: 85 },
  { id: "ita_inter", name: "Inter Milan", league: "Serie A", tier: 1, country: "ITA", requiredOvr: 84 },
  { id: "ita_milan", name: "AC Milan", league: "Serie A", tier: 1, country: "ITA", requiredOvr: 82 },
  { id: "ita_napoli", name: "Napoli", league: "Serie A", tier: 1, country: "ITA", requiredOvr: 78 },
  { id: "ita_roma", name: "AS Roma", league: "Serie A", tier: 1, country: "ITA", requiredOvr: 74 },
  { id: "ita_atalanta", name: "Atalanta", league: "Serie A", tier: 1, country: "ITA", requiredOvr: 71 },

  // ===== Italy: Serie B (tier 2) =====
  { id: "ita_sampdoria", name: "Sampdoria", league: "Serie B", tier: 2, country: "ITA", requiredOvr: 54 },
  { id: "ita_parma", name: "Parma", league: "Serie B", tier: 2, country: "ITA", requiredOvr: 53 },
  { id: "ita_palermo", name: "Palermo", league: "Serie B", tier: 2, country: "ITA", requiredOvr: 51 },
  { id: "ita_bari", name: "Bari", league: "Serie B", tier: 2, country: "ITA", requiredOvr: 50 },

  // ===== France: Ligue 1 (tier 1) =====
  { id: "fra_psg", name: "Paris Saint-Germain", league: "Ligue 1", tier: 1, country: "FRA", requiredOvr: 89 },
  { id: "fra_monaco", name: "AS Monaco", league: "Ligue 1", tier: 1, country: "FRA", requiredOvr: 73 },
  { id: "fra_marseille", name: "Olympique de Marseille", league: "Ligue 1", tier: 1, country: "FRA", requiredOvr: 73 },
  { id: "fra_lyon", name: "Olympique Lyonnais", league: "Ligue 1", tier: 1, country: "FRA", requiredOvr: 71 },
  { id: "fra_lille", name: "Lille OSC", league: "Ligue 1", tier: 1, country: "FRA", requiredOvr: 70 },
  { id: "fra_lens", name: "RC Lens", league: "Ligue 1", tier: 1, country: "FRA", requiredOvr: 70 },

  // ===== France: Ligue 2 (tier 2) =====
  { id: "fra_bordeaux", name: "Girondins de Bordeaux", league: "Ligue 2", tier: 2, country: "FRA", requiredOvr: 54 },
  { id: "fra_saintetienne", name: "AS Saint-Étienne", league: "Ligue 2", tier: 2, country: "FRA", requiredOvr: 53 },
  { id: "fra_metz", name: "FC Metz", league: "Ligue 2", tier: 2, country: "FRA", requiredOvr: 51 },
  { id: "fra_auxerre", name: "AJ Auxerre", league: "Ligue 2", tier: 2, country: "FRA", requiredOvr: 50 },
];