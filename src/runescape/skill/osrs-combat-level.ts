export interface CombatLevelSkills {
  attack: number
  strength: number
  ranged: number
  magic: number
  defence: number
  hitpoints: number
  prayer: number
}

export function calculateOsrsCombatLevel(levels: CombatLevelSkills): number {
  return Math.floor(
    ((13 / 10) *
      Math.max(
        levels.attack + levels.strength,
        (3 * levels.magic) / 2,
        (3 * levels.ranged) / 2
      ) +
      levels.defence +
      levels.hitpoints +
      Math.floor(levels.prayer / 2)) /
      4
  )
}
