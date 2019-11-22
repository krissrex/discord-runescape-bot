import { Bot } from "./bot"
import { HelpCommand } from "./messageHandler/help-command"
import { WikiCommand, wikiHelper } from "./messageHandler/wiki"
import {
  MemberProfilesCommand,
  memberProfileHelpProvider,
} from "./messageHandler/member-profiles-command"
import {
  SkillXpCommand,
  skillXpHelpText,
} from "./messageHandler/skill-xp-command"

export function startBot() {
  const bot = new Bot()

  const helpCommand = new HelpCommand()
  bot.messageHandlers.push(helpCommand)

  const wikiCommand = new WikiCommand()
  bot.messageHandlers.push(wikiCommand)
  helpCommand.helpTextProviders.push(wikiHelper)

  bot.messageHandlers.push(new MemberProfilesCommand())
  helpCommand.helpTextProviders.push(memberProfileHelpProvider)

  bot.messageHandlers.push(new SkillXpCommand())
  helpCommand.helpTextProviders.push(skillXpHelpText)

  bot.start()
}
