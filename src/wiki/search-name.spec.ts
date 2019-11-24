import { _getRedirectData, _getName, _parseData } from "./search-name"

describe("Search name", () => {
  describe("Response parsing", () => {
    it("Should get name from item data", () => {
      const data = FISHING_CONTEST_DATA
      const actual = _parseData(data)
      expect(actual).toBe("Fishing Contest")
    })

    it("Should get redirect name", () => {
      const data = "#REDIRECT [[Dragon Rider lance]]"
      const actual = _parseData(data)
      expect(actual).toBe("Dragon Rider lance")
    })
  })
  describe("Get redirect data", () => {
    it("Should get name from redirect data", () => {
      const actual = _getRedirectData("#REDIRECT [[Dragon Rider lance]]")
      expect(actual).toBe("Dragon Rider lance")
    })
  })

  describe("Get name", () => {
    it("Should get the name", () => {
      const data = FISHING_CONTEST_DATA
      const actual = _getName(data)
      expect(actual).toEqual("Fishing Contest")
    })

    it("Should get name 1 when there are multiple", () => {
      const data = `{{Variant|augmented=Augmented Dragon Rider lance}}
{{Infobox Item
|version1 = new|version2 = used|version3 = broken
|name1 = Dragon Rider lance|name2 = Dragon Rider lance|name3 = Dragon Rider lance (broken)
|image1 = [[File:Dragon Rider lance.png]]|image2 = [[File:Dragon Rider lance (used).png]]|image3 = [[File:Dragon Rider lance (broken).png]]
|release = [[29 March]] [[2016]]
|update = God Wars Dungeon 2
|members = Yes
|quest = No
|tradeable = Yes|tradeable2 = No
|stacksinbank = No
|equipable = Yes|equipable3 = No
|stackable = No
|noteable = Yes|noteable2 = No
|disassembly = Yes
|value = 180000
|destroy = Drop
|kept = reclaimable
|store = No
|exchange = gemw|exchange2 = No|exchange3 = No
|examine = A lance used by the legendary Dragon Rider Vindicta.
|weight = 2.721
|id1 = 37070|id2 = 37073|id3 = 37074
}}`
      const actual = _getName(data)
      expect(actual).toBe("Dragon Rider lance")
    })
  })
})

const FISHING_CONTEST_DATA = `{{External|os|rsc}}
{{Otheruses|def=no|the achievement|Fishing Contest (achievement)}}
{{Has quick guide}}
{{Infobox Quest
|name = Fishing Contest
|image = [[File:Fishing Contest.png|200px]]
|release = [[28 May]] [[2002]]
|update = Latest RuneScape News (28 May 2002)
|members = Yes
|voice = No
|series = None
|difficulty = Novice
|length = Short
|number = 26
|age = 5
|developer = [[Paul Gower]]
}}`
