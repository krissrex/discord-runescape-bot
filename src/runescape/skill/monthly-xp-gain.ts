import Axios, { AxiosResponse } from "axios"

export interface MonthlyGainResponse {
  monthlyXpGain: MonthlyXpGain[]
  loggedIn: "true" | "false"
}

export interface MonthlyXpGain {
  skillId: number
  totalXp: number
  averageXpGain: number
  totalGain: number
  monthData: MonthDatum[]
}

export interface MonthDatum {
  xpGain: number
  timestamp: number
  rank: number
}

export async function getMonthlyXpGain(
  username: string,
  skillId: number
): Promise<MonthlyGainResponse> {
  const url = "https://apps.runescape.com/runemetrics/xp-monthly"
  try {
    const response: AxiosResponse<MonthlyGainResponse> = await Axios.get(url, {
      params: {
        searchName: username,
        skillid: skillId,
      },
    })

    if (response.status >= 200 && response.status < 300 && response.data) {
      return response.data
    } else {
      throw new Error("Invalid parameters")
    }
  } catch (err) {
    throw err
  }
}
