import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { toCommand } from "../Command"
import { searchName } from "../../wiki/search-name"
import { getGePrice } from "../../wiki/ge-price"
import { HelpProvider } from "./help-command"
import logging from "../../logging"
import { addThousandsSeparator } from "../../util/add-thousands-separator"
import { calculateHighAlch } from "../../runescape/item/high-alch"

const log = logging("ge-price-command")

const command = "!ge"

export class GePriceCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    if (message.content.startsWith(command)) {
      const item = message.content.substr(command.length)
      if (item) {
        const loadingMessage = await message.channel.send(
          "Loading prices for " + item
        )
        try {
          const name = await searchName(item)
          if (name) {
            log.info("Found ge name: " + name)
            const priceData = await getGePrice(name)
            if (priceData) {
              if (loadingMessage instanceof Message) {
                const price = addThousandsSeparator(priceData.price)
                const alchPrice = calculateHighAlch(priceData.value)
                const alch = addThousandsSeparator(alchPrice)
                loadingMessage.edit(
                  `${priceData.itemName} costs ${price} (${priceData.tradeLimit} trade limit). High alch: ${alch}`
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
