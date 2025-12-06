import { printMap } from "./mapPrinter";
import { MAP, isBlocked, createMapGrid } from "./shared";
import type { MapGrid } from "./shared";

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

// Count empty neighbors for a cell at (x, y)
function countEmptyNeighbors(map: MapGrid, x: number, y: number): number {
  let emptySpots = 0;
  for (let d = 0; d < directions.length; d++) {
    const [dy, dx] = directions[d];
    const nx = x + dx;
    const ny = y + dy;
    if (!isBlocked(map, nx, ny)) {
      emptySpots++;
    }
  }
  return emptySpots;
}

export default function partTwo(inputArray: string[]): number {
  // Construct the warehouse map as a grid of Cell objects
  const map: MapGrid = createMapGrid(inputArray);

  let totalMoved = 0;
  let runNumber = 0;
  let prevPaperCount = Number.POSITIVE_INFINITY;

  // Helper to count current paper on the board
  function countPaper(map: MapGrid): number {
    let count = 0;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x].value === MAP.PAPER) count++;
      }
    }
    return count;
  }

  printMap(map, runNumber);

  while (true) {
    runNumber++;
    let movedThisRun = 0;

    // First, mark moveable rolls (those with >=5 empty neighbors)
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const cell = map[y][x];
        // Guard: skip empty cells immediately for performance
        if (cell.value === MAP.EMPTY) continue;
        // Guard: error if we encounter a MOVEABLE_PAPER (should never happen at this stage)
        if (cell.value === MAP.MOVEABLE_PAPER) {
          throw new Error(
            `Encountered a MOVEABLE_PAPER (x) at (${x},${y}) before it should have been set.`,
          );
        }
        // Only process rolls of paper
        if (cell.value === MAP.PAPER) {
          const emptySpots = countEmptyNeighbors(map, x, y);
          if (emptySpots >= 5) {
            cell.value = MAP.MOVEABLE_PAPER;
          }
        }
      }
    }

    // Render map before the forklift run (shows moveables)
    printMap(map, runNumber);

    // Second, move all MOVEABLE_PAPER to MOVED_PAPER, count them, and treat MOVED_PAPER as empty for future runs
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const cell = map[y][x];
        if (cell.value === MAP.MOVEABLE_PAPER) {
          cell.value = MAP.MOVED_PAPER;
          movedThisRun++;
        }
      }
    }

    totalMoved += movedThisRun;
    // Render map after the forklift run (shows moved ones)
    printMap(map, runNumber);

    // Stop if no more paper can be moved
    const currentPaper = countPaper(map);
    if (movedThisRun === 0 || currentPaper >= prevPaperCount) {
      break;
    }
    prevPaperCount = currentPaper;
  }

  return totalMoved;
}
