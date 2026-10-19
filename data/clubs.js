// Clubs from the top two divisions of Europe's "big five" leagues.
//
// requiredOvr is the club's level: roughly the OVR a player needs to be a
// regular starter there. Second divisions sit around 50-61, the top flights
// run from 68 (relegation battlers) up to 88-90 (the true giants). That
// level drives everything club-related — which clubs make offers, the role
// you'd get, and how often the club wins trophies.
//
// colour/text are only used to paint a simple roundel with the club's short
// code. No crests or logos are reproduced. League placement is a snapshot
// and won't match every season exactly.

const club = (id, name, short, league, country, tier, requiredOvr, color, text) => ({
  id, name, short, league, country, tier, requiredOvr, color, text,
});

export default [
  // ===== England — Premier League =====
  club("eng_mancity", "Manchester City", "MCI", "Premier League", "ENG", 1, 88, "#6CABDD", "#1C2C5B"),
  club("eng_liverpool", "Liverpool", "LIV", "Premier League", "ENG", 1, 88, "#C8102E", "#F6EB61"),
  club("eng_arsenal", "Arsenal", "ARS", "Premier League", "ENG", 1, 86, "#EF0107", "#FFFFFF"),
  club("eng_chelsea", "Chelsea", "CHE", "Premier League", "ENG", 1, 84, "#034694", "#FFFFFF"),
  club("eng_manutd", "Manchester United", "MUN", "Premier League", "ENG", 1, 80, "#DA291C", "#FBE122"),
  club("eng_tottenham", "Tottenham Hotspur", "TOT", "Premier League", "ENG", 1, 79, "#132257", "#FFFFFF"),
  club("eng_newcastle", "Newcastle United", "NEW", "Premier League", "ENG", 1, 79, "#241F20", "#FFFFFF"),
  club("eng_astonvilla", "Aston Villa", "AVL", "Premier League", "ENG", 1, 78, "#670E36", "#95BFE5"),
  club("eng_brighton", "Brighton & Hove Albion", "BHA", "Premier League", "ENG", 1, 74, "#0057B8", "#FFFFFF"),
  club("eng_forest", "Nottingham Forest", "NFO", "Premier League", "ENG", 1, 73, "#DD0000", "#FFFFFF"),
  club("eng_westham", "West Ham United", "WHU", "Premier League", "ENG", 1, 72, "#7A263A", "#1BB1E7"),
  club("eng_palace", "Crystal Palace", "CRY", "Premier League", "ENG", 1, 72, "#1B458F", "#E3242B"),
  club("eng_brentford", "Brentford", "BRE", "Premier League", "ENG", 1, 70, "#E30613", "#FFFFFF"),
  club("eng_bournemouth", "Bournemouth", "BOU", "Premier League", "ENG", 1, 70, "#DA291C", "#111111"),
  club("eng_everton", "Everton", "EVE", "Premier League", "ENG", 1, 69, "#003399", "#FFFFFF"),
  club("eng_fulham", "Fulham", "FUL", "Premier League", "ENG", 1, 68, "#FFFFFF", "#111111"),
  club("eng_leeds", "Leeds United", "LEE", "Premier League", "ENG", 1, 68, "#FFFFFF", "#1D428A"),
  club("eng_sunderland", "Sunderland", "SUN", "Premier League", "ENG", 1, 68, "#EB172B", "#FFFFFF"),

  // ===== England — Championship =====
  club("eng_leicester", "Leicester City", "LEI", "Championship", "ENG", 2, 61, "#003090", "#FDBE11"),
  club("eng_southampton", "Southampton", "SOU", "Championship", "ENG", 2, 60, "#D71920", "#FFFFFF"),
  club("eng_ipswich", "Ipswich Town", "IPS", "Championship", "ENG", 2, 59, "#3A64A3", "#FFFFFF"),
  club("eng_sheffutd", "Sheffield United", "SHU", "Championship", "ENG", 2, 58, "#EE2737", "#111111"),
  club("eng_boro", "Middlesbrough", "MID", "Championship", "ENG", 2, 57, "#E11B22", "#FFFFFF"),
  club("eng_westbrom", "West Bromwich Albion", "WBA", "Championship", "ENG", 2, 56, "#122F67", "#FFFFFF"),
  club("eng_norwich", "Norwich City", "NOR", "Championship", "ENG", 2, 55, "#FFF200", "#00A650"),
  club("eng_coventry", "Coventry City", "COV", "Championship", "ENG", 2, 55, "#6CB4E4", "#FFFFFF"),
  club("eng_watford", "Watford", "WAT", "Championship", "ENG", 2, 54, "#FBEE23", "#ED2127"),
  club("eng_bristolcity", "Bristol City", "BRC", "Championship", "ENG", 2, 53, "#E21A23", "#FFFFFF"),
  club("eng_qpr", "Queens Park Rangers", "QPR", "Championship", "ENG", 2, 52, "#1D5BA4", "#FFFFFF"),
  club("eng_swansea", "Swansea City", "SWA", "Championship", "ENG", 2, 51, "#FFFFFF", "#121212"),
  club("eng_millwall", "Millwall", "MIL", "Championship", "ENG", 2, 51, "#001D5E", "#FFFFFF"),
  club("eng_preston", "Preston North End", "PNE", "Championship", "ENG", 2, 50, "#FFFFFF", "#001A4C"),

  // ===== Spain — La Liga =====
  club("esp_realmadrid", "Real Madrid", "RMA", "La Liga", "ESP", 1, 90, "#FFFFFF", "#00529F"),
  club("esp_barcelona", "Barcelona", "BAR", "La Liga", "ESP", 1, 89, "#A50044", "#EDBB00"),
  club("esp_atletico", "Atlético Madrid", "ATM", "La Liga", "ESP", 1, 84, "#CB3524", "#FFFFFF"),
  club("esp_athletic", "Athletic Club", "ATH", "La Liga", "ESP", 1, 79, "#EE2523", "#FFFFFF"),
  club("esp_villarreal", "Villarreal", "VIL", "La Liga", "ESP", 1, 79, "#FFE667", "#005187"),
  club("esp_sociedad", "Real Sociedad", "RSO", "La Liga", "ESP", 1, 77, "#0067B1", "#FFFFFF"),
  club("esp_betis", "Real Betis", "BET", "La Liga", "ESP", 1, 77, "#0BB363", "#FFFFFF"),
  club("esp_girona", "Girona", "GIR", "La Liga", "ESP", 1, 73, "#CD2534", "#FFFFFF"),
  club("esp_sevilla", "Sevilla", "SEV", "La Liga", "ESP", 1, 73, "#FFFFFF", "#D81E05"),
  club("esp_valencia", "Valencia", "VAL", "La Liga", "ESP", 1, 72, "#FFFFFF", "#111111"),
  club("esp_celta", "Celta Vigo", "CEL", "La Liga", "ESP", 1, 71, "#8AC3EE", "#0B2A4A"),
  club("esp_osasuna", "Osasuna", "OSA", "La Liga", "ESP", 1, 70, "#D91A21", "#0A346F"),
  club("esp_getafe", "Getafe", "GET", "La Liga", "ESP", 1, 69, "#005999", "#FFFFFF"),
  club("esp_rayo", "Rayo Vallecano", "RAY", "La Liga", "ESP", 1, 69, "#FFFFFF", "#E53027"),
  club("esp_mallorca", "Mallorca", "MLL", "La Liga", "ESP", 1, 69, "#E20613", "#111111"),
  club("esp_espanyol", "Espanyol", "ESP", "La Liga", "ESP", 1, 68, "#007FC8", "#FFFFFF"),
  club("esp_levante", "Levante", "LEV", "La Liga", "ESP", 1, 68, "#B4053F", "#FFFFFF"),
  club("esp_elche", "Elche", "ELC", "La Liga", "ESP", 1, 68, "#FFFFFF", "#05642C"),

  // ===== Spain — Segunda División =====
  club("esp_laspalmas", "Las Palmas", "LPA", "Segunda División", "ESP", 2, 60, "#FFE400", "#004A9F"),
  club("esp_valladolid", "Real Valladolid", "VLL", "Segunda División", "ESP", 2, 58, "#5C2483", "#FFFFFF"),
  club("esp_leganes", "Leganés", "LEG", "Segunda División", "ESP", 2, 57, "#0B4A9E", "#FFFFFF"),
  club("esp_almeria", "Almería", "ALM", "Segunda División", "ESP", 2, 57, "#EE1119", "#FFFFFF"),
  club("esp_granada", "Granada", "GRA", "Segunda División", "ESP", 2, 56, "#C8102E", "#FFFFFF"),
  club("esp_deportivo", "Deportivo La Coruña", "DEP", "Segunda División", "ESP", 2, 55, "#0050A0", "#FFFFFF"),
  club("esp_racing", "Racing Santander", "RAC", "Segunda División", "ESP", 2, 54, "#FFFFFF", "#007A33"),
  club("esp_sporting", "Sporting Gijón", "SPO", "Segunda División", "ESP", 2, 53, "#E30613", "#FFFFFF"),
  club("esp_malaga", "Málaga", "MAL", "Segunda División", "ESP", 2, 53, "#0067B1", "#FFFFFF"),
  club("esp_zaragoza", "Real Zaragoza", "ZAR", "Segunda División", "ESP", 2, 52, "#FFFFFF", "#00519E"),
  club("esp_eibar", "Eibar", "EIB", "Segunda División", "ESP", 2, 51, "#A6192E", "#FFFFFF"),

  // ===== Germany — Bundesliga =====
  club("ger_bayern", "Bayern Munich", "FCB", "Bundesliga", "GER", 1, 90, "#DC052D", "#FFFFFF"),
  club("ger_leverkusen", "Bayer Leverkusen", "B04", "Bundesliga", "GER", 1, 83, "#E32221", "#111111"),
  club("ger_dortmund", "Borussia Dortmund", "BVB", "Bundesliga", "GER", 1, 83, "#FDE100", "#111111"),
  club("ger_leipzig", "RB Leipzig", "RBL", "Bundesliga", "GER", 1, 81, "#FFFFFF", "#DD0741"),
  club("ger_stuttgart", "VfB Stuttgart", "VFB", "Bundesliga", "GER", 1, 79, "#FFFFFF", "#E32219"),
  club("ger_frankfurt", "Eintracht Frankfurt", "SGE", "Bundesliga", "GER", 1, 79, "#111111", "#E1000F"),
  club("ger_freiburg", "SC Freiburg", "SCF", "Bundesliga", "GER", 1, 76, "#111111", "#E2001A"),
  club("ger_wolfsburg", "VfL Wolfsburg", "WOB", "Bundesliga", "GER", 1, 73, "#65B32E", "#FFFFFF"),
  club("ger_gladbach", "Borussia Mönchengladbach", "BMG", "Bundesliga", "GER", 1, 73, "#FFFFFF", "#111111"),
  club("ger_hoffenheim", "TSG Hoffenheim", "TSG", "Bundesliga", "GER", 1, 73, "#1C63B7", "#FFFFFF"),
  club("ger_mainz", "Mainz 05", "M05", "Bundesliga", "GER", 1, 72, "#C3141E", "#FFFFFF"),
  club("ger_werder", "Werder Bremen", "SVW", "Bundesliga", "GER", 1, 71, "#1D9053", "#FFFFFF"),
  club("ger_union", "Union Berlin", "FCU", "Bundesliga", "GER", 1, 70, "#EB1923", "#FFFFFF"),
  club("ger_augsburg", "FC Augsburg", "FCA", "Bundesliga", "GER", 1, 69, "#BA3733", "#FFFFFF"),
  club("ger_hamburg", "Hamburger SV", "HSV", "Bundesliga", "GER", 1, 68, "#FFFFFF", "#0A3F86"),
  club("ger_koln", "1. FC Köln", "KOE", "Bundesliga", "GER", 1, 68, "#FFFFFF", "#ED1C24"),
  club("ger_stpauli", "St. Pauli", "STP", "Bundesliga", "GER", 1, 68, "#6C4A33", "#FFFFFF"),
  club("ger_heidenheim", "Heidenheim", "FCH", "Bundesliga", "GER", 1, 68, "#E2001A", "#FFFFFF"),

  // ===== Germany — 2. Bundesliga =====
  club("ger_bochum", "VfL Bochum", "BOC", "2. Bundesliga", "GER", 2, 59, "#005CA9", "#FFFFFF"),
  club("ger_kiel", "Holstein Kiel", "KSV", "2. Bundesliga", "GER", 2, 58, "#1D3B8F", "#FFFFFF"),
  club("ger_schalke", "Schalke 04", "S04", "2. Bundesliga", "GER", 2, 58, "#004D9D", "#FFFFFF"),
  club("ger_hertha", "Hertha BSC", "BSC", "2. Bundesliga", "GER", 2, 56, "#FFFFFF", "#005CA9"),
  club("ger_kaiserslautern", "1. FC Kaiserslautern", "FCK", "2. Bundesliga", "GER", 2, 55, "#E30613", "#FFFFFF"),
  club("ger_hannover", "Hannover 96", "H96", "2. Bundesliga", "GER", 2, 55, "#1A1A1A", "#E2001A"),
  club("ger_dusseldorf", "Fortuna Düsseldorf", "F95", "2. Bundesliga", "GER", 2, 54, "#FFFFFF", "#E2001A"),
  club("ger_nurnberg", "1. FC Nürnberg", "FCN", "2. Bundesliga", "GER", 2, 53, "#AA1124", "#FFFFFF"),
  club("ger_karlsruhe", "Karlsruher SC", "KSC", "2. Bundesliga", "GER", 2, 52, "#004D99", "#FFFFFF"),
  club("ger_darmstadt", "Darmstadt 98", "D98", "2. Bundesliga", "GER", 2, 52, "#004E9F", "#FFFFFF"),
  club("ger_paderborn", "SC Paderborn", "SCP", "2. Bundesliga", "GER", 2, 51, "#0B0B0B", "#4FA3DB"),

  // ===== Italy — Serie A =====
  club("ita_inter", "Inter Milan", "INT", "Serie A", "ITA", 1, 86, "#0068A8", "#FFFFFF"),
  club("ita_napoli", "Napoli", "NAP", "Serie A", "ITA", 1, 84, "#12A0D7", "#FFFFFF"),
  club("ita_milan", "AC Milan", "ACM", "Serie A", "ITA", 1, 83, "#FB090B", "#111111"),
  club("ita_juventus", "Juventus", "JUV", "Serie A", "ITA", 1, 83, "#111111", "#FFFFFF"),
  club("ita_atalanta", "Atalanta", "ATA", "Serie A", "ITA", 1, 81, "#1E71B8", "#FFFFFF"),
  club("ita_roma", "AS Roma", "ROM", "Serie A", "ITA", 1, 80, "#8E1F2F", "#F0BC42"),
  club("ita_lazio", "Lazio", "LAZ", "Serie A", "ITA", 1, 78, "#87D8F7", "#0B2A4A"),
  club("ita_bologna", "Bologna", "BOL", "Serie A", "ITA", 1, 77, "#1A2F48", "#E04A4A"),
  club("ita_fiorentina", "Fiorentina", "FIO", "Serie A", "ITA", 1, 76, "#482E92", "#FFFFFF"),
  club("ita_como", "Como", "COM", "Serie A", "ITA", 1, 75, "#003DA5", "#FFFFFF"),
  club("ita_torino", "Torino", "TOR", "Serie A", "ITA", 1, 72, "#881F19", "#FFFFFF"),
  club("ita_udinese", "Udinese", "UDI", "Serie A", "ITA", 1, 71, "#FFFFFF", "#111111"),
  club("ita_genoa", "Genoa", "GEN", "Serie A", "ITA", 1, 70, "#A71930", "#FFFFFF"),
  club("ita_parma", "Parma", "PAR", "Serie A", "ITA", 1, 69, "#FFD200", "#1B4094"),
  club("ita_cagliari", "Cagliari", "CAG", "Serie A", "ITA", 1, 69, "#002350", "#FFFFFF"),
  club("ita_sassuolo", "Sassuolo", "SAS", "Serie A", "ITA", 1, 68, "#00A752", "#111111"),
  club("ita_lecce", "Lecce", "LEC", "Serie A", "ITA", 1, 68, "#FFED00", "#C8102E"),
  club("ita_cremonese", "Cremonese", "CRE", "Serie A", "ITA", 1, 68, "#C8102E", "#FFFFFF"),

  // ===== Italy — Serie B =====
  club("ita_monza", "Monza", "MON", "Serie B", "ITA", 2, 59, "#E30613", "#FFFFFF"),
  club("ita_venezia", "Venezia", "VEN", "Serie B", "ITA", 2, 58, "#111111", "#F18A00"),
  club("ita_empoli", "Empoli", "EMP", "Serie B", "ITA", 2, 57, "#0062A8", "#FFFFFF"),
  club("ita_palermo", "Palermo", "PAL", "Serie B", "ITA", 2, 55, "#F4A6C6", "#111111"),
  club("ita_sampdoria", "Sampdoria", "SAM", "Serie B", "ITA", 2, 54, "#1B5497", "#FFFFFF"),
  club("ita_spezia", "Spezia", "SPE", "Serie B", "ITA", 2, 54, "#FFFFFF", "#111111"),
  club("ita_bari", "Bari", "BRI", "Serie B", "ITA", 2, 52, "#FFFFFF", "#E30613"),
  club("ita_modena", "Modena", "MOD", "Serie B", "ITA", 2, 52, "#FFE600", "#0047AB"),
  club("ita_catanzaro", "Catanzaro", "CTZ", "Serie B", "ITA", 2, 51, "#FFD200", "#C8102E"),
  club("ita_cesena", "Cesena", "CES", "Serie B", "ITA", 2, 50, "#111111", "#FFFFFF"),

  // ===== France — Ligue 1 =====
  club("fra_psg", "Paris Saint-Germain", "PSG", "Ligue 1", "FRA", 1, 89, "#004170", "#FF4B4B"),
  club("fra_marseille", "Marseille", "MAR", "Ligue 1", "FRA", 1, 80, "#2FAEE0", "#FFFFFF"),
  club("fra_monaco", "Monaco", "ASM", "Ligue 1", "FRA", 1, 79, "#E7212E", "#FFFFFF"),
  club("fra_lille", "Lille", "LIL", "Ligue 1", "FRA", 1, 78, "#E01E13", "#FFFFFF"),
  club("fra_lyon", "Lyon", "LYO", "Ligue 1", "FRA", 1, 78, "#FFFFFF", "#14387F"),
  club("fra_nice", "Nice", "NIC", "Ligue 1", "FRA", 1, 76, "#C8102E", "#111111"),
  club("fra_lens", "Lens", "RCL", "Ligue 1", "FRA", 1, 76, "#EC1C24", "#FFE600"),
  club("fra_rennes", "Rennes", "REN", "Ligue 1", "FRA", 1, 75, "#E13327", "#111111"),
  club("fra_strasbourg", "Strasbourg", "STR", "Ligue 1", "FRA", 1, 74, "#009FE3", "#FFFFFF"),
  club("fra_brest", "Brest", "BST", "Ligue 1", "FRA", 1, 72, "#E30613", "#FFFFFF"),
  club("fra_toulouse", "Toulouse", "TFC", "Ligue 1", "FRA", 1, 70, "#5E3A96", "#FFFFFF"),
  club("fra_nantes", "Nantes", "NAN", "Ligue 1", "FRA", 1, 69, "#FCD405", "#007A33"),
  club("fra_auxerre", "Auxerre", "AUX", "Ligue 1", "FRA", 1, 68, "#FFFFFF", "#003DA5"),
  club("fra_lehavre", "Le Havre", "HAC", "Ligue 1", "FRA", 1, 68, "#13284A", "#8AB7E5"),
  club("fra_angers", "Angers", "ANG", "Ligue 1", "FRA", 1, 68, "#111111", "#FFFFFF"),
  club("fra_parisfc", "Paris FC", "PFC", "Ligue 1", "FRA", 1, 68, "#00264C", "#FFFFFF"),

  // ===== France — Ligue 2 =====
  club("fra_reims", "Reims", "REI", "Ligue 2", "FRA", 2, 60, "#E30613", "#FFFFFF"),
  club("fra_saintetienne", "Saint-Étienne", "STE", "Ligue 2", "FRA", 2, 59, "#009A44", "#FFFFFF"),
  club("fra_montpellier", "Montpellier", "MTP", "Ligue 2", "FRA", 2, 56, "#002C5C", "#F18A00"),
  club("fra_metz", "Metz", "MET", "Ligue 2", "FRA", 2, 55, "#6E0F2F", "#FFFFFF"),
  club("fra_guingamp", "Guingamp", "EAG", "Ligue 2", "FRA", 2, 53, "#E30613", "#111111"),
  club("fra_amiens", "Amiens", "AMI", "Ligue 2", "FRA", 2, 52, "#FFFFFF", "#111111"),
  club("fra_grenoble", "Grenoble", "GRE", "Ligue 2", "FRA", 2, 51, "#1B4C9C", "#FFFFFF"),
  club("fra_redstar", "Red Star", "RSF", "Ligue 2", "FRA", 2, 51, "#00703C", "#FFFFFF"),
  club("fra_laval", "Laval", "LAV", "Ligue 2", "FRA", 2, 50, "#F58220", "#111111"),
  club("fra_pau", "Pau", "PAU", "Ligue 2", "FRA", 2, 50, "#FFD200", "#0A2D6E"),
];