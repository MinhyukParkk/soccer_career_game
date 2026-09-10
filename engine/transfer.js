// Transfer-flavored events are "dynamic": instead of fixed text/choices,
// they build them at runtime based on which clubs are currently within the
// player's reach (reputationRequired <= player.reputation.marketValue).
// Several narrative wrappers (plain transfer window, fan backlash, losing
// your spot to a rival) all reuse the same club-picking logic below.

function pickEligibleClubs(player, clubs, count) {
  const currentClub = player.career.currentClub;
  const eligible = clubs.filter(
    (c) => c.id !== currentClub && c.reputationRequired <= player.reputation.marketValue
  );
  // Shuffle then take `count`, so repeated offers don't always show the
  // same clubs in the same order.
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function crestInitials(name) {
  return name
    .split(/[\s-]+/)
    .filter((w) => w.length > 0)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function clubChoice(target, effects, resultText) {
  return {
    id: `sign_${target.id}`,
    label: `Sign for ${target.name}`,
    subtext: `${target.league} · ${target.country}`,
    crest: crestInitials(target.name),
    effects,
    resultText,
  };
}

function stayChoice(label, effects, resultText) {
  return { id: "stay", label, effects, resultText };
}

export default [
  {
    id: "evt_transfer_window",
    type: "random",
    category: "transfer",
    minAge: 19,
    maxAge: 33,
    weight: 14,
    conditions: {},
    dynamic: true,
    build(player, clubs) {
      const currentClub = player.career.currentClub;
      const targets = pickEligibleClubs(player, clubs, 2);
      if (targets.length === 0) return null;

      const choices = targets.map((target) =>
        clubChoice(
          target,
          {
            "push:career.clubHistory": currentClub,
            "career.currentClub": target.id,
            "reputation.marketValue": 8,
            "reputation.fanFame": 5,
            "condition.morale": 10,
          },
          `You signed for ${target.name}.`
        )
      );
      choices.push(
        stayChoice(
          "Stay at your current club",
          { "reputation.fanFame": 8, "condition.morale": 5 },
          "You chose to stay and fight for your place."
        )
      );

      return {
        text: "Offers arrived after your latest stretch. You can accept one or stay at your club.",
        choices,
      };
    },
  },

  {
    id: "evt_fan_backlash",
    type: "random",
    category: "transfer",
    minAge: 20,
    maxAge: 34,
    weight: 6,
    conditions: { minReputationFanFame: 0 },
    dynamic: true,
    build(player, clubs) {
      const currentClub = player.career.currentClub;
      const targets = pickEligibleClubs(player, clubs, 1);
      const currentClubName = clubs.find((c) => c.id === currentClub)?.name ?? currentClub;

      const choices = [
        stayChoice(
          `Stay and fight at ${currentClubName}`,
          { "condition.morale": -6, "stats.mental": 2 },
          "You stayed and fought through the criticism.",
        ),
      ];
      if (targets.length > 0) {
        const target = targets[0];
        choices.push(
          clubChoice(
            target,
            {
              "push:career.clubHistory": currentClub,
              "career.currentClub": target.id,
              "condition.morale": 8,
            },
            `You left for a fresh start at ${target.name}.`
          )
        );
      }

      return {
        text: "The fans are angry about your performances and start questioning your place in the team.",
        choices,
      };
    },
  },

  {
    id: "evt_competition_for_spot",
    type: "random",
    category: "transfer",
    minAge: 18,
    maxAge: 32,
    weight: 6,
    conditions: {},
    dynamic: true,
    build(player, clubs) {
      const currentClub = player.career.currentClub;
      const targets = pickEligibleClubs(player, clubs, 1);

      const choices = [
        {
          id: "compete",
          label: "Compete for your place",
          outcomes: [
            {
              probability: 0.5,
              label: "Starter",
              positive: true,
              effects: { "reputation.marketValue": 3, "condition.morale": 5 },
              resultText: "You won the battle for a starting role.",
            },
            {
              probability: 0.5,
              label: "Low rotation",
              positive: false,
              effects: { "condition.morale": -8, "reputation.fanFame": -2 },
              resultText: "You lost the battle and slipped into a rotation role.",
            },
          ],
        },
      ];
      if (targets.length > 0) {
        const target = targets[0];
        choices.push(
          clubChoice(
            target,
            {
              "push:career.clubHistory": currentClub,
              "career.currentClub": target.id,
              "condition.morale": 6,
            },
            `You moved on to ${target.name} for a clearer path to the team.`
          )
        );
      }

      return {
        text: "The club signs another player to compete for your place.",
        choices,
      };
    },
  },
];