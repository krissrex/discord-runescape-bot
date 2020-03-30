import { fuzzySkillName } from "./fuzzy-skill-name"

export interface Skill {
  id: number
  name: SkillName
  color: string
  maxLevel?: number
  skillCurve?: "master"
}

const skills: Skill[] = [
  { id: -1, name: "Overall", color: "#e1bb34" },
  { id: 0, name: "Attack", color: "#981414" },
  { id: 1, name: "Defence", color: "#147e98" },
  { id: 2, name: "Strength", color: "#13b787" },
  { id: 3, name: "Constitution", color: "#aaceda" },
  { id: 4, name: "Ranged", color: "#13b751" },
  { id: 5, name: "Prayer", color: "#6dbff2" },
  { id: 6, name: "Magic", color: "#c3e3dc" },
  { id: 7, name: "Cooking", color: "#553285" },
  { id: 8, name: "Woodcutting", color: "#7e4f35" },
  { id: 9, name: "Fletching", color: "#149893" },
  { id: 10, name: "Fishing", color: "#3e70b9" },
  { id: 11, name: "Firemaking", color: "#f75f28" },
  { id: 12, name: "Crafting", color: "#b6952c" },
  { id: 13, name: "Smithing", color: "#65887e" },
  { id: 14, name: "Mining", color: "#56495e" },
  { id: 15, name: "Herblore", color: "#12453a" },
  { id: 16, name: "Agility", color: "#284A95" },
  { id: 17, name: "Thieving", color: "#36175e" },
  { id: 18, name: "Slayer", color: "#48412f" },
  { id: 19, name: "Farming", color: "#1f7d54" },
  { id: 20, name: "Runecrafting", color: "#d7eba3" },
  { id: 21, name: "Hunter", color: "#c38b4e" },
  { id: 22, name: "Construction", color: "#a8babc" },
  { id: 23, name: "Summoning", color: "#dea1b0" },
  { id: 24, name: "Dungeoneering", color: "#723920", maxLevel: 120 },
  { id: 25, name: "Divination", color: "#943fba" },
  { id: 26, name: "Invention", color: "#f7b528", skillCurve: "master" },
  { id: 27, name: "Archaeology", color: "#b9571e", maxLevel: 120 },
]

export function skillFromId(id: number): Skill {
  const skill = skills.find(skill => skill.id === id)
  if (!skill) {
    throw new Error("No skill found for id " + id)
  }
  return skill
}

/**
 *
 * @param name skill name search string
 * @throws Error if skill id not found
 */
export function skillIdFromString(name: string): number {
  name = name.trim().toLowerCase()
  let skill = skills.find(skill => skill.name.toLowerCase() === name)

  if (!skill) {
    const match = fuzzySkillName(name)
    if (match) {
      skill = skills.find(skill => skill.name === match)
    }
  }

  if (!skill) {
    throw new Error("Unable to find skill id for: " + name)
  }

  return skill.id
}

export type SkillName =
  | "Overall"
  | "Attack"
  | "Defence"
  | "Strength"
  | "Constitution"
  | "Ranged"
  | "Prayer"
  | "Magic"
  | "Cooking"
  | "Woodcutting"
  | "Fletching"
  | "Fishing"
  | "Firemaking"
  | "Crafting"
  | "Smithing"
  | "Mining"
  | "Herblore"
  | "Agility"
  | "Thieving"
  | "Slayer"
  | "Farming"
  | "Runecrafting"
  | "Hunter"
  | "Construction"
  | "Summoning"
  | "Dungeoneering"
  | "Divination"
  | "Invention"
  | "Archaeology"
