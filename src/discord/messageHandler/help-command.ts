import { Message, Util } from "discord.js"
import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"

export interface HelpText {
  command: string
  description: string
}

export interface HelpProvider {
  getHelpText(): HelpText
}

const helpCommandHelpProvider = {
  getHelpText() {
    return {
      command: "!help",
      description: "Display this help text",
    }
  },
}

export class HelpCommand extends AbstractBotIgnoringMessageHandler {
  public helpTextProviders: HelpProvider[] = []

  constructor() {
    super()
    this.helpTextProviders.push(helpCommandHelpProvider)
  }

  doHandle(message: Message): void {
    if (message.content.trim() === "!help") {
      let helpText = this.createHelpMessage()
      helpText +=
        "\n~~~\nSource code can be found at: https://github.com/krissrex/discord-runescape-bot"
      if (helpText) {
        const helpMessages = Util.splitMessage(helpText, { char: "\n" })
        message.channel.send(helpMessages)
      }
    }
  }

  createHelpMessage(): string {
    return this.helpTextProviders
      .map(provider => provider.getHelpText())
      .map(help => help.command + " - " + help.description)
      .join("\n---\n")
  }
}
