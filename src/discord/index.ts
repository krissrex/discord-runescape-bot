import { Bot } from "./bot"
import { HelpCommand } from "./messageHandler/help-command"
import { WikiCommand, wikiHelper } from "./messageHandler/wiki"

export function startBot() {
  const bot = new Bot()

  const helpCommand = new HelpCommand()
  bot.messageHandlers.push(helpCommand)

  const wikiCommand = new WikiCommand()
  bot.messageHandlers.push(wikiCommand)
  helpCommand.helpTextProviders.push(wikiHelper)

  bot.start()
}
