import { Bot } from "./bot"
import { HelpCommand } from "./messageHandler/help-command"
import { WikiCommand, wikiHelper } from "./messageHandler/wiki"
import { MemberProfilesCommand } from "./messageHandler/member-profiles-command"

export function startBot() {
  const bot = new Bot()

  const helpCommand = new HelpCommand()
  bot.messageHandlers.push(helpCommand)

  const wikiCommand = new WikiCommand()
  bot.messageHandlers.push(wikiCommand)
  helpCommand.helpTextProviders.push(wikiHelper)

  bot.messageHandlers.push(new MemberProfilesCommand())

  bot.start()
}
