import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { HelpProvider } from "./help-command"

const command = "!tex"

function createLatexImageUrl(tex: string): string {
  const fillTransparent = "bg,s,00000000"
  const colorWhite = "FFFFFF"

  const textColor = colorWhite
  const backgroundColor = fillTransparent
  const encodedTex = encodeURIComponent(tex)

  const imageToTexUrl = `https://chart.apis.google.com/chart?cht=tx&chf=${backgroundColor}&chco=${textColor}&chl=${encodedTex}`
  return imageToTexUrl
}

export class TexToImageCommand extends AbstractBotIgnoringMessageHandler {
  protected doHandle(message: Message): void {
    const commandPrefix = command + " "
    if (message.content.startsWith(commandPrefix)) {
      const tex = message.content.substr(commandPrefix.length)
      if (tex) {
        const imageUrl = createLatexImageUrl(tex)
        message.channel.send("", {
          embed: {
            image: {
              url: imageUrl,
            },
            title: tex,
          },
        })
      }
    }
  }
}

export const texHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command,
      description: "Converts latex into images. Arguments: `latex text`",
    }
  },
}
