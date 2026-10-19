// Squad roles and playing time.
//
// Your role at a club comes from comparing your OVR with the club's level
// (requiredOvr). Better than the level: key player. Around it: starter.
// A little below: rotation. Far below: bench (shown as "Prospect" while
// you're 21 or younger). Some events and transfer scenarios shift the role
// up or down for the coming seasons.

import { getClub } from "./clubInfo.js";
import { getOverall } from "./rating.js";
import { clamp } from "./random.js";

export const ROLES = {
  bench: { id: "bench", label: "Bench", apps: [5, 15], minutesPerApp: 38 },
  rotation: { id: "rotation", label: "Rotation", apps: [16, 27], minutesPerApp: 56 },
  starter: { id: "starter", label: "Starter", apps: [28, 38], minutesPerApp: 77 },
  key: { id: "key", label: "Key Player", apps: [36, 46], minutesPerApp: 84 },
};

export const ROLE_ORDER = ["bench", "rotation", "starter", "key"];

export const roleRank = (roleId) => ROLE_ORDER.indexOf(roleId);

export function baseRoleId(ovr, club) {
  const diff = ovr - club.requiredOvr;
  if (diff >= 4) return "key";
  if (diff >= -3) return "starter";
  if (diff >= -8) return "rotation";
  return "bench";
}

// The role you'd have at a club. A temporary role shift only applies at
// the club you're currently playing for.
export function roleFor(player, clubId = player.career.clubId, ovr = getOverall(player)) {
  const club = getClub(clubId);
  let rank = roleRank(baseRoleId(ovr, club));
  const shift = player.status.roleShift;
  if (shift && clubId === player.career.clubId) rank += shift.delta;
  return ROLES[ROLE_ORDER[clamp(rank, 0, ROLE_ORDER.length - 1)]];
}

export const roleLabel = (roleId, age) =>
  roleId === "bench" && age <= 21 ? "Prospect" : ROLES[roleId].label;

export function expectedMinutes(roleId) {
  const role = ROLES[roleId];
  const apps = (role.apps[0] + role.apps[1]) / 2;
  return Math.round((apps * role.minutesPerApp) / 10) * 10;
}

// What a club would mean for you, for offer cards: role and playing time.
export function rolePreview(player, clubId, ovr = getOverall(player)) {
  const role = roleFor(player, clubId, ovr);
  return { roleId: role.id, label: roleLabel(role.id, player.age), minutes: expectedMinutes(role.id) };
}