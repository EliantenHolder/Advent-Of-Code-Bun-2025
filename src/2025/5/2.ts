export default function partTwo(inputString: string): number {
  const [rangesStr] = inputString.split("\n\n");
  // Cast and filter the inputs, ensure that no empty lines sneak in.
  const freshIngredientIDRanges: string[] = rangesStr
    .split("\n")
    .filter(Boolean);

  const ranges: Array<[number, number]> = [];
  // Order the ranges depending on their range start.

  for (const range of freshIngredientIDRanges) {
    const [start, end] = range.split("-").map(Number);

    if (Number.isNaN(start) || Number.isNaN(end) || end < start) {
      continue;
    }
    ranges.push([start, end]);
  }
  // Sort all the input ranges
  const sortedRanges = ranges.sort((a, b) => {
    return a[0] - b[0];
  });

  // Merge overlapping ranges using reduce
  const mergedRanges = sortedRanges.reduce(
    (acc, range) => {
      // Get the last range in the accumulator
      const prev = acc.at(-1);

      // If no previous range, add the first range
      if (!prev) {
        acc.push(range);
        return acc;
      }

      // If ranges overlap, merge by updating the end of the last range
      if (prev[1] >= range[0]) {
        const merged: [number, number] = [prev[0], Math.max(prev[1], range[1])];
        acc[acc.length - 1] = merged; // Replace last with merged
      } else {
        // If no overlap, add the current range as is
        acc.push(range);
      }
      return acc;
    },
    // Type the accumulator for TS
    [] as Array<[number, number]>,
  );

  // Log the reduction in range count
  console.log(
    `Reduced from ${sortedRanges.length} ranges to ${mergedRanges.length} merged ranges after consolidation.`,
  );

  // Calculate the total number of IDs covered by all merged ranges (inclusive)
  const totalFreshIngredientIDs = mergedRanges.reduce(
    (sum, [start, end]) => sum + (end - start + 1),
    0,
  );
  return totalFreshIngredientIDs;
}
