function hasDecimalPlaces(n: number): boolean {
  return n % 1 !== 0;
}

export function parseInteger(n?: number | string): string {
  const number = n ? Number(n) : 0;
  const suffixes: string[] = ["", "k", "M", "B"];
  if (Math.abs(number) < 1000) {
    return String(n);
  } else {
    const exp: number = Math.max(
      Math.floor((Math.abs(number).toString().length - 1) / 3),
      1
    );
    const parsedNumber = number / 10 ** (3 * exp);
    const stringNum = parsedNumber.toFixed(
      hasDecimalPlaces(parsedNumber) ? 1 : 0
    );
    return stringNum + suffixes[exp];
  }
}
