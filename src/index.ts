import "./env"
import logging from "./logging"
import { getUrl } from "./discord/invite-url"

const log = logging("index")

log.info("Env: %s", process.env.NODE_ENV)
log.info("Starting application: %s", process.env.BOT_NAME)

const inviteUrl = getUrl()
log.info({ inviteUrl }, "Invite the bot by using this link: %s", inviteUrl)
