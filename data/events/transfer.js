// Transfer-flavored events are "dynamic": instead of fixed text/choices,
// they build them at runtime based on which clubs are currently within
// the player's reach — gated by the player's actual OVR against each
// club's requiredOvr (see engine/rating.js + data/clubs.js), not an
// abstract accumulated currency.
//
// evt_transfer_window is special: it's the GUARANTEED event that fires
// every single season (see engine/turn.js) — its build() never returns
// null, even with zero real offers, so there's always something to look
// at. The other events here (fan backlash, competition for your spot,
// loan offers) are the occasional "something else happened too" layer.

import { computeOverall } from "../../engine/rating.js";

function pickEligibleClubs(player, clubs, count, margin = 0) {
  const currentClub = player.career.currentClub;
  const ovr = computeOverall(player);
  const eligible = clubs.filter(
    (c) => c.id !== currentClub && c.requiredOvr <= ovr + margin
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

function loanChoice(target, parentClubId, loanSeasons, returnAge) {
  return {
    id: `loan_${target.id}`,
    label: `Join ${target.name} on loan`,
    subtext: `${target.league} · ${target.country} · ${loanSeasons}-season loan`,
    crest: crestInitials(target.name),
    effects: {
      "career.parentClub": parentClubId,
      "career.currentClub": target.id,
      "career.loanReturnAge": returnAge,
      "push:career.loanHistory": target.id,
      "condition.morale": 6,
    },
    resultText: `You joined ${target.name} on a ${loanSeasons}-season loan for more first-team football.`,
  };
}

export default [
  // The guaranteed, always-present transfer window. Always returns a real
  // eventView — if no club is within reach yet, the only choice is to
  // continue building your reputation at your current club.
  {
    id: "evt_transfer_window",
    category: "transfer",
    minAge: 17,
    maxAge: 36,
    weight: 0, // not used by weightedRandomPick — this event is hand-picked every season
    conditions: {},
    dynamic: true,
    build(player, clubs) {
      if (player.career.parentClub) {
        // Out on loan: no permanent moves until the loan spell ends.
        const parent = clubs.find((c) => c.id === player.career.parentClub);
        return {
          text: `You're out on loan. ${parent ? parent.name : "Your parent club"} will decide your future once the spell ends.`,
          choices: [
            stayChoice(
              "Continue the loan spell",
              {},
              "You continued to focus on your loan spell."
            ),
          ],
        };
      }

      const currentClub = player.career.currentClub;
      const currentClubName = clubs.find((c) => c.id === currentClub)?.name ?? "your club";
      const targets = pickEligibleClubs(player, clubs, 2);

      const choices = targets.map((target) =>
        clubChoice(
          target,
          {
            "push:career.clubHistory": currentClub,
            "career.currentClub": target.id,
            "reputation.fanFame": 5,
            "condition.morale": 10,
          },
          `You signed for ${target.name}.`
        )
      );

      choices.push(
        stayChoice(
          targets.length > 0 ? "Stay at your current club" : `Continue at ${currentClubName}`,
          { "reputation.fanFame": 3, "condition.morale": 3 },
          targets.length > 0
            ? "You chose to stay and fight for your place."
            : "No offers came in this window — you keep building your reputation."
        )
      );

      return {
        text:
          targets.length > 0
            ? "Offers arrived this transfer window. You can accept one or stay at your club."
            : "The transfer window comes and goes with no concrete offers yet.",
        choices,
      };
    },
  },

  {
    id: "evt_fan_backlash",
    category: "transfer",
    minAge: 20,
    maxAge: 34,
    weight: 6,
    conditions: {},
    dynamic: true,
    build(player, clubs) {
      if (player.career.parentClub) return null; // can't leave the parent club while out on loan
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
    category: "transfer",
    minAge: 18,
    maxAge: 32,
    weight: 6,
    conditions: {},
    dynamic: true,
    build(player, clubs) {
      if (player.career.parentClub) return null; // can't leave the parent club while out on loan
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
              effects: { "stats.mental": 3, "condition.morale": 5 },
              resultText: "You won the battle for a starting role.",
            },
            {
              probability: 0.5,
              label: "Low rotation",
              positive: false,
              effects: { "condition.morale": -8, "condition.fitness": -4 },
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

  {
    id: "evt_loan_offer",
    category: "transfer",
    minAge: 18,
    maxAge: 30,
    weight: 8,
    conditions: {},
    dynamic: true,
    build(player, clubs) {
      if (player.career.parentClub) return null; // already out on loan

      const currentClubName =
        clubs.find((c) => c.id === player.career.currentClub)?.name ?? "your club";
      // Loans are easier to arrange than permanent moves, so we search with
      // a generous OVR margin.
      const targets = pickEligibleClubs(player, clubs, 1, 8);
      if (targets.length === 0) return null;

      const target = targets[0];
      const loanSeasons = 2;

      return {
        text: `${target.name} want to take you on loan for ${loanSeasons} seasons to get regular first-team football.`,
        choices: [
          loanChoice(target, player.career.currentClub, loanSeasons, player.age + loanSeasons),
          stayChoice(
            `Stay and fight for minutes at ${currentClubName}`,
            { "condition.morale": 4 },
            "You chose to stay and fight for your place instead."
          ),
        ],
      };
    },
  },
];