import dotenv from "dotenv"
import path from "path"

function localFile(fileName: string): string {
  return path.resolve(process.cwd(), fileName)
}

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = "production"
}

let env = process.env.NODE_ENV || "production"

dotenv.config({
  path: localFile(`.env.${env}.local`),
})
dotenv.config({
  path: localFile(`.env.${env}`),
})
dotenv.config({
  path: localFile(".env"),
})

if (
  process.env.WOLFRAM_ALPHA_APP_ID === undefined ||
  process.env.WOLFRAM_ALPHA_APP_ID === "<missing>"
) {
  process.env.WOLFRAM_ALPHA_ENABLED = undefined
} else {
  process.env.WOLFRAM_ALPHA_ENABLED = "true"
}
