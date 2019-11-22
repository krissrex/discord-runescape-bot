import { SkillName } from "./skill-from-id"

/**
 * Try to find a skill name from a fuzzy string that is not an exact match.
 *
 * @param name skill name search string, like `wc`
 */
export function fuzzySkillName(name: string): SkillName | undefined {
  name = name.trim().toLowerCase()
  if (!name) {
    return undefined
  }

  const fromMap = abbreviations.get(name)
  if (fromMap) {
    return fromMap
  }
}

const abbreviations = new Map<string, SkillName>([
  ["all", "Overall"],
  ["total", "Overall"],
  ["atk", "Attack"],
  ["att", "Attack"],
  ["def", "Defence"],
  ["str", "Strength"],
  ["const", "Constitution"],
  ["hp", "Constitution"],
  ["ranged", "Ranged"],
  ["pray", "Prayer"],
  ["mage", "Magic"],
  ["cook", "Cooking"],
  ["wc", "Woodcutting"],
  ["woodcut", "Woodcutting"],
  ["fletch", "Fletching"],
  ["fish", "Fishing"],
  ["fm", "Firemaking"],
  ["craft", "Crafting"],
  ["smith", "Smithing"],
  ["mine", "Mining"],
  ["herb", "Herblore"],
  ["agi", "Agility"],
  ["thiev", "Thieving"],
  ["slay", "Slayer"],
  ["farm", "Farming"],
  ["rc", "Runecrafting"],
  ["runecraft", "Runecrafting"],
  ["hunt", "Hunter"],
  ["constr", "Construction"],
  ["summ", "Summoning"],
  ["sum", "Summoning"],
  ["dg", "Dungeoneering"],
  ["dung", "Dungeoneering"],
  ["div", "Divination"],
  ["inv", "Invention"],
])
