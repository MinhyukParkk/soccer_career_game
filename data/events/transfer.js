export default [
  {
    id: "evt_transfer_offer",
    type: "random",
    category: "transfer",
    minAge: 19,
    maxAge: 33,
    weight: 8,
    conditions: { minReputationScoutInterest: 20 },
    text: "A bigger club has made an offer for you. Do you accept the move?",
    choices: [
      {
        id: "accept",
        label: "Accept the transfer",
        effects: {
          "reputation.marketValue": 15,
          "reputation.fanFame": 5,
          "condition.morale": 10,
        },
        resultText: "You joined a new club with higher expectations.",
      },
      {
        id: "stay",
        label: "Stay loyal to your current club",
        effects: { "reputation.fanFame": 8, "condition.morale": 5 },
        resultText: "The fans love your loyalty.",
      },
    ],
  },
];