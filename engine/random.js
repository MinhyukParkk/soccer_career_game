// Small randomness helpers shared by the whole engine.

export const rand = (min, max) => min + Math.random() * (max - min);

export const randInt = (min, max) => Math.floor(rand(min, max + 1));

export const chance = (p) => Math.random() < p;

export const clamp = (value, lo, hi) => Math.min(hi, Math.max(lo, value));

export const pick = (list) => list[Math.floor(Math.random() * list.length)];

// Picks one item, where each item's odds are proportional to its weight.
export function weightedPick(list, weightOf = (item) => item.weight ?? 1) {
  const total = list.reduce((sum, item) => sum + Math.max(0, weightOf(item)), 0);
  if (total <= 0) return list.length ? pick(list) : null;
  let roll = Math.random() * total;
  for (const item of list) {
    roll -= Math.max(0, weightOf(item));
    if (roll <= 0) return item;
  }
  return list[list.length - 1];
}

// Rounds 2.3 up to 3 thirty percent of the time, down to 2 otherwise, so
// fractional expectations (goals, growth) average out correctly over time.
export function stochasticRound(value) {
  const floor = Math.floor(value);
  return floor + (Math.random() < value - floor ? 1 : 0);
}

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}