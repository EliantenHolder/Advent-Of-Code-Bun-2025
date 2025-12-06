/**
 * printMap is AI/LLM generated/assisted, I don't use LLM assistance for the actual challenge but this adds some xmas cheer.
 * Fancy debug helper for printing the map grid.
 * - Adds a Christmas-themed header and footer.
 * - Optionally limit columns with maxCols.
 * - Colors: @ = yellow, X = red, . = dim.
 * - Prints stats for @, X, and total.
 *
 * Usage: import { printMap } from "./mapPrinter";
 */

import { MAP } from "./shared";
import type { MapGrid } from "./shared";

export function printMap(map: MapGrid, runNumber?: number) {
  // ANSI color codes
  const RESET = "\x1b[0m";
  const RED = "\x1b[31m";
  const GOLD = "\x1b[38;5;220m";
  const DIM = "\x1b[2m";
  const GREEN = "\x1b[38;5;22m";
  const BOLD = "\x1b[1m";
  const BG_GREEN = "\x1b[48;5;22m";

  let paperCount = 0;
  let moveableCount = 0;
  let movedCount = 0;

  // Christmas colored start with run number if provided
  let runMsg = "🎄✨ === ELFISH WAREHOUSE MAP START === ✨🎄";
  if (typeof runNumber === "number") {
    runMsg =
      runNumber % 2 === 1
        ? `🎄✨ === ELFISH WAREHOUSE MAP BEFORE FORKLIFT MOVE ${Math.ceil(runNumber / 2)} === ✨🎄`
        : `🎄✨ === ELFISH WAREHOUSE MAP AFTER FORKLIFT MOVE ${runNumber / 2} === ✨🎄`;
  }
  console.log("\n" + BG_GREEN + BOLD + runMsg + RESET);

  for (let y = 0; y < map.length; y++) {
    let rowArr: string[] = [];
    for (let x = 0; x < map[y].length; x++) {
      const v = map[y][x].value;
      if (v === MAP.PAPER) {
        rowArr.push(RED, v, RESET);
        paperCount++;
      } else if (v === MAP.MOVEABLE_PAPER) {
        rowArr.push(GOLD, v, RESET);
        moveableCount++;
      } else if (v === MAP.MOVED_PAPER) {
        rowArr.push(GREEN, v, RESET);
        movedCount++;
      } else {
        rowArr.push(DIM, v, RESET);
      }
    }
    console.log(rowArr.join(""));
  }

  // Solid red background for stats line
  const BG_RED_SOLID = "\x1b[41m";
  const HEADER_WHITE = "\x1b[97m";

  const total = paperCount + moveableCount + movedCount;
  console.log(
    BG_RED_SOLID +
      HEADER_WHITE +
      BOLD +
      "🎅 @ (Paper): " +
      `${paperCount}` +
      "   ✨ x (Moveable): " +
      `${moveableCount}` +
      "   🎁 X (Moved): " +
      `${movedCount}` +
      "   🎄 Total: " +
      `${total}` +
      RESET,
  );
}
