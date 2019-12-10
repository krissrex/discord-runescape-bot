import { getGePrice, parseData } from "./ge-price"

describe("GE price", () => {
  describe("Result parser", () => {
    it("Should get data for item", async () => {
      const data = `return {
    itemId     = 4151,
    price      = 71117,
    last       = 71127,
    date       = '24 November 2019 00:00:00 (UTC)',
    lastDate   = '23 November 2019 00:00:00 (UTC)',
    item       = 'Abyssal whip',
    value      = 120001,
    limit      = 10,
    members    = true,
    category   = 'Melee weapons - high level',
    examine    = 'A weapon from the Abyss.',
    usage      = {
        'Grand Exchange Market Watch/Common Trade Index',
       'Grand Exchange Market Watch/Melee weapons',
       'Grand Exchange Market Watch/Slayer'
    }
}`
      const actual = parseData(data)
      expect(actual.itemId).toBe(4151)
      expect(actual.itemName).toBe("Abyssal whip")
      expect(actual.membersItem).toBe(true)
      expect(actual.price).toBe(71117)
      expect(actual.tradeLimit).toBe(10)
      expect(actual.value).toBe(120001)
    })

    it("Should get data for Tombshroom", () => {
      const data = `return {
  itemId     = 48711,
  price      = 2339,
  last       = 2339,
  date       = '10 December 2019 00:00:00 (UTC)',
  lastDate   = '09 December 2019 00:00:00 (UTC)',
  icon       = "Tombshroom.png",
  item       = "Tombshroom",
  alchable   = true,
  value      = 38,
  limit      = 10000,
  members    = true,
  category   = 'Herblore materials',
  examine    = "A tombshroom mushroom.",
  usage      = {}
}`

      const actual = parseData(data)

      expect(actual.itemName).toBe("Tombshroom")
    })
  })
})
