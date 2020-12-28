import Axios from "axios"

export async function fetchExchangeDataForItemid(
  itemId: number
): Promise<GrandExchangeItem> {
  const url =
    "https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json"

  const response = await Axios.get(url, {
    params: {
      item: itemId,
    },
  })

  if (response.data && response.data.item) {
    const item: GrandExchangeItem = response.data.item
    return item
  }

  throw new Error("No response for item ID: " + itemId)
}

/**
 * Like `"13.7k"`
 */
type truncatedPrice = string

export interface GrandExchangeItem {
  icon: string
  icon_large: string
  id: number
  type: string
  typeIcon: string
  name: string
  description: string
  current: {
    trend: string
    price: truncatedPrice
  }
  today: {
    trend: string
    price: string
  }
  members: string
  day30: {
    trend: string
    change: string
  }
  day90: {
    trend: string
    change: string
  }
  day180: {
    trend: string
    change: string
  }
}
