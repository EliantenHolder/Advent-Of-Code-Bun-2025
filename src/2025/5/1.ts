export default function partOne(inputString: string): number {
  const [rangesStr, ingredientsStr] = inputString.split("\n\n");
  // Cast and filter the inputs, ensure that no empty lines sneak in.
  const freshIngredientIDRanges: string[] = rangesStr
    .split("\n")
    .filter(Boolean);
  const availableIngredients: number[] = ingredientsStr
    .split("\n")
    .filter(Boolean)
    .map(Number);

  const ranges: Array<[number, number]> = [];

  for (const range of freshIngredientIDRanges) {
    const [start, end] = range.split("-").map(Number);

    if (Number.isNaN(start) || Number.isNaN(end) || end < start) {
      continue;
    }
    ranges.push([start, end]);
  }

  function isFresh(id: number): boolean {
    for (const [start, end] of ranges) {
      if (id >= start && id <= end) return true;
    }
    return false;
  }
  // Call isFresh on all availableIngredients and count how many are fresh.
  const freshAvailableCount = availableIngredients.filter(isFresh).length;
  return freshAvailableCount;
}
