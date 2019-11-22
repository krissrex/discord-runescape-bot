import discord from "discord.js"
import logging from "../logging"

const log = logging("bot")

export interface BotOptions {
  token?: string
}

export interface DiscordMessageHandler {
  handle(message: discord.Message): void
}

export class Bot {
  public client: discord.Client
  options: BotOptions
  isReady = false

  public messageHandlers: DiscordMessageHandler[] = []

  constructor(options: BotOptions = {}) {
    this.client = new discord.Client()
    this.options = options

    this.options.token = this.options.token || process.env.DISCORD_BOT_TOKEN
  }

  public async start() {
    this.client.once("ready", () => {
      this.isReady = true
      log.info("Discord client is ready")
      this.client.user.setActivity("Made by Kristian R", { type: "WATCHING" })

      const servers = this.client.guilds.map(guild => guild.name)
      log.info({ servers })
    })

    this.client.on("message", message => {
      this.handleMessage(message)
    })

    if (!this.options.token || this.options.token === "<missing>") {
      log.error("Discord token is missing!")
    } else {
      try {
        await this.client.login(this.options.token)
        log.info("Logged in")
      } catch (err) {
        log.error(
          { token: this.options.token },
          "Failed to log in to discord: %s",
          err
        )
      }
    }
  }

  handleMessage(message: discord.Message) {
    this.messageHandlers.forEach(handler => {
      handler.handle(message)
    })
  }
}
