// League levels: how good you need to be to stand out.
//
// The baseline is the OVR of an average player in that division. Output
// per 90 minutes depends on how far above or below it you are, so a 70 in
// a second division plays like a 90 in a top flight: both are 15 above
// their league's average and both dominate. See qualityCurve in matchSim.

export const LEAGUE_BASELINE = { 1: 75, 2: 55 };

// International football is played against the best of the best.
export const INTERNATIONAL_BASELINE = 78;

export const leagueBaseline = (tier) => LEAGUE_BASELINE[tier] ?? LEAGUE_BASELINE[1];

export const DOMESTIC_CUP = {
  ENG: "FA Cup",
  ESP: "Copa del Rey",
  GER: "DFB-Pokal",
  ITA: "Coppa Italia",
  FRA: "Coupe de France",
};

export const LEAGUE_COUNTRY_NAME = {
  ENG: "England",
  ESP: "Spain",
  GER: "Germany",
  ITA: "Italy",
  FRA: "France",
};