import { Bot } from "./bot"
import { HelpCommand } from "./messageHandler/help-command"
import { WikiCommand, wikiCommandHelpProvider } from "./messageHandler/wiki"
import {
  MemberProfilesCommand,
  memberProfileHelpProvider,
} from "./messageHandler/member-profiles-command"
import {
  SkillXpCommand,
  skillXpHelpProvider,
} from "./messageHandler/skill-xp-command"
import {
  MaxedCommand,
  maxedCommandHelpProvider,
} from "./messageHandler/maxed-command"
import {
  PortablesCommand,
  portablesHelpProvider,
} from "./messageHandler/portables-command"

export function startBot() {
  const bot = new Bot()

  const helpCommand = new HelpCommand()
  bot.messageHandlers.push(helpCommand)

  const wikiCommand = new WikiCommand()
  bot.messageHandlers.push(wikiCommand)
  helpCommand.helpTextProviders.push(wikiCommandHelpProvider)

  bot.messageHandlers.push(new MemberProfilesCommand())
  helpCommand.helpTextProviders.push(memberProfileHelpProvider)

  bot.messageHandlers.push(new SkillXpCommand())
  helpCommand.helpTextProviders.push(skillXpHelpProvider)

  bot.messageHandlers.push(new MaxedCommand())
  helpCommand.helpTextProviders.push(maxedCommandHelpProvider)

  bot.messageHandlers.push(new PortablesCommand())
  helpCommand.helpTextProviders.push(portablesHelpProvider)

  bot.start()
}
