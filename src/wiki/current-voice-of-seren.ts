import Axios, { AxiosResponse } from "axios"

type District =
  | "Crwys"
  | "Cadarn"
  | "Amlodd"
  | "Hefin"
  | "Iorwerth"
  | "Ithell"
  | "Meilyr"
  | "Trahaearn"

interface VoiceOfSerenResponse {
  batchcomplete: boolean
  query: Query
}

interface Query {
  allmessages: Message[]
}

interface Message {
  name: string
  normalizedname: string
  /** Eg `"Crwys,Cadarn"` */
  content: string
}

export async function getCurrentVoiceOfSeren(): Promise<Array<District>> {
  const url =
    "https://runescape.wiki/api.php?action=query&format=json&meta=allmessages&ammessages=VoS&amlang=en-gb&formatversion=2"

  const response: AxiosResponse<VoiceOfSerenResponse> = await Axios.get(url)
  if (response.data) {
    const data = response.data
    if (data.query.allmessages.length) {
      const districts = data.query.allmessages[0].content.split(",")
      return districts as District[]
    }
  }

  throw new Error("Failed to get Voice of Seren data")
}
