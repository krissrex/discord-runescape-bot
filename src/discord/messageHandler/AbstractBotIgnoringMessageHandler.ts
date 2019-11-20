import { DiscordMessageHandler } from "../bot"
import { Message } from "discord.js"
import { isBot } from "../util/is-bot"

export abstract class AbstractBotIgnoringMessageHandler
  implements DiscordMessageHandler {
  handle(message: Message): void {
    if (isBot(message)) {
      return
    }

    this.doHandle(message)
  }

  protected abstract doHandle(message: Message): void
}
