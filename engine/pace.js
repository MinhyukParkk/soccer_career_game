// Career pace = how many seasons are played between decisions.
// Every decision point opens a transfer window, so Intense gives you a
// window every season, Normal every two, Express every three.
// eventChance is the chance of an extra event after each window. It is
// lower when windows are frequent, so every pace sees a similar number of
// events over a whole career.

export const PACES = {
  intense: { id: "intense", label: "Intense", seasons: 1, eventChance: 0.25, blurb: "A decision every season" },
  normal: { id: "normal", label: "Normal", seasons: 2, eventChance: 0.5, blurb: "A decision every 2 seasons" },
  express: { id: "express", label: "Express", seasons: 3, eventChance: 0.65, blurb: "A decision every 3 seasons" },
};

export const PACE_ORDER = ["intense", "normal", "express"];
export const DEFAULT_PACE = "normal";

export const getPace = (id) => PACES[id] ?? PACES[DEFAULT_PACE];