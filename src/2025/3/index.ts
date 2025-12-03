import partOne from "./1";
import partTwo from "./2";

const useExample = process.env.AOC_EXAMPLE === "1";
const fileName = useExample ? "example.txt" : "input.txt";
const filePath = `${import.meta.dir}/${fileName}`;
const inputText = await Bun.file(filePath).text();
const inputArray = inputText.trim().split("\n");

const start = performance.now();

const one = partOne(inputArray);

const lap = performance.now();

const two = partTwo(inputArray);

const end = performance.now();

console.log(`🎄 Part One: ${one}`);
console.log(`🎄 Part Two: ${two}`);

console.log(`⏰ The script took ${end - start}ms to run.`);
console.log(`⏰ Part one took ${lap - start}ms to run.`);
console.log(`⏰ Part two took ${end - lap}ms to run.`);
