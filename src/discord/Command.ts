import { Message } from "discord.js"

/**
 * A Discord bot command, issued by a user.
 */
export interface Command {
  /** The command, like `/wiki` or `!help` or `help` */
  command: string
  /** Any arguments following the `command`, separated by spaces */
  arguments: string[]
}

/**
 *
 * @param message the discord message
 * @param prefix the command prefix, like `/` or `!`, if it should be removed from the resulting command
 */
export function toCommand(message: Message, prefix = ""): Command {
  if (prefix && !message.content.startsWith(prefix)) {
    throw new Error(
      `Message does not start with prefix "${prefix}": "${message.content}"!`
    )
  }

  const tokens = message.content.slice(prefix.length).split(" ")
  let command: string | undefined = tokens.shift()
  if (command) {
    command = command.toLowerCase()
  } else {
    throw new Error("Invalid message contents: " + message.content)
  }

  return {
    command,
    arguments: tokens,
  }
}
