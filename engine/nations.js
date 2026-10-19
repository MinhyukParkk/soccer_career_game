// National team lookups.

import COUNTRIES, { CONTINENTAL_TOURNAMENT, NATIONAL_TIERS } from "../data/countries.js";

const BY_CODE = new Map(COUNTRIES.map((country) => [country.code, country]));

export const allCountries = () => COUNTRIES;

export const getCountry = (code) => BY_CODE.get(code) ?? null;

export function nationalTier(code) {
  const country = getCountry(code);
  return NATIONAL_TIERS[country?.tier ?? "C"];
}

export function continentalTournament(code) {
  const country = getCountry(code);
  return CONTINENTAL_TOURNAMENT[country?.confed] ?? null;
}

// Tournaments are played in the summer that ends a season: the 2025/26
// season ends with the 2026 World Cup, the 2027/28 one with the continental
// championships.
export function tournamentForSeason(seasonStartYear, code) {
  const year = seasonStartYear + 1;
  if (year % 4 === 2) return { name: "World Cup", kind: "worldCup", year };
  if (year % 4 === 0) {
    const name = continentalTournament(code);
    return name ? { name, kind: "continental", year } : null;
  }
  return null;
}

export function describeNationalTier(code) {
  const tier = getCountry(code)?.tier ?? "C";
  const { callUp } = NATIONAL_TIERS[tier];
  const strength = { A: "Contender", B: "Competitive", C: "Outsider" }[tier];
  return { tier, strength, callUp };
}