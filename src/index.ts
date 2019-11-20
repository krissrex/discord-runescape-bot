import "./env"
import logging from "./logging"

const log = logging("index")

log.info("Env: %s", process.env.NODE_ENV)
log.info("Starting application: %s", process.env.BOT_NAME)
