declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development" | "test"

    /** Name of the bot. Does not change the Discord username. */
    BOT_NAME?: string

    /** The client id, from Discord>OAuth2>CLIENT ID */
    DISCORD_BOT_CLIENT_ID?: string

    /** The secret token to connect to Discord. Generate it at the Discord>Application>Bot page */
    DISCORD_BOT_TOKEN?: string

    /** Permission integer generated by [Discord>Application>Bot>Bot Permissions](https://discordapi.com/permissions.html) */
    DISCORD_BOT_PERMISSIONS?: string
  }
}
