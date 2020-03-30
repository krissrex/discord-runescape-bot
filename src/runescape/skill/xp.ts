import { Skill } from "./skill-from-id"
import logging from "../../logging"
import { LEVELS, MASTER_LEVELS, getSkillCurve } from "./skill-curves"

const log = logging("xp")

export const SKILL_COUNT = 28
export const MAX_VIRTUAL_LEVEL = 120
export const MAX_SKILL_XP = 200_000_000
export const MAX_TOTAL_XP = MAX_SKILL_XP * SKILL_COUNT
export const MAX_COMBAT_LEVEL = 138
export const MAX_TOTAL_LEVEL = 2898
export const TOTAL_XP_AT_ALL_99 =
  SKILL_COUNT * (LEVELS.get(99) || 0) + (MASTER_LEVELS.get(99) || 0)

export const SKILL_COUNT_OSRS = 23
export const TOTAL_OSRS_XP_AT_ALL_99 = SKILL_COUNT_OSRS * 13_034_431

export function levelFromXp(
  xp: number,
  skillCurve: undefined | "master" = undefined
): number {
  if (xp < 0) {
    throw new Error("Invalid xp: " + xp)
  }

  const curve = getSkillCurve(skillCurve)

  const maxLevel = Math.min(curve.size, MAX_VIRTUAL_LEVEL)
  for (let level = 2; level < maxLevel; level++) {
    const xpThreshold = curve.get(level) || 0
    if (xp < xpThreshold && xp >= (curve.get(level - 1) || 0)) {
      return level - 1
    }
  }

  return maxLevel
}

export function xpUntil99(skill: Skill, xp: number) {
  const curve = getSkillCurve(skill.skillCurve)
  const xpAt99 = curve.get(99) || -1
  if (xpAt99 === -1) {
    log.error({ skill, xp }, "Failed to find xp curve")
    throw new Error("Failed to find xp curve for skill " + skill.id)
  }
  let remaining = xpAt99 - xp
  if (remaining < 0) {
    remaining = 0
  }
  return {
    skillId: skill.id,
    remaining,
    current: xp,
    max: xpAt99,
  }
}
