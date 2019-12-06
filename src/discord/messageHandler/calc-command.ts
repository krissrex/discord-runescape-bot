import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { HelpProvider } from "./help-command"
import { Message } from "discord.js"
import { answerQueryAsSpokenText } from "../../wolfram-alpha"
import logging from "../../logging"

const log = logging("command:calc-command")

const command = "!calc"

export class CalcCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    const commandPrefix = command + " "
    if (message.content.startsWith(commandPrefix)) {
      const query = message.content.substr(commandPrefix.length)
      if (query) {
        try {
          const answer = await answerQueryAsSpokenText(query)
          if (answer) {
            message.channel.send(answer + "\n>>> " + query)
          } else {
            message.channel.send("I don't know how to answer: \n>>> " + query)
          }
        } catch (err) {
          log.error({ err, query }, "Failed to answer query")
        }
      }
    }
  }
}

export const calcHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command,
      description:
        "Answers questions using Wolfram Alpha. Arguments: `your question`",
    }
  },
}
