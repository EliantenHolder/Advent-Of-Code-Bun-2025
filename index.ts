import { parseArgs } from 'util';

const { positionals } = parseArgs({
  args: Bun.argv.slice(2),
  strict: true,
  allowPositionals: true,
});

const [year, day] = positionals;
if (!year || !day) {
	console.error('Usage: bun run aoc <year> <day>');
	console.error('Example: bun run aoc 2024 1');
	process.exit(1);
}

await import(`./src/${year}/${day}/index.ts`);
