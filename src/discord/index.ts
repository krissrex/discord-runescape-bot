import { Bot } from "./bot"
import { HelpCommand } from "./messageHandler/help-command"
import { WikiCommand, wikiHelper } from "./messageHandler/wiki"
import { MemberProfilesCommand } from "./messageHandler/member-profiles-command"
import { SkillXpCommand } from "./messageHandler/skill-xp-command"

export function startBot() {
  const bot = new Bot()

  const helpCommand = new HelpCommand()
  bot.messageHandlers.push(helpCommand)

  const wikiCommand = new WikiCommand()
  bot.messageHandlers.push(wikiCommand)
  helpCommand.helpTextProviders.push(wikiHelper)

  bot.messageHandlers.push(new MemberProfilesCommand())

  bot.messageHandlers.push(new SkillXpCommand())

  bot.start()
}
