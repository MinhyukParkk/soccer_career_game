// Tier 1 and Tier 2 clubs were only ever different in "how good do I need
// to be to sign here" (requiredOvr) — nothing made them feel different
// once you were actually there. This is what does: every season, the
// player's current club has a real shot at a trophy, and how big that
// shot is depends entirely on how big the club is. A giant like Real
// Madrid winning a title most years feels very different from a second
// division side occasionally getting promoted, even for the same player.

function trophyProfileFor(club) {
  if (!club) return null;
  if (club.requiredOvr >= 85) {
    return { chance: 0.3, label: `${club.league} Champions` };
  }
  if (club.tier === 1) {
    return { chance: 0.1, label: `${club.league} Cup` };
  }
  return { chance: 0.03, label: `${club.league} Promotion` };
}

function addTrophy(player, label) {
  const titles = player.careerLog.collectiveTitles;
  const existingIndex = titles.findIndex((t) => t.startsWith(label + " x"));
  if (existingIndex === -1) {
    titles.push(`${label} x1`);
  } else {
    const count = parseInt(titles[existingIndex].split(" x")[1], 10) + 1;
    titles[existingIndex] = `${label} x${count}`;
  }
}

// Rolls this season's trophy chance for whichever club the player is
// currently at. Returns { label, resultText } if something was won (label
// is the clean trophy name, e.g. "La Liga Champions", for the UI to show
// directly), or null otherwise (most seasons, for most clubs, win nothing
// — that's the point: it should feel rare unless you're at a genuine giant).
export function rollSeasonTrophy(player, clubs) {
  const club = clubs.find((c) => c.id === player.career.currentClub);
  const profile = trophyProfileFor(club);
  if (!profile) return null;

  if (Math.random() < profile.chance) {
    addTrophy(player, profile.label);
    return { label: profile.label, resultText: `${club.name} won the ${profile.label}!` };
  }
  return null;
}