import Axios, { AxiosResponse } from "axios"

export async function getProfile(
  username: string
): Promise<RuneMetricsProfile> {
  const url = `https://apps.runescape.com/runemetrics/profile?user=${username}&activities=0`

  const response: AxiosResponse<RuneMetricsProfile> = await Axios.get(url)
  if (response.data && response.data.error !== "NO_PROFILE") {
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
