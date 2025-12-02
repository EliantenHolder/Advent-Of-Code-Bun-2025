// Advent of Code 2025 - Day 1, Part 1
// Count how many times the dial ends on 0 after each rotation

let dial = 50;
let dialPositionHasBeenZeroCounter = 0;

export default function partOne(inputArray: string[]): number {
  inputArray.forEach((line) => {
    const direction = line[0];
    const movement = Number(line.slice(1));
    const offset = (direction === "R" ? 1 : -1) * movement;
    updateDialPosition(offset);
  });

  return dialPositionHasBeenZeroCounter;
}

function updateDialPosition(offset: number): void {
  dial = ((dial + offset) % 100 + 100) % 100;
  if (dial === 0) dialPositionHasBeenZeroCounter++;
}
