import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"

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
    if (message.content.startsWith(command)) {
      const tex = message.content.substr(command.length)
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
