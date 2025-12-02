export default function partOne(inputArray: string[]): number {
  const input = inputArray[0];
  const idRanges = input.split(",");

  return idRanges.reduce((sum, range) => {
    const [start, end] = range.split("-");
    return sum + invalidIDCheckerForRange(start, end);
  }, 0);
}

function invalidIDCheckerForRange(start: string, end: string): number {
  const startNumber = +start;
  const endNumber = +end;
  let sum = 0;

  // Iterate through range and sum values of invalid IDs
  for (let currentNumber = startNumber; currentNumber <= endNumber; currentNumber++) {
    if (isNumberInvalidId(currentNumber)) {
      sum += currentNumber;
    }
  }

  return sum;
}

function isNumberInvalidId(numberToCheck: number): boolean {
  const numberAsString = String(numberToCheck);
  const numberLength = numberAsString.length;

  // Invalid IDs must have even length (first half = second half)
  if (numberLength % 2 !== 0) return false;

  const midpoint = numberLength / 2;
  return numberAsString.slice(0, midpoint) === numberAsString.slice(midpoint);
}
