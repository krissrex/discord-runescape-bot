import Axios, { AxiosResponse } from "axios"
import logging from "../../logging"
import {
  calculateOsrsCombatLevel,
  CombatLevelSkills,
} from "../skill/osrs-combat-level"
import { levels } from "pino"
import { skillIdFromString } from "./skill-from-id"

const log = logging("get-osrs-profile")

/**
 * Get the levels for a player in Old School Runescape.
 * @param username osrs username
 */
export async function getOsrsLevels(username: string): Promise<OsrsProfile> {
  const url = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws"

  const response: AxiosResponse<string> = await Axios.get(url, {
    params: {
      player: username,
    },
  })

  if (response.data && response.status != 404) {
    const skills = parseApiCsv(response.data)
    const overallId = 0
    const totalXp = skills.find(skill => skill.id == overallId)?.xp

    const profile: OsrsProfile = {
      name: username,
      skillvalues: skills,
      totalxp: totalXp || 0,
      combatlevel: calculateOsrsCombatLevel(combatLevels(skills)),
    }

    return profile
  } else {
    return {
      error: "NO_PROFILE",
      totalxp: 0,
      name: "",
      combatlevel: 0,
      skillvalues: [],
    }
  }
}

export interface OsrsProfile {
  error?: "NO_PROFILE"
  totalxp: number
  skillvalues: OsrsSkill[]
  name: string
  combatlevel: number
}

export interface OsrsSkill {
  level: number
  xp: number
  rank: number
  id: number
}

function level(skillId: number, skills: OsrsSkill[]): number {
  return skills.find(skill => skill.id == skillId)?.level || 1
}

/**
 * Find the levels relevant for combat level calculation.
 * @param skills All the player's skills
 */
function combatLevels(skills: OsrsSkill[]): CombatLevelSkills {
  // FIXME: A bit ugly, should use a lookup from name instead of id.
  const combatSkills: CombatLevelSkills = {
    attack: level(1, skills),
    strength: level(3, skills),
    defence: level(2, skills),
    hitpoints: level(4, skills),
    magic: level(7, skills),
    prayer: level(6, skills),
    ranged: level(5, skills),
  }

  return combatSkills
}

/**
 * Parse the comma separated data from the jagex OSRS api,
 * and return a more usable data structure.
 * @param csv the raw csv data
 * @returns the player skills
 */
function parseApiCsv(csv: string): OsrsSkill[] {
  const rows = csv
    .split("\n")
    .map((row, index) => {
      const rowType = csvRows[index]
      if (!rowType) {
        log.error("Failed to find rowType for row: [%s] = %s", index, row)
      }
      return {
        rowType: rowType,
        value: row,
      }
    })
    .filter(row => row?.rowType) as { rowType: CsvRow; value: string }[]

  const skillRows = rows.filter(row => row.rowType.type == "SKILL")
  const parsedSkills = skillRows
    .map(row => {
      const columns = row.value.split(",")
      if (columns.length != 3) {
        log.warn(
          "Invalid row (%s, %s): %s",
          row.rowType.name,
          row.rowType.index,
          row.value
        )
        return null
      }

      const skill: OsrsSkill = {
        id: skillIdFromString(row.rowType.name),
        rank: parseInt(columns[0], 10),
        level: parseInt(columns[1], 10),
        xp: parseInt(columns[2], 10),
      }
      return skill
    })
    .filter(row => row != null) as OsrsSkill[]

  return parsedSkills
}

interface CsvRow {
  /** The name of the skill or activity */
  name: string
  /** The index in the csv this row can be found at */
  index: number
  /** The type of value in this row */
  type: "SKILL" | "ACTIVITY" | "SUM"
}

