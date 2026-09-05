// Transfer is a "dynamic" event: instead of fixed text/choices, it builds
// them at runtime based on which clubs are currently within the player's
// reach (reputationRequired <= player.reputation.marketValue).
export default [
  {
    id: "evt_transfer_offer",
    type: "random",
    category: "transfer",
    minAge: 19,
    maxAge: 33,
    weight: 8,
    conditions: {},
    dynamic: true,
    build(player, clubs) {
      const currentClub = player.career.currentClub;
      const eligibleClubs = clubs.filter(
        (c) =>
          c.id !== currentClub &&
          c.reputationRequired <= player.reputation.marketValue
      );
      if (eligibleClubs.length === 0) return null; // no offers within reach yet

      const target =
        eligibleClubs[Math.floor(Math.random() * eligibleClubs.length)];

      return {
        text: `${target.name} (Tier ${target.tier}, ${target.country}) have made an offer for you. Do you accept the move?`,
        choices: [
          {
            id: "accept",
            label: `Sign for ${target.name}`,
            effects: {
              "push:career.clubHistory": currentClub,
              "career.currentClub": target.id,
              "reputation.marketValue": 8,
              "reputation.fanFame": 5,
              "condition.morale": 10,
            },
            resultText: `You signed for ${target.name}.`,
          },
          {
            id: "stay",
            label: "Stay and fight for your place",
            effects: { "reputation.fanFame": 8, "condition.morale": 5 },
            resultText: "The fans love your loyalty.",
          },
        ],
      };
    },
  },
];