import { Channel, TextChannel, Collection } from "discord.js"

export function textChannels(
  channels: Collection<string, Channel>
): TextChannel[] {
  return channels
    .filter(channel => channel.type === "text")
    .map(channel => channel as TextChannel)
}
