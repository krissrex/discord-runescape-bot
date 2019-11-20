import { Message } from "discord.js"

export function isBot(message: Message): boolean {
  return message.author.bot
}
