import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message, Attachment } from "discord.js"
import { HelpProvider } from "./help-command"
import { answerQueryAsGifBuffer } from "../../wolfram-alpha"

const command = "!wolfram"

export class WolframCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    const commandPrefix = command + " "
    if (message.content.startsWith(commandPrefix)) {
      const question = message.content.substr(commandPrefix.length)
      if (question) {
        const answer = await answerQueryAsGifBuffer(question)
        if (answer !== null) {
          message.channel.send("", {
            embed: {
              file: new Attachment(answer, "wolfram.gif"),
              title: question,
              timestamp: new Date(),
            },
          })
        } else {
          message.channel.send("Failed to answer: `" + question + "`.")
        }
      } else {
        message.channel.send("Missing argument `question`.")
      }
    }
  }
}

export const wolframHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command,
      description:
        "Returns a picture with information from Wolfram Alpha. Arguments: `question`",
    }
  },
}
