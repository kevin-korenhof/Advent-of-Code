import { testInput, input } from "./input.ts";

const data = input.split("\n");

let codeCharacters = 0;
let memoryCharacters = 0;

data.forEach((data) => {
  codeCharacters = codeCharacters + [...data].length;
  memoryCharacters = memoryCharacters + JSON.stringify(data).length;
  console.log(JSON.stringify(data));
});

console.log("answer = " + (memoryCharacters - codeCharacters));
