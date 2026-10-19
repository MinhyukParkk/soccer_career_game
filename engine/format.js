// Display helpers shared by the web UI and the CLI.

export function formatValue(millions) {
  if (!millions || millions <= 0) return "Free";
  if (millions < 1) return `€${Math.max(5, Math.round((millions * 1000) / 5) * 5)}K`;
  if (millions < 10) return `€${millions.toFixed(1).replace(/\.0$/, "")}M`;
  return `€${Math.round(millions)}M`;
}

export const seasonLabel = (startYear) => `${startYear}/${String((startYear + 1) % 100).padStart(2, "0")}`;

export const formatNumber = (n) => Math.round(n).toLocaleString("en-US");

export function ordinal(n) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  return `${n}${{ 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th"}`;
}

export const signed = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0");

export const plural = (n, word, many = `${word}s`) => `${n} ${n === 1 ? word : many}`;