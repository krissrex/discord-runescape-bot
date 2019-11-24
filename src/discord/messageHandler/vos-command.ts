import { Message } from "discord.js"
import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { HelpProvider } from "./help-command"
import { getCurrentVoiceOfSeren } from "../../wiki/current-voice-of-seren"

const command = "!vos"

export class VoiceOfSerenCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    if (message.content.startsWith(command)) {
      const districts = await getCurrentVoiceOfSeren()
      if (districts && districts.length) {
        message.channel.send(
          `Voice of Seren is currently active in ${districts[0]} and ${districts[1]}.`
        )
      }
    }
  }
}

export const voiceOfSerenHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description: "Returns the current active voice of seren in Priffidnas.",
    }
  },
}
