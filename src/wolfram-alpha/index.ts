import WolframAlphaAPI, { WolframAlphaApi } from "wolfram-alpha-api"
import logging from "../logging"
import imageDataUri from "image-data-uri"

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

export async function answerQueryAsGifBuffer(
  query: string
): Promise<Buffer | null> {
  if (!query) {
    throw new Error("The query can not be empty.")
  }

  if (waApi) {
    const encodedImageDataUri = await waApi.getSimple(query)
    const imageData: Buffer = imageDataUri.decode(encodedImageDataUri)
      .dataBuffer

    return imageData
  } else {
    log.debug(
      "Wolfram alpha is not enabled. Answering query with an empty response"
    )
    return null
  }
}
