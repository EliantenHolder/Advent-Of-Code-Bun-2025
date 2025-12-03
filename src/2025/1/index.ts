import partOne from "./1";
import partTwoNaive from "./2";
import partTwoPerformant from "./2.performant";

const useExample = process.env.AOC_EXAMPLE === "1";
const fileName = useExample ? "example.txt" : "input.txt";
const filePath = `${import.meta.dir}/${fileName}`;
const inputText = await Bun.file(filePath).text();
const inputArray = inputText.trim().split("\n");

const startTotal = performance.now();

const one = partOne(inputArray);

const lapPartOne = performance.now();

const twoNaive = partTwoNaive(inputArray);

const lapPartTwoNaive = performance.now();

const twoPerformant = partTwoPerformant(inputArray);

const endTotal = performance.now();

console.log(`🎄 Part One: ${one}`);
console.log(`🎄 Part Two (Naive): ${twoNaive}`);
console.log(`🎄 Part Two (Performant): ${twoPerformant}`);

console.log(`\n⏰ Timing:`);
const partOneTime = lapPartOne - startTotal;
const naiveTime = lapPartTwoNaive - lapPartOne;
const performantTime = endTotal - lapPartTwoNaive;

console.log(`⏰ Part One took ${partOneTime.toFixed(3)}ms`);
console.log(`⏰ Part Two (Naive) took ${naiveTime.toFixed(3)}ms`);
console.log(`⏰ Part Two (Performant) took ${performantTime.toFixed(3)}ms`);
console.log(`⏰ Total script took ${(endTotal - startTotal).toFixed(3)}ms`);

if (twoNaive === twoPerformant) {
  console.log(`\n✅ Both implementations match!`);
  const speedup = ((naiveTime / performantTime - 1) * 100).toFixed(1);
  console.log(`🚀 Performant is ${speedup}% faster than Naive`);
} else {
  console.log(`\n❌ Results don't match!`);
  console.log(`   Naive: ${twoNaive}`);
  console.log(`   Performant: ${twoPerformant}`);
  console.log(`   Difference: ${twoPerformant - twoNaive}`);
}
