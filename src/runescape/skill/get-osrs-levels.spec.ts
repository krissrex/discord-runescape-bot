import { csvRows, csvSkillRows } from "./get-osrs-levels"

describe("OSRS profile api", () => {
  describe("CSV parsing", () => {
    describe("Skills", () => {
      it("Should be 23 skills", () => {
        // 23 + overall
        expect(csvSkillRows).toHaveLength(23)
      })
    })

    for (const key of Object.keys(csvRows)) {
      const item = csvRows[key]
      it(`${item.name} should have matching key and index`, () => {
        expect(key).toBe(item.index.toString())
      })
    }

    it("Should allow accessing skills by index", () => {
      const item = csvRows[0]
      expect(item.name).toBe("Overall")
    })
  })
})
