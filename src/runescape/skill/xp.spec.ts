import {
  levelFromXp,
  SKILL_COUNT,
  MAX_SKILL_XP,
  MAX_TOTAL_XP,
  MAX_TOTAL_LEVEL,
} from "./xp"
import { skills } from "./skill-from-id"

describe("XP constants", () => {
  it("Should be as many skills as in the list of skills", () => {
    const registeredSkillCount = skills.filter(skill => skill.name != "Overall")
      .length
    expect(SKILL_COUNT).toBe(registeredSkillCount)
  })

  it("Should be 200m in every skill for max xp", () => {
    expect(MAX_TOTAL_XP).toBe(SKILL_COUNT * MAX_SKILL_XP)
  })

  it("Should be total level using 120 for those that have it", () => {
    const totalLevel = skills
      .filter(skill => skill.name != "Overall")
      .map(skill => skill.maxLevel || 99)
      .reduce((sum, level) => sum + level)

    expect(MAX_TOTAL_LEVEL).toBe(totalLevel)
  })
})

describe("Level from xp", () => {
  it("Returns level 1 for 0 xp", () => {
    const level = levelFromXp(0)
    expect(level).toBe(1)
  })

  it("Returns level 10 for 1200 xp", () => {
    const level = levelFromXp(1200)
    expect(level).toBe(10)
  })

  it("Returns level 99 for 13034441 xp", () => {
    const level = levelFromXp(13034441)
    expect(level).toBe(99)
  })

  it("Returns level 120 for 200m xp", () => {
    const level = levelFromXp(200_000_000)
    expect(level).toBe(120)
  })

  describe("Master skill", () => {
    it("Returns level 99 for 36073512 xp", () => {
      const level = levelFromXp(36073512, "master")
      expect(level).toBe(99)
    })

    it("Returns 120 for 200m", () => {
      const level = levelFromXp(200_000_000, "master")
      expect(level).toBe(120)
    })
  })
})
