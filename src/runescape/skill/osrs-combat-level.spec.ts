import { calculateOsrsCombatLevel } from "./osrs-combat-level"

describe("OSRS combat level calculator", () => {
  it("Should return level 3 for low level player", () => {
    const actual = calculateOsrsCombatLevel({
      attack: 1,
      strength: 1,
      defence: 1,
      hitpoints: 10,
      magic: 1,
      prayer: 1,
      ranged: 1,
    })

    expect(actual).toBe(3)
  })

  it("Should return max combat for maxed player", () => {
    const actual = calculateOsrsCombatLevel({
      attack: 99,
      strength: 99,
      defence: 99,
      hitpoints: 99,
      magic: 99,
      prayer: 99,
      ranged: 99,
    })

    expect(actual).toBe(126)
  })

  describe("A pure player", () => {
    it("Should return 51 for mage pure", () => {
      const actual = calculateOsrsCombatLevel({
        attack: 1,
        strength: 1,
        defence: 1,
        hitpoints: 10,
        magic: 99,
        prayer: 1,
        ranged: 1,
      })

      expect(actual).toBe(51)
    })

    it("Should return 15 for prayer pure", () => {
      const actual = calculateOsrsCombatLevel({
        attack: 1,
        strength: 1,
        defence: 1,
        hitpoints: 10,
        magic: 1,
        prayer: 99,
        ranged: 1,
      })

      expect(actual).toBe(15)
    })

    it("Should return 35 for strength pure", () => {
      const actual = calculateOsrsCombatLevel({
        attack: 1,
        strength: 99,
        defence: 1,
        hitpoints: 10,
        magic: 1,
        prayer: 1,
        ranged: 1,
      })

      expect(actual).toBe(35)
    })
  })
})
