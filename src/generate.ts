import { join } from "node:path";
import { $ } from "bun";
import { parseArgs } from "util";

// 1. Configuration & Validation
const { values } = parseArgs({
  args: Bun.argv,
  options: { day: { type: "string", short: "d" } },
  strict: true,
  allowPositionals: true,
});

const session = Bun.env["AOC_SESSION"];
const year = Bun.env["YEAR"];
if (!session || !year) {
  throw new Error("Missing env vars: Ensure AOC_SESSION and YEAR are set.");
}

const day = values.day;
if (!day) throw new Error("Missing argument: --day <number>");

const dayNum = parseInt(day, 10);
if (isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
  throw new Error("Invalid day. Must be 1-25.");
}

// 2. Path definitions
const rootDir = import.meta.dir;
const yearDir = join(rootDir, year);
const dayDir = join(yearDir, day);

console.log(`\n🎄 Scaffolding Day ${day}, ${year}...`);

// 3. Check for existence (idempotency)
if (await Bun.file(join(dayDir, "input.txt")).exists()) {
  console.error(`❌ Folder already exists: ${dayDir}`);
  process.exit(1);
}

// 4. Data Fetching
async function fetchInput() {
  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: { cookie: `session=${session}` },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Day ${day} not found for year ${year}. It may not be available yet.`);
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error("Authentication failed. Check your AOC_SESSION cookie.");
    }
    throw new Error(`Failed to fetch input: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

// 5. Execution
try {
  // Parallel fetch and template read
  const [input, solutionTemplate, indexTemplate] = await Promise.all([
    fetchInput(),
    Bun.file(join(rootDir, "solution.template.ts")).text(),
    Bun.file(join(rootDir, "index.template.ts")).text(),
  ]);

  // Create the day directory
  await $`mkdir -p ${dayDir}`;

  // Write the files
  await Promise.all([
    Bun.write(join(dayDir, "input.txt"), input.trimEnd()),
    Bun.write(join(dayDir, "example.txt"), ""),
    Bun.write(join(dayDir, "index.ts"), indexTemplate),
    Bun.write(join(dayDir, "1.ts"), solutionTemplate.replace("partNumber", "partOne")),
    Bun.write(join(dayDir, "2.ts"), solutionTemplate.replace("partNumber", "partTwo")),
  ]);

  console.log(`✅ Ready: ${dayDir}`);
} catch (e: any) {
  console.error(`💥 Error: ${e.message}`);
  // Clean up if we created the folder but failed partially
  await $`rm -rf ${dayDir}`.quiet();
  process.exit(1);
}
