/**
 * Day 2 – Gift Shop (Part Two, performant implementation).
 * Same algorithm as the naive version; hot paths use fewer allocations and tighter loops.
 * Variables are named descriptively to serve as a teaching example.
 */

// Performant part-two implementation; self-contained and optimized hot paths.
export default function partTwoPerformant(inputArray: string[]): number {
  const inputLine = inputArray[0];
  const rangeStrings = inputLine.split(",");

  let totalSumOfInvalidIds = 0;

  // Keep classic indexed loop for slightly cheaper iteration in hot path.
  // biome-ignore lint: performance-critical hot loop; indexed for is intentional
  for (let rangeIndex = 0; rangeIndex < rangeStrings.length; rangeIndex++) {
    const rangeString = rangeStrings[rangeIndex];
    if (!rangeString) continue;

    const dashIndex = rangeString.indexOf("-");
    const rangeStart = Number(rangeString.slice(0, dashIndex));
    const rangeEnd = Number(rangeString.slice(dashIndex + 1));

    totalSumOfInvalidIds += sumInvalidIdsInRange(rangeStart, rangeEnd);
  }

  return totalSumOfInvalidIds;
}

/**
 * Sum all invalid IDs within [rangeStart, rangeEnd] using part-two rules.
 */
function sumInvalidIdsInRange(rangeStart: number, rangeEnd: number): number {
  let sumForRange = 0;

  // Simple numeric loop; avoids iterator/closure overhead.
  for (let currentId = rangeStart; currentId <= rangeEnd; currentId++) {
    if (isInvalidId(currentId)) {
      sumForRange += currentId;
    }
  }

  return sumForRange;
}

/**
 * Check whether candidateId is invalid (digit block repeated ≥ 2 times).
 * Optimized: one toString, no temporary arrays, index-based comparisons.
 */
function isInvalidId(candidateId: number): boolean {
  const idString = candidateId.toString();
  const idLength = idString.length;

  // Single-digit IDs cannot be formed by repeating a non-empty pattern twice.
  if (idLength < 2) return false;

  // Max pattern length (exclusive) is floor(idLength / 2) + 1.
  // Use bit-shift for cheap integer division by 2.
  const maxPatternLengthExclusive = (idLength >>> 1) + 1;

  // Try each possible pattern length.
  for (let patternLength = 1; patternLength < maxPatternLengthExclusive; patternLength++) {
    // Skip if the total length is not a multiple of the pattern length.
    if (idLength % patternLength !== 0) continue;

    const repetitionCount = idLength / patternLength;
    let allBlocksMatch = true;

    // Compare each subsequent block to the first block; break on mismatch.
    for (let blockIndex = 1; blockIndex < repetitionCount && allBlocksMatch; blockIndex++) {
      const blockStartOffset = blockIndex * patternLength;

      // Compare this block to the first block character by character.
      for (let characterIndex = 0; characterIndex < patternLength; characterIndex++) {
        const firstBlockChar = idString[characterIndex];
        const currentBlockChar = idString[blockStartOffset + characterIndex];

        if (firstBlockChar !== currentBlockChar) {
          allBlocksMatch = false;
          break;
        }
      }
    }

    if (allBlocksMatch) {
      // idString is exactly this pattern repeated repetitionCount times.
      return true;
    }
  }

  return false;
}
