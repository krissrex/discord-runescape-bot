import WolframAlphaAPI, { WolframAlphaApi } from "wolfram-alpha-api"
import logging from "../logging"

const log = logging("wolfram-alpha")

const appId = process.env.WOLFRAM_ALPHA_APP_ID
let waApi: WolframAlphaApi | undefined = undefined
if (process.env.WOLFRAM_ALPHA_ENABLED === "true" && appId) {
  waApi = WolframAlphaAPI(appId)
}

export async function answerQueryAsSpokenText(query: string): Promise<string> {
  if (!query) {
    throw new Error("The query can not be empty.")
  }

  if (waApi) {
    return await waApi.getSpoken(query)
  } else {
    log.debug(
      "Wolfram alpha is not enabled. Answering query with an empty response"
    )
    return ""
  }
}
