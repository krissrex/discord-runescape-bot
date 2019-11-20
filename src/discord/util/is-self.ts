import { Message } from "discord.js"

export function isSelf(message: Message): boolean {
  return message.author.id === process.env.DISCORD_BOT_CLIENT_ID
}
