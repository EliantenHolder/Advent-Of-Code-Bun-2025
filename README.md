# 🎄 Advent of Code 2025 - Bun

My solutions for [Advent of Code 2025](https://adventofcode.com/) using [Bun](https://bun.sh).

This repository is based on the excellent [aoc-bun template](https://github.com/BraedenKilburn/aoc-bun) by Braeden Kilburn.

## 🚀 Quick Start

**1. Clone the repository**

```bash
git clone https://github.com/EliantenHolder/Advent-Of-Code-Bun-2025.git
cd Advent-Of-Code-Bun-2025
```

**2. Install dependencies**

```bash
bun install
```

**3. Run a solution**

```bash
bun run aoc 2025 1      # Run once (2025 = year, 1 = day)
bun run aoc:watch 2025 1 # Run with hot reload
```

## 📁 Structure

Each day's solution is organized in its own folder:

```
src/2025/1/
├── index.ts    # Main entry point
├── 1.ts        # Part one solution
├── 2.ts        # Part two solution
├── input.txt   # Puzzle input
└── example.txt # Example test cases
```

## 💡 Notes

- Use `example.txt` to test with the puzzle's example data
- Execution time is automatically measured for each part
- Use `bun run aoc:watch` for quick iteration with hot reload
- Code is formatted with [Biome](https://biomejs.dev/) via `bun run format`

## 🔗 Links

- [Advent of Code](https://adventofcode.com/)
- [Bun Documentation](https://bun.sh)
- [Biome](https://biomejs.dev/)
- [aoc-bun Template](https://github.com/BraedenKilburn/aoc-bun)
