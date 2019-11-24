import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { toCommand } from "../Command"
import { getMonthlyXpGain } from "../../runescape/skill/monthly-xp-gain"
import {
  skillIdFromString,
  skillFromId,
} from "../../runescape/skill/skill-from-id"
import { levelFromXp } from "../../runescape/skill/xp"
import logging from "../../logging"
import { HelpProvider } from "./help-command"
import { addThousandsSeparator } from "../../util/add-thousands-separator"

const log = logging("command:skill-xp-command")

const command = "!level"

export class SkillXpCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    if (message.content.startsWith(command)) {
      const command = toCommand(message)
      if (command.arguments.length === 2) {
        try {
          const username = command.arguments[0]
          const skillName = command.arguments[1]
          if (username) {
            try {
              const skillId = skillIdFromString(skillName)
              const loadingMessage = await message.channel.send(
                `Loading skill ${skillName} for ${username}...`
              )
              const gains = await getMonthlyXpGain(username, skillId)
              log.debug(
                "Found gains for user %s and skill %s - %s",
                username,
                skillName,
                skillId
              )

              if (gains.monthlyXpGain) {
                const monthlyXpGain = gains.monthlyXpGain.find(
                  gain => gain.skillId === skillId
                )

                if (monthlyXpGain) {
                  const level = levelFromXp(monthlyXpGain.totalXp)
                  const officialSkill = skillFromId(skillId)

                  const lastMonthIndex = monthlyXpGain.monthData.length - 1
                  const lastMonth = monthlyXpGain.monthData[lastMonthIndex]
                  let lastMonthGains = 0
                  if (lastMonth) {
                    lastMonthGains = lastMonth.xpGain
                  }

                  if (loadingMessage instanceof Message) {
                    const total = addThousandsSeparator(monthlyXpGain.totalXp)
                    const thisMonth = addThousandsSeparator(lastMonthGains)
                    loadingMessage.edit(
                      `${username} has level ${level} in ${officialSkill.name}. Total xp is ${total} where ${thisMonth} xp came this month.`
                    )
                  }
                } else {
                  if (loadingMessage instanceof Message) {
                    loadingMessage.edit("Failed.")
                  }
                }
              } else {
                if (loadingMessage instanceof Message) {
                  loadingMessage.edit("Failed.")
                }
              }
            } catch (err) {
              log.error({ err, username, skillName }, "Failed to find data")
              message.channel.send(
                "Failed to find data for user " +
                  username +
                  " and skill " +
                  skillName +
                  "."
              )
            }
          }
        } catch (err) {}
      }
    }
  }
}

export const skillXpHelpText: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description:
        "Get the level for a user's skill. Arguments: `username` `skill`",
    }
  },
}
