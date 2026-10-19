// Nationalities you can pick at registration.
//
// tier sets how strong the national side is: the OVR you need for a first
// call-up and how often the team wins tournaments. confed decides which
// continental championship they play. league is set for the countries whose
// domestic league exists in data/clubs.js, so your first academy offers can
// come from home.

const country = (name, code, confed, tier, league = null) => ({ name, code, confed, tier, league });

export default [
  country("Argentina", "ARG", "CONMEBOL", "A"),
  country("Belgium", "BEL", "UEFA", "A"),
  country("Brazil", "BRA", "CONMEBOL", "A"),
  country("Cameroon", "CMR", "CAF", "C"),
  country("Canada", "CAN", "CONCACAF", "C"),
  country("Chile", "CHI", "CONMEBOL", "C"),
  country("Colombia", "COL", "CONMEBOL", "B"),
  country("Croatia", "CRO", "UEFA", "B"),
  country("Denmark", "DEN", "UEFA", "B"),
  country("Ecuador", "ECU", "CONMEBOL", "C"),
  country("Egypt", "EGY", "CAF", "C"),
  country("England", "ENG", "UEFA", "A", "ENG"),
  country("France", "FRA", "UEFA", "A", "FRA"),
  country("Germany", "GER", "UEFA", "A", "GER"),
  country("Ghana", "GHA", "CAF", "C"),
  country("Italy", "ITA", "UEFA", "A", "ITA"),
  country("Ivory Coast", "CIV", "CAF", "C"),
  country("Japan", "JPN", "AFC", "B"),
  country("Mexico", "MEX", "CONCACAF", "B"),
  country("Morocco", "MAR", "CAF", "B"),
  country("Netherlands", "NED", "UEFA", "A"),
  country("Nigeria", "NGA", "CAF", "C"),
  country("Norway", "NOR", "UEFA", "B"),
  country("Paraguay", "PAR", "CONMEBOL", "C"),
  country("Peru", "PER", "CONMEBOL", "C"),
  country("Poland", "POL", "UEFA", "B"),
  country("Portugal", "POR", "UEFA", "A"),
  country("Scotland", "SCO", "UEFA", "C"),
  country("Senegal", "SEN", "CAF", "B"),
  country("Serbia", "SRB", "UEFA", "B"),
  country("South Korea", "KOR", "AFC", "B"),
  country("Spain", "ESP", "UEFA", "A", "ESP"),
  country("Switzerland", "SUI", "UEFA", "B"),
  country("Türkiye", "TUR", "UEFA", "B"),
  country("Ukraine", "UKR", "UEFA", "B"),
  country("United States", "USA", "CONCACAF", "B"),
  country("Uruguay", "URU", "CONMEBOL", "B"),
  country("Wales", "WAL", "UEFA", "C"),
];

export const CONTINENTAL_TOURNAMENT = {
  UEFA: "European Championship",
  CONMEBOL: "Copa América",
  CONCACAF: "Gold Cup",
  CAF: "Africa Cup of Nations",
  AFC: "Asian Cup",
};

// callUp: OVR needed for a first call-up. Odds are per tournament played.
export const NATIONAL_TIERS = {
  A: { callUp: 80, worldCup: 0.12, continental: 0.22 },
  B: { callUp: 75, worldCup: 0.03, continental: 0.1 },
  C: { callUp: 70, worldCup: 0.006, continental: 0.06 },
};