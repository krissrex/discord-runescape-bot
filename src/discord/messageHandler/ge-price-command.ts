import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { toCommand } from "../Command"
import { searchName } from "../../wiki/search-name"
import { getGePrice } from "../../wiki/ge-price"
import { HelpProvider } from "./help-command"
import logging from "../../logging"
import { addThousandsSeparator } from "../../util/add-thousands-separator"
import { calculateHighAlch } from "../../runescape/item/high-alch"
import { fetchExchangeDataForItemid } from "../../runescape/item/grand-exchange"

const log = logging("ge-price-command")

const command = "!ge"

export class GePriceCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    const prefix = command + " "
    if (message.content.startsWith(prefix)) {
      const item = message.content.substr(prefix.length)
      if (item) {
        const loadingMessage = await message.channel.send(
          "Loading prices for " + item
        )
        try {
          let name = await searchName(item)
          if (name) {
            log.info("Found ge name: " + name)
            const itemUsages = this.getUsages(item)
            if (itemUsages) {
              name = name + ` (${itemUsages})`
            }
            const priceData = await getGePrice(name)
            if (priceData) {
              if (loadingMessage instanceof Message) {
                let price: string
                if (priceData.price !== -1) {
                  price = addThousandsSeparator(priceData.price)
                } else {
                  // Fallback from when wiki stopped giving price.
                  const geData = await fetchExchangeDataForItemid(
                    priceData.itemId
                  )
                  price = geData.current.price // E.g. `13.7k`
                }
                const alchPrice = calculateHighAlch(priceData.value)
                const alch = addThousandsSeparator(alchPrice)
                loadingMessage.edit(
                  `${priceData.itemName} costs ${price} (${priceData.tradeLimit} trade limit). High alch: ${alch}` +
                    `\nhttps://runescape.wiki/w/Exchange:${encodeURIComponent(
                      name
                    )}`
                )
              }
            }
          } else {
            if (loadingMessage instanceof Message) {
              loadingMessage.edit("Failed to find: " + item)
            }
          }
        } catch (err) {
          log.error({ err }, "Failed to find item " + item)
          if (loadingMessage instanceof Message) {
            loadingMessage.edit("Failed to find item: " + item)
          }
        }
      } else {
        message.channel.send("Missing argument: `itemName`")
      }
    }
  }

  /**
   *
   * @param itemName eg `prayer potion (3)`
   * @returns eg `3`
   */
  getUsages(itemName: string): number | undefined {
    const regex = / \((\d)\)$/
    const matches = regex.exec(itemName)
    if (matches) {
      const usages = parseInt(matches[1], 10)
      return usages
    }
    return undefined
  }
}

export const GePriceCommandHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description:
        "Gets the item price. Usage: `" + command + " dragon rider lance`",
    }
  },
}
