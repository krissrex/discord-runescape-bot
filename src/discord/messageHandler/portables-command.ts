import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { HelpProvider } from "./help-command"

const command = "!portables"

export class PortablesCommand extends AbstractBotIgnoringMessageHandler {
  protected doHandle(message: Message): void {
    if (message.content.startsWith(command)) {
      message.channel.send(
        "Portables spreadsheet: https://docs.google.com/spreadsheets/d/16Yp-eLHQtgY05q6WBYA2MDyvQPmZ4Yr3RHYiBCBj2Hc/edit"
      )
    }
  }
}

export const portablesHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description: "Returns the portables spreadsheet URL",
    }
  },
}
