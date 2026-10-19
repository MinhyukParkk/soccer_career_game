// Club lookups.

import CLUBS from "../data/clubs.js";

const BY_ID = new Map(CLUBS.map((club) => [club.id, club]));

export const getClub = (id) => BY_ID.get(id) ?? null;

export const allClubs = () => CLUBS;

// 0.5 to 5 stars from the club's level, in half steps.
export function clubStars(club) {
  if (!club) return 0;
  const raw = (club.requiredOvr - 45) / 9;
  return Math.min(5, Math.max(0.5, Math.round(raw * 2) / 2));
}