// Generate with: [...document.getElementById("contentCategory").children].map(c => c.innerText).filter(text => text != "----").map((t, index) => `"${index}": { index: ${index}, type: "ACTIVITY", name: "${t}"},`).join("\n")
// at https://secure.runescape.com/m=hiscore_oldschool/a=13/overall
export const csvRows: Record<string, CsvRow> = {
  "0": { index: 0, type: "SUM", name: "Overall" },
  "1": { index: 1, type: "SKILL", name: "Attack" },
  "2": { index: 2, type: "SKILL", name: "Defence" },
  "3": { index: 3, type: "SKILL", name: "Strength" },
  "4": { index: 4, type: "SKILL", name: "Hitpoints" },
  "5": { index: 5, type: "SKILL", name: "Ranged" },
  "6": { index: 6, type: "SKILL", name: "Prayer" },
  "7": { index: 7, type: "SKILL", name: "Magic" },
  "8": { index: 8, type: "SKILL", name: "Cooking" },
  "9": { index: 9, type: "SKILL", name: "Woodcutting" },
  "10": { index: 10, type: "SKILL", name: "Fletching" },
  "11": { index: 11, type: "SKILL", name: "Fishing" },
  "12": { index: 12, type: "SKILL", name: "Firemaking" },
  "13": { index: 13, type: "SKILL", name: "Crafting" },
  "14": { index: 14, type: "SKILL", name: "Smithing" },
  "15": { index: 15, type: "SKILL", name: "Mining" },
  "16": { index: 16, type: "SKILL", name: "Herblore" },
  "17": { index: 17, type: "SKILL", name: "Agility" },
  "18": { index: 18, type: "SKILL", name: "Thieving" },
  "19": { index: 19, type: "SKILL", name: "Slayer" },
  "20": { index: 20, type: "SKILL", name: "Farming" },
  "21": { index: 21, type: "SKILL", name: "Runecraft" },
  "22": { index: 22, type: "SKILL", name: "Hunter" },
  "23": { index: 23, type: "SKILL", name: "Construction" },
  "24": { index: 24, type: "ACTIVITY", name: "Bounty Hunter - Hunter" },
  "25": { index: 25, type: "ACTIVITY", name: "Bounty Hunter - Rogue" },
  "26": { index: 26, type: "ACTIVITY", name: "Clue Scrolls (all)" },
  "27": { index: 27, type: "ACTIVITY", name: "Clue Scrolls (beginner)" },
  "28": { index: 28, type: "ACTIVITY", name: "Clue Scrolls (easy)" },
  "29": { index: 29, type: "ACTIVITY", name: "Clue Scrolls (medium)" },
  "30": { index: 30, type: "ACTIVITY", name: "Clue Scrolls (hard)" },
  "31": { index: 31, type: "ACTIVITY", name: "Clue Scrolls (elite)" },
  "32": { index: 32, type: "ACTIVITY", name: "Clue Scrolls (master)" },
  "33": { index: 33, type: "ACTIVITY", name: "LMS - Rank" },
  "34": { index: 34, type: "ACTIVITY", name: "Abyssal Sire" },
  "35": { index: 35, type: "ACTIVITY", name: "Alchemical Hydra" },
  "36": { index: 36, type: "ACTIVITY", name: "Barrows Chests" },
  "37": { index: 37, type: "ACTIVITY", name: "Bryophyta" },
  "38": { index: 38, type: "ACTIVITY", name: "Callisto" },
  "39": { index: 39, type: "ACTIVITY", name: "Cerberus" },
  "40": { index: 40, type: "ACTIVITY", name: "Chambers of Xeric" },
  "41": {
    index: 41,
    type: "ACTIVITY",
    name: "Chambers of Xeric: Challenge Mode",
  },
  "42": { index: 42, type: "ACTIVITY", name: "Chaos Elemental" },
  "43": { index: 43, type: "ACTIVITY", name: "Chaos Fanatic" },
  "44": { index: 44, type: "ACTIVITY", name: "Commander Zilyana" },
  "45": { index: 45, type: "ACTIVITY", name: "Corporeal Beast" },
  "46": { index: 46, type: "ACTIVITY", name: "Crazy Archaeologist" },
  "47": { index: 47, type: "ACTIVITY", name: "Dagannoth Prime" },
  "48": { index: 48, type: "ACTIVITY", name: "Dagannoth Rex" },
  "49": { index: 49, type: "ACTIVITY", name: "Dagannoth Supreme" },
  "50": { index: 50, type: "ACTIVITY", name: "Deranged Archaeologist" },
  "51": { index: 51, type: "ACTIVITY", name: "General Graardor" },
  "52": { index: 52, type: "ACTIVITY", name: "Giant Mole" },
  "53": { index: 53, type: "ACTIVITY", name: "Grotesque Guardians" },
  "54": { index: 54, type: "ACTIVITY", name: "Hespori" },
  "55": { index: 55, type: "ACTIVITY", name: "Kalphite Queen" },
  "56": { index: 56, type: "ACTIVITY", name: "King Black Dragon" },
  "57": { index: 57, type: "ACTIVITY", name: "Kraken" },
  "58": { index: 58, type: "ACTIVITY", name: "Kree'Arra" },
  "59": { index: 59, type: "ACTIVITY", name: "K'ril Tsutsaroth" },
  "60": { index: 60, type: "ACTIVITY", name: "Mimic" },
  "61": { index: 61, type: "ACTIVITY", name: "Nightmare" },
  "62": { index: 62, type: "ACTIVITY", name: "Obor" },
  "63": { index: 63, type: "ACTIVITY", name: "Sarachnis" },
  "64": { index: 64, type: "ACTIVITY", name: "Scorpia" },
  "65": { index: 65, type: "ACTIVITY", name: "Skotizo" },
  "66": { index: 66, type: "ACTIVITY", name: "The Gauntlet" },
  "67": { index: 67, type: "ACTIVITY", name: "The Corrupted Gauntlet" },
  "68": { index: 68, type: "ACTIVITY", name: "Theatre of Blood" },
  "69": { index: 69, type: "ACTIVITY", name: "Thermonuclear Smoke Devil" },
  "70": { index: 70, type: "ACTIVITY", name: "TzKal-Zuk" },
  "71": { index: 71, type: "ACTIVITY", name: "TzTok-Jad" },
  "72": { index: 72, type: "ACTIVITY", name: "Venenatis" },
  "73": { index: 73, type: "ACTIVITY", name: "Vet'ion" },
  "74": { index: 74, type: "ACTIVITY", name: "Vorkath" },
  "75": { index: 75, type: "ACTIVITY", name: "Wintertodt" },
  "76": { index: 76, type: "ACTIVITY", name: "Zalcano" },
  "77": { index: 77, type: "ACTIVITY", name: "Zulrah" },
}

export const csvSkillRows = Object.keys(csvRows).filter(
  (key: string) => csvRows[parseInt(key)].type == "SKILL"
)
