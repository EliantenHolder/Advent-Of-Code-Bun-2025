/**
 * Cell value types for the warehouse map.
 */
export type CellValue = (typeof MAP)[keyof typeof MAP];

/**
 * Cell object for the warehouse map.
 */
export interface Cell {
  value: CellValue;
  x: number;
  y: number;
}

/**
 * The warehouse map grid type.
 */
export type MapGrid = Cell[][];

export const MAP = {
  EMPTY: ".",
  PAPER: "@",
  MOVEABLE_PAPER: "x",
  MOVED_PAPER: "X",
} as const;

/**
 * Checks if the cell at (x, y) is blocked (contains PAPER or MOVEABLE_PAPER).
 * Out-of-bounds is considered EMPTY (not blocked).
 * No explicit bounds check is needed due to optional chaining.
 */
export function isBlocked(map: MapGrid, x: number, y: number): boolean {
  return ([MAP.PAPER, MAP.MOVEABLE_PAPER] as CellValue[]).includes(
    map[y]?.[x]?.value as CellValue,
  );
}

/**
 * Converts an array of strings into a MapGrid.
 * Each character is mapped to a Cell with its value and coordinates.
 */
export function createMapGrid(inputArray: string[]): MapGrid {
  return inputArray.map((row, y) =>
    row.split("").map((char, x) => ({
      value: char as CellValue,
      x,
      y,
    })),
  );
}
