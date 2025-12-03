interface JoltageInfo {
  value: number;
  index: number;
}

interface BankJoltages {
  first: JoltageInfo;
  second: JoltageInfo;
  total: number;
}

export default function partOne(inputArray: string[]): number {
  // Each line represents a bank of batteries
  // Select exactly two joltages per bank (the highest, then the next highest after it)
  // The "joltage total" for a bank is these two joltages concatenated (e.g., 7 and 9 = 79)
  // Sum all joltage totals across all banks

  const bankResults = inputArray.map((bankString) =>
    findOptimalBankJoltages(bankString),
  );
  return bankResults.reduce((sum, bank) => sum + bank.total, 0);
}

function findOptimalBankJoltages(bankString: string): BankJoltages {
  // Convert string digits to numbers once upfront
  const joltages = bankString.split("").map(Number);

  // Pass 1: Find the highest joltage from left to right (skip the last one)
  const first = findHighestJoltageInRange(joltages, 0, joltages.length - 1);

  // Pass 2: Find the highest joltage after the first one
  const second = findHighestJoltageInRange(
    joltages,
    first.index + 1,
    joltages.length,
  );

  // Calculate total joltage by concatenating the two values
  const total = +`${first.value}${second.value}`;

  return { first, second, total };
}

function findHighestJoltageInRange(
  joltages: number[],
  startIndex: number,
  endIndex: number,
): JoltageInfo {
  let highest: JoltageInfo = { value: 0, index: -1 };

  joltages.every((joltageValue, index) => {
    // Skip if outside our search range
    if (index < startIndex || index >= endIndex) {
      return true; // continue
    }

    // 9 is always the maximum, so we can stop searching
    if (joltageValue === 9) {
      highest = { value: joltageValue, index };
      return false; // break
    }

    // Update if we find a higher value
    if (joltageValue > highest.value) {
      highest = { value: joltageValue, index };
    }

    return true; // continue
  });

  return highest;
}
