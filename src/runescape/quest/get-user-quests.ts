import Axios, { AxiosResponse } from "axios"

interface QuestResponse {
  quests: Quest[]
  loggedIn: string
}

interface Quest {
  title: string
  status: "COMPLETED" | "NOT_STARTED" | "STARTED" | "NOT_ELIGIBLE"
  /** Use `questDifficultyToString` to convert this number */
  difficulty: number
  members: boolean
  /** How many points this quest rewards */
  questPoints: number
  userEligible: boolean
}

export function getUserQuests(username: string) {
  const url = "https://apps.runescape.com/runemetrics/quests"

  try {
    const response: AxiosResponse<QuestResponse> = await Axios.get(url, {
      params: {
        user: username,
      },
    })

    if (response.status >= 200 && response.status < 300 && response.data) {
      return response.data
    } else {
      throw new Error("Request failed: " + response.status)
    }
  } catch (err) {
    throw err
  }
}

export function difficultyToString(difficulty: number) {}
