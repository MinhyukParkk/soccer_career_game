// At career start, the player hasn't built any reputation yet, so they
// can't qualify for clubs via the normal reputationRequired gate. Instead,
// we offer a random handful of clubs from the lowest tier available (i.e.
// the biggest tier number) — this is the "academy intake" moment.
export function getAcademyOffers(clubs, count = 3) {
  const lowestTier = Math.max(...clubs.map((c) => c.tier));
  const pool = clubs.filter((c) => c.tier === lowestTier);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}