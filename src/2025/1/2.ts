// Advent of Code 2025 - Day 1, Part 2
// Count how many times the dial points at 0 during rotations (method 0x434C49434B)

let dial = 50;
let dialHasClickedOnZeroCounter = 0;

export default function partTwo(inputArray: string[]): number {
  inputArray.forEach((line) => {
    const direction = line[0];
    const movement = Number(line.slice(1));
    const offset = (direction === "R" ? 1 : -1) * movement;
    updateDialPosition(offset);
  });

  return dialHasClickedOnZeroCounter;
}

function updateDialPosition(offset: number): void {
  const startPos = dial;
  const endPos = startPos + offset;

  // Count how many multiples of 100 we cross (where dial wraps to 0)
  // Right: cross at 100, 200, 300... | Left: cross at 0, -100, -200...
  let zeroCount = 0;

  if (offset > 0) {
    // Moving right: formula counts boundary crossings
    zeroCount = Math.floor(endPos / 100) - Math.floor(startPos / 100);

  } else if (offset < 0) {
    // Moving left: explicit handling needed (0 is inside bucket, not at boundary)
    if (endPos === 0 && startPos > 0) {
      zeroCount = 1; // Landed exactly on 0
    } else if (endPos < 0) {
      zeroCount = Math.floor(Math.abs(endPos) / 100) + 1; // Crossed 0 and beyond
      if (startPos === 0) zeroCount--; // Don't count starting position
    }
  }

  dial = ((endPos % 100) + 100) % 100;
  dialHasClickedOnZeroCounter += zeroCount;
}
