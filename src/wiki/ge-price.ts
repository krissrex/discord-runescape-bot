import Axios from "axios"

export interface GePrice {
  itemId: number
  price: number
  itemName: string
  value: number
  tradeLimit: number
  membersItem: boolean
}

/**
 * **Note:** The wiki seems to not return prices any more.
 * Use the `grand-exchange` module instead, to get the inaccurate prices (eg. `13.7k`).
 * @param itemName String name for an item, like `"Rune Scimitar"`.
 */
export async function getGePrice(itemName: string): Promise<GePrice> {
  const encodedName = encodeURIComponent(itemName)
  const url = "https://runescape.wiki/w/Module:Exchange/" + encodedName

  const response = await Axios.get(url, {
    params: {
      action: "raw",
    },
  })

  if (response.data) {
    const data = response.data
    const gePrice: GePrice = parseData(data)
    return gePrice
  }

  throw new Error("No data returned")
}

export function parseData(data: string): GePrice {
  // Note: For some reason, the wiki stopped sending some of this data, like price.
  /*
  itemId     = 4151,
    price      = 71117,
    last       = 71127,
    date       = '24 November 2019 00:00:00 (UTC)',
    lastDate   = '23 November 2019 00:00:00 (UTC)',
    item       = 'Abyssal whip',
    value      = 120001,
    limit      = 10,
    members    = true,
    category   = 'Melee weapons - high level',
    examine    = 'A weapon from the Abyss.',
  */
  // item can use both ' and " to quote the data.
  const itemIdMatch = data.match(/itemId\s*=\s*(\d+)/)
  const itemNameMatch = data.match(/item\s*=\s*(?:'|")(.*)(?:'|"),/)
  const membersItemMatch = data.match(/members\s*=\s*(true|false)/)
  const priceMatch = data.match(/price\s*=\s*(\d+)/)
  const tradeLimitMatch = data.match(/limit\s*=\s*(\d+)/)
  const valueMatch = data.match(/value\s*=\s*(\d+)/)

  return {
    itemId: (itemIdMatch && parseInt(itemIdMatch[1], 10)) || -1,
    itemName: (itemNameMatch && itemNameMatch[1]) || "<unknown name>",
    membersItem: (membersItemMatch && membersItemMatch[1] === "true") || false,
    price: (priceMatch && parseInt(priceMatch[1], 10)) || -1,
    tradeLimit: (tradeLimitMatch && parseInt(tradeLimitMatch[1], 10)) || -1,
    value: (valueMatch && parseInt(valueMatch[1], 10)) || -1,
  }
}
