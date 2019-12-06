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
import {
  GePriceCommand,
  GePriceCommandHelpProvider,
} from "./messageHandler/ge-price-command"
import {
  VisWaxCommand,
  VisWaxHelpProvider,
} from "./messageHandler/vis-wax-command"
import logging from "../logging"
import {
  VoiceOfSerenCommand,
  voiceOfSerenHelpProvider,
} from "./messageHandler/vos-command"
import { TexToImageCommand } from "./messageHandler/tex-to-png-command"

const log = logging("discord")

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

  bot.messageHandlers.push(new GePriceCommand())
  helpCommand.helpTextProviders.push(GePriceCommandHelpProvider)

  bot.messageHandlers.push(new VisWaxCommand())
  helpCommand.helpTextProviders.push(VisWaxHelpProvider)

  bot.messageHandlers.push(new VoiceOfSerenCommand())
  helpCommand.helpTextProviders.push(voiceOfSerenHelpProvider)

  bot.messageHandlers.push(new TexToImageCommand())

  log.info("Loaded " + bot.messageHandlers.length + " message handlers")
  bot.start()
}
