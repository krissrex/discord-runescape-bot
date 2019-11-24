import Axios, { AxiosResponse } from "axios"
import logging from "../../logging"

const log = logging("get-profile")

export async function getProfile(
  username: string
): Promise<RuneMetricsProfile> {
  const url = "https://apps.runescape.com/runemetrics/profile"

  const response: AxiosResponse<RuneMetricsProfile> = await Axios.get(url, {
    params: {
      user: username,
      activities: 0,
    },
  })
  if (response.data && response.data.error !== "NO_PROFILE") {
    if (response.data.skillvalues) {
      response.data.skillvalues = response.data.skillvalues.map(values => {
        return {
          ...values,
          xp: Math.floor(values.xp / 10),
        }
      })
    }
    return response.data
  }

  throw new Error("No response")
}

export interface RuneMetricsProfile {
  error?: "NO_PROFILE"
  magic: number
  questsstarted: number
  totalskill: number
  questscomplete: number
  questsnotstarted: number
  totalxp: number
  ranged: number
  activities: any[]
  skillvalues: Skill[]
  name: string
  rank: string
  melee: number
  combatlevel: number
  loggedIn: "true" | "false"
}

export interface Skill {
  level: number
  xp: number
  rank: number
  id: number
}
