import { parseArgs } from "util";

const { positionals, values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    example: {
      type: "boolean",
      short: "e",
    },
  },
  strict: true,
  allowPositionals: true,
});

const [year, day] = positionals;
if (!year || !day) {
  console.error("Usage: bun run aoc <year> <day> [--example]");
  console.error("Example: bun run aoc 2025 1");
  console.error("Example: bun run aoc 2025 1 --example");
  process.exit(1);
}

if (values.example) {
  process.env.AOC_EXAMPLE = "1";
}

await import(`./src/${year}/${day}/index.ts`);
