interface BankJoltages {
  joltages: number[];
  total: number;
}

export default function partTwo(inputArray: string[]): number {
  // Each line represents a bank of batteries
  // Select exactly 12 joltages per bank to maximize the concatenated value
  // Must keep selected joltages in their original left-to-right order
  const joltagesPerBank = 12;

  const bankResults = inputArray.map((bankString) =>
    findOptimalBankJoltages(bankString, joltagesPerBank),
  );

  return bankResults.reduce((sum, bank) => sum + bank.total, 0);
}

function findOptimalBankJoltages(
  bankString: string,
  targetCount: number,
): BankJoltages {
  const joltages = bankString.split("").map(Number);
  const selectedJoltages = selectBestJoltages(joltages, targetCount);

  // Concatenate selected joltages to get the total
  const total = +selectedJoltages.join("");

  return { joltages: selectedJoltages, total };
}

function selectBestJoltages(joltages: number[], targetCount: number): number[] {
  // Use monotonic stack eg, fixed order stack: greedily remove smaller joltages when larger ones appear
  // This keeps the result in original order while maximizing the concatenated value
  const stack: number[] = [];
  const skipCount = joltages.length - targetCount;
  let skipsRemaining = skipCount;

  // Build stack left to right, removing smaller values when we find larger ones
  for (const joltage of joltages) {
    // Remove smaller joltages from the back of the stack if we find a larger one
    // and we still have skips available
    while (
      stack.length > 0 &&
      stack[stack.length - 1] < joltage &&
      skipsRemaining > 0
    ) {
      stack.pop();
      skipsRemaining--;
    }

    stack.push(joltage);
  }

  // If we still have skips remaining, remove from the end (smallest tail values)
  // Needed to ensure we don't exceed the target length
  while (skipsRemaining > 0) {
    stack.pop();
    skipsRemaining--;
  }

  return stack;
}
