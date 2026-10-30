import { testInput, input } from "./input.ts";

const data = input.split("\n");

let codeCharacters = 0;
let memoryCharacters = 0;

data.forEach((data) => {
  const check = new Function(`return ${data};`)();
  codeCharacters = codeCharacters + [...data].length;
  memoryCharacters = memoryCharacters + check.length;
});

console.log("answer = " + (codeCharacters - memoryCharacters));
