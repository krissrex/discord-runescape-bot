import { toCommand } from "./Command"
import { Message } from "discord.js"

describe("Command", () => {
  it("Should remove spaces from arguments when they are separators", () => {
    const actual = toCommand(messageWithContent("!maxed bob"))
    expect(actual.arguments[0]).toBe("bob")
  })

  it("Should get the argument", () => {
    const actual = toCommand(messageWithContent("!maxed bob"))
    expect(actual.command).toBe("!maxed")
  })

  it("Should remove prefix from command", () => {
    const actual = toCommand(messageWithContent("!vis"), "!")
    expect(actual.command).toBe("vis")
  })

  it("Should return empty list for no arguments", () => {
    const actual = toCommand(messageWithContent("!vis"))
    expect(actual.arguments).toBeDefined()
    expect(actual.arguments).toEqual([])
  })
})

function messageWithContent(content: string): Message {
  const message: Message = jest.fn() as any
  message.content = content
  return message
}
