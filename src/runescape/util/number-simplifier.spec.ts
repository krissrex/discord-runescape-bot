import { numberSimplifier } from "./number-simplifier"

describe("Number simplifier", () => {
  it("Should return the original number when under 1000", () => {
    const actual = numberSimplifier(999)
    expect(actual).toBe("999")
  })

  it("Should return the number with k when between 1000 and 1.000.000", () => {
    const actual = numberSimplifier(15000)
    expect(actual).toBe("15k")
  })

  it("Should return 1m when at 1.000.000", () => {
    const actual = numberSimplifier(1_000_000)
    expect(actual).toBe("1m")
  })

  it("Should return the number withh m when over 1.000.000", () => {
    const actual = numberSimplifier(200_500_000)
    expect(actual).toBe("200m")
  })
})
