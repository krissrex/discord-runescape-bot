import { Message } from "discord.js"
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
      const helpText = this.createHelpMessage()
      if (helpText) {
        message.channel.send(helpText)
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
