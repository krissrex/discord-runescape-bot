import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { toCommand } from "../Command"
import { getProfile, Skill } from "../../runescape/profile/get-profile"
import { xpUntil99, TOTAL_XP_AT_ALL_99 } from "../../runescape/skill/xp"
import { skillFromId } from "../../runescape/skill/skill-from-id"
import { HelpProvider } from "./help-command"
import { addThousandsSeparator } from "../../util/add-thousands-separator"

const command = "!maxed"

interface PlayerStats {
  maxedSkillCount: number
  notMaxedSkillCount: number
  percentSkillsMaxed: number
  remaining: {
    skillId: number
    remaining: number
    max: number
    percentTo99: number
  }[]
  totalRemainingXp: number
  totalPercentToMax: number
}

export class MaxedCommand extends AbstractBotIgnoringMessageHandler {
  protected async doHandle(message: Message) {
    if (message.content.startsWith(command)) {
      const command = toCommand(message)
      if (command.arguments.length === 1) {
        const username = command.arguments[0]
        if (username) {
          const loadingMessage = await message.channel.send(
            `Loading skills for ${username}...`
          )
          const profile = await getProfile(username)
          if (profile.name) {
            const skills = profile.skillvalues
            const stats = this.calculateSkillStats(skills)

            if (loadingMessage instanceof Message) {
              const output = this.calculateMessage(profile.name, stats, skills)
              loadingMessage.edit(output)
            }
          }
        }
      } else {
        message.channel.send("Missing argument `username`")
      }
    }
  }

  calculateMessage(
    username: string,
    stats: PlayerStats,
    skills: Skill[]
  ): string {
    let output = `${username} is ${stats.totalPercentToMax}% to max.`
    output += `\nHe has ${stats.maxedSkillCount} of ${skills.length} skills at 99, which is ${stats.percentSkillsMaxed}%.`
    const totalRemainingXp = addThousandsSeparator(stats.totalRemainingXp)
    output += `\n${stats.notMaxedSkillCount} skills are missing a total of ${totalRemainingXp} xp:`
    for (const skill of stats.remaining) {
      const skillName = skillFromId(skill.skillId).name
      const remainingXp = addThousandsSeparator(skill.remaining)
      output += `\n\t${skillName}: ${skill.percentTo99}% (${remainingXp} xp remaining)`
    }
    return output
  }

  calculateSkillStats(skills: Skill[]): PlayerStats {
    const maxedSkillCount = this.getNumberOf99Skills(skills)
    const notMaxedSkillCount = skills.length - maxedSkillCount
    const percentSkillsMaxed = Math.round(
      (100 * maxedSkillCount) / skills.length
    )
    const remaining = this.getSkillRemainingXp(skills).map(remainder => ({
      skillId: remainder.skillId,
      remaining: remainder.remaining,
      max: remainder.max,
      percentTo99: Math.round((100 * remainder.current) / remainder.max),
    }))

    const totalRemainingXp = remaining
      .map(skill => skill.remaining)
      .reduce((sum, xp) => sum + xp)
    const totalXpAt99 = TOTAL_XP_AT_ALL_99
    const totalPercentToMax = Math.round(
      (100 * (totalXpAt99 - totalRemainingXp)) / totalXpAt99
    )

    return {
      maxedSkillCount,
      notMaxedSkillCount,
      percentSkillsMaxed,
      remaining,
      totalRemainingXp,
      totalPercentToMax,
    }
  }

  getNumberOf99Skills(skills: Skill[]): number {
    return skills.filter(skill => skill.level >= 99).length
  }

  getSkillRemainingXp(skills: Skill[]) {
    const notMaxed = skills.filter(skill => skill.level < 99)
    return notMaxed.map(skill => xpUntil99(skillFromId(skill.id), skill.xp))
  }
}

export const maxedCommandHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: command,
      description: "Get a player's progress towards max. Arguments: `username`",
    }
  },
}
