export type QuestDifficulty =
  | "Novice"
  | "Intermediate"
  | "Experienced"
  | "Master"
  | "Grandmaster"
  | "Special"

export function questDifficultyToString(difficulty: number): QuestDifficulty {
  switch (difficulty) {
    case 250:
      return "Special"
    case 4:
      return "Grandmaster"
    case 3:
      return "Master"
    case 2:
      return "Experienced"
    case 1:
      return "Intermediate"
    default:
      return "Novice"
  }
}
