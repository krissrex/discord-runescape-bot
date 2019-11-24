import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { HelpProvider } from "./help-command"

const wikiCommand = "/wiki"

export class WikiCommand extends AbstractBotIgnoringMessageHandler {
  public command: string = wikiCommand

  protected doHandle(message: Message): void {
    const commandFilter = this.command + " "
    if (message.content.startsWith(commandFilter)) {
      const query = message.content.slice(commandFilter.length)
      message.channel.send(this.createSearchLink(query))
    }
  }

  createSearchLink(query: string): string {
    const encoded = encodeURIComponent(query)
    return `https://runescape.wiki/w/${encoded}`
  }
}

export const wikiCommandHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: wikiCommand,
      description:
        "Get a runescape wiki link. Usage: `/wiki Dragon Rider Lance`",
    }
  },
}
