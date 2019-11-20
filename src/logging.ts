import pino from "pino"
import { isDev } from "./util/is-env"

const loggerName = process.env.LOG_ROOT_NAME || "rs-bot"

export const rootLogger = pino({
  name: loggerName,
  level: isDev() ? "debug" : "info",
  prettyPrint: isDev(),
})

export default function(name: string) {
  return rootLogger.child({
    name: loggerName + ":" + name,
  })
}
