import Axios, { AxiosResponse } from "axios"
import logging from "../logging"

const log = logging("search-name")

/**
 * Search the wiki for an item, quest or other page.
 * @param string the wiki page to search for
 */
export async function searchName(name: string): Promise<string | undefined> {
  const encodedName = encodeURIComponent(name)
  const url = `https://runescape.wiki/w/${encodedName}?action=raw`
  const response = await Axios.get(url, {
    params: {
      action: "raw",
    },
  })

  if (response.data) {
    const data: string = response.data
    return _parseData(data)
    throw new Error("Unknown response: " + data)
  }
}

export function _parseData(data: string): string | undefined {
  if (data.startsWith("#REDIRECT")) {
    return _getRedirectData(data)
  }
  if (data.startsWith("{{")) {
    return _getName(data)
  }
}

export function _getRedirectData(redirect: string): string | undefined {
  const regex = /#REDIRECT \[\[([^\]]+)\]\]/
  const result = regex.exec(redirect)

  if (result && result.length) {
    return result[1].trim()
  }

  return undefined
}

export function _getName(data: string): string | undefined {
  const regex = /\|name\d? = ([^|]+)(?:\||$)/m
  const result = regex.exec(data)

  if (result && result.length) {
    return result[1].trim()
  }
  return undefined
}
