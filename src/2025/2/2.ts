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
    if (isNumberInvalidId(currentNumber.toString())) {
      sum += currentNumber;
    }
  }

  return sum;
}

function isNumberInvalidId(numberToCheck: string): boolean {
  // Guard: numbers under length 2 can never form a repeating pattern
  if (numberToCheck.length < 2) {
    return false;
  }

  const patternMaxLength = numberToCheck.length / 2 + 1;

  // Test each pattern length from 1 to half the number's length
  for (let patternLength = 1; patternLength < patternMaxLength; patternLength++) {
    const substrings = [];
    for (let i = 0; i < numberToCheck.length; i += patternLength) {
      substrings.push(numberToCheck.slice(i, i + patternLength));
    }

    // Invalid ID found if all substrings are identical
    if (substrings.every((substring) => substring === substrings[0])) {
      return true;
    }
  }

  return false;
}
