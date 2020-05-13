import { AbstractBotIgnoringMessageHandler } from "./AbstractBotIgnoringMessageHandler"
import { Message } from "discord.js"
import { toCommand } from "../Command"
import { getProfile, Skill } from "../../runescape/profile/get-profile"
import {
  xpUntil99,
  TOTAL_XP_AT_ALL_99,
  TOTAL_OSRS_XP_AT_ALL_99,
} from "../../runescape/skill/xp"
import { skillFromId } from "../../runescape/skill/skill-from-id"
import { HelpProvider } from "./help-command"
import { addThousandsSeparator } from "../../util/add-thousands-separator"
import { getOsrsLevels, OsrsSkill } from "../../runescape/skill/get-osrs-levels"

const rs3Command = "!maxed"
const osrsCommand = "!!maxed"

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
    const isRs3Command = message.content.startsWith(rs3Command)
    const isOsrsCommand = message.content.startsWith(osrsCommand)

    if (!isRs3Command && !isOsrsCommand) {
      return
    }

    const command = toCommand(message)
    if (command.arguments.length == 0) {
      message.channel.send("Arguments `username`")
      return
    }

    const username = command.arguments.join("_") // Allow names with spaces
    if (username) {
      const game = isRs3Command ? "rs3" : "osrs"
      const loadingMessage = await message.channel.send(
        `Loading skills (${game}) for ${username}...`
      )

      if (isRs3Command) {
        const profile = await getProfile(username)
        if (profile.name) {
          const skills = profile.skillvalues
          const stats = this.calculateSkillStats(skills)

          if (loadingMessage instanceof Message) {
            const output = this.calculateMessage(profile.name, stats, skills)
            loadingMessage.edit(output)
          }
        }
      } else if (isOsrsCommand) {
        const profile = await getOsrsLevels(username)
        if (profile.name) {
          const skills = profile.skillvalues
          const stats = this.calculateOsrsSkillStats(skills)

          if (loadingMessage instanceof Message) {
            const output = this.calculateMessage(profile.name, stats, skills)
            loadingMessage.edit(output)
          }
        }
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

    if (stats.notMaxedSkillCount > 0) {
      const totalRemainingXp = addThousandsSeparator(stats.totalRemainingXp)
      output += `\n${stats.notMaxedSkillCount} skills are missing a total of ${totalRemainingXp} xp:`
      for (const skill of stats.remaining) {
        const skillName = skillFromId(skill.skillId).name
        const remainingXp = addThousandsSeparator(skill.remaining)

        const xp = skills.find(it => it.id == skill.skillId)?.xp
        if (xp == -1) {
          // Happens for OSRS users. No highscore gives -1 xp value in the runescape API.
          output += `\n\t${skillName}: Is not even on the highscores. Git gud (${remainingXp} xp remaining)`
        } else {
          output += `\n\t${skillName}: ${skill.percentTo99}% (${remainingXp} xp remaining)`
        }
      }
    } else {
      output += `\nGz, you're maxed! :partying_face:`
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
      .reduce((sum, xp) => sum + xp, 0)
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

  calculateOsrsSkillStats(skills: OsrsSkill[]): PlayerStats {
    const maxedSkillCount = this.getNumberOf99Skills(skills)
    const notMaxedSkillCount = skills.length - maxedSkillCount
    const percentSkillsMaxed = Math.round(
      (100 * maxedSkillCount) / skills.length
    )
    const remaining = this.getOsrsSkillRemainingXp(skills).map(remainder => ({
      skillId: remainder.skillId,
      remaining: remainder.remaining,
      max: remainder.max,
      percentTo99: Math.round((100 * remainder.current) / remainder.max),
    }))

    const totalRemainingXp = remaining
      .map(skill => skill.remaining)
      .reduce((sum, xp) => sum + xp, 0)
    const totalXpAt99 = TOTAL_OSRS_XP_AT_ALL_99
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

  getOsrsSkillRemainingXp(skills: OsrsSkill[]) {
    const notMaxed = skills.filter(skill => skill.level < 99)
    const xpAt99 = 13_034_431
    return notMaxed.map(skill => {
      return {
        skillId: skill.id,
        remaining: xpAt99 - skill.xp,
        current: skill.xp,
        max: xpAt99,
      }
    })
  }
}

export const maxedCommandHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: rs3Command,
      description:
        "Get a rs3 player's progress towards max. Arguments: `username`",
    }
  },
}

export const osrsMaxedCommandHelpProvider: HelpProvider = {
  getHelpText() {
    return {
      command: osrsCommand,
      description:
        "Get an osrs player's progress towards max. Arguments: `username`",
    }
  },
}
