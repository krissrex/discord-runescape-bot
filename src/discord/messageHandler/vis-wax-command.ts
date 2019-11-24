import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { HelpProvider } from "./help-command"

const command = "!vis"

export class VisWaxCommand extends AbstractBotIgnoringMessageHandler {
  protected doHandle(message: Message): void {
    if (message.content.startsWith(command)) {
      message.channel.send("https://warbandtracker.com/goldberg/index.php")
    }
  }
}

export const VisWaxHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description: "Returns the link to the current vis wax combo.",
    }
  },
}
