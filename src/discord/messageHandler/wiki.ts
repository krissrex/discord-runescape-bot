import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { HelpProvider } from "./help-command"

const rsWikiCommand = "/wiki"
const command = "!wiki"

export class WikiCommand extends AbstractBotIgnoringMessageHandler {
  protected doHandle(message: Message): void {
    const commands = [rsWikiCommand + " ", command + " "]

    if (message.content.startsWith(commands[0])) {
      const query = message.content.substr(commands[0].length)
      message.channel.send(this.createSearchLink(query))
    } else if (message.content.startsWith(commands[1])) {
      const query = message.content.substr(commands[1].length)
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
      command: rsWikiCommand,
      description: `Get a runescape wiki link. Alias of \`${command}\`. Usage: \`/wiki Dragon Rider Lance\``,
    }
  },
}
