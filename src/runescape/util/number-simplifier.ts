export function numberSimplifier(number: number): string {
  if (number >= 1e6) {
    return Math.floor(number / 1e6) + "m"
  }
  if (number >= 1e3) {
    return Math.floor(number / 1e3) + "k"
  }

  return number + ""
}
