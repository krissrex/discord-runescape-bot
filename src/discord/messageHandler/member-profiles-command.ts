import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import {
  getProfile,
  RuneMetricsProfile,
} from "../../runescape/profile/get-profile"
import { HelpProvider } from "./help-command"

const command = "!profiles"

export class MemberProfilesCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    if (message.content === command) {
      const loadingMessage = await message.channel.send(
        `Fetching ${message.guild.memberCount} profiles...`
      )

      const names = this.fetchUserNames(message)
      const profiles = await this.findValidProfiles(names)
      const response = profiles
        .map(({ name, profile }) => {
          if (!profile.name) {
            return `${name}\t Error: ${profile.error}`
          }
          return `${profile.name}\t (lvl ${profile.totalskill})`
        })
        .join("\n")

      if (loadingMessage instanceof Message) {
        loadingMessage.edit(response)
      }
    }
  }

  fetchUserNames(message: Message): string[] {
    const members = message.guild.members
      .filter(member => !member.user.bot)
      .map(member => member.nickname || member.displayName)

    const usernames = []
    for (const name of members) {
      if (name.indexOf("|") != -1) {
        const names = name.split("|")
        if (names.length > 1) {
          names.shift()
          names
            .map(name => name.trim())
            .filter(name => name)
            .forEach(name => usernames.push(name))
        } else {
          usernames.push(name.trim())
        }
      } else {
        usernames.push(name.trim())
      }
    }

    return usernames
  }

  async findValidProfiles(
    names: string[]
  ): Promise<{ name: string; profile: RuneMetricsProfile }[]> {
    const profiles = []

    for (const name of names) {
      try {
        const profile = await getProfile(name)
        profiles.push({
          name,
          profile,
        })
      } catch (err) {
        // Invalid username
      }
    }

    return profiles
  }
}

export const ProfileHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description:
        "Load the username and total level of all members in this server. Uses the nickname to find rs3 player name",
    }
  },
}

export const memberProfileHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description:
        "Get the profiles of every account in the server. Reads nicknames. Separate names with `|`.",
    }
  },
}
