import { MAP, isBlocked, createMapGrid } from "./shared";
import type { MapGrid } from "./shared";

export default function partOne(inputArray: string[]): number {
  // Naive approach
  // Represent the input as a array of row that contain a array of columns, where 0,0 is the top left most index.
  // Iterate through the rolls of paper, and check the 8 adjacent places for rolls. If you find 5 places you can mark the roll as removed. Eg. X
  // Performance optimiation to stop looking after you have found 5, can ignore the rest. Count outside the matrix as empty spots.

  // Construct the warehouse map as a grid of Cell objects using shared helper
  const map: MapGrid = createMapGrid(inputArray);
  // printMap(map);
  let moveableRollsOfPaper = 0;

  // Directions: top, top right, right, bottom right, bottom, bottom left, left, top left
  const directions = [
    [-1, 0], // top
    [-1, 1], // top right
    [0, 1], // right
    [1, 1], // bottom right
    [1, 0], // bottom
    [1, -1], // bottom left
    [0, -1], // left
    [-1, -1], // top left
  ];

  // Iterate through the entire map, and check each cell.
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const cell = map[y][x];
      // Guard: skip empty cells immediately for performance
      if (cell.value === MAP.EMPTY) {
        continue;
      }
      // Guard: error if we encounter an X (should never happen at this stage)
      if (cell.value === MAP.MOVEABLE_PAPER) {
        throw new Error(
          `Encountered a MOVEABLE_PAPER (X) at (${x},${y}) before it should have been set.`,
        );
      }

      // Only process rolls of paper
      if (cell.value === MAP.PAPER) {
        // Check if we can find 4 empty spots around this cell
        let emptySpots = 0;
        for (let d = 0; d < directions.length; d++) {
          const [dy, dx] = directions[d];
          const nx = x + dx;
          const ny = y + dy;
          if (!isBlocked(map, nx, ny)) {
            emptySpots++;
          }
        }
        if (emptySpots >= 5) {
          cell.value = MAP.MOVEABLE_PAPER;
          // Found moveable roll of paper so increment the counter
          moveableRollsOfPaper++;
        }
      }
    }
  }

  // printMap(map);

  return moveableRollsOfPaper;
}
