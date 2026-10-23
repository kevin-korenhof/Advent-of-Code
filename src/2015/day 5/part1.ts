import { input } from "./input.ts";

/**
 * New rules for a nice string:
 * - a pair of any 2 letters that appears at least twice with no overlap (xyxy, aabcderaa (aa))
 * - contains a letters that repeats with at least 1 letter in between (xdx, afdjkaen (a), aaa (1 letter in between...))
 */

function toSingleLetters(input: string): string[] {
  return input.split("");
}

function assertReturn2LetterCombo(input: string): boolean {
  for (let i = 0; i < input.length - 3; i++) {
    const combo = input.slice(i, i + 2);

    for (let j = i + 2; j < input.length - 1; j++) {
      if (input.slice(j, j + 2) === combo) {
        return true;
      }
    }
  }
  return false;
}

function assertReturningLetter(input: string): boolean {
  const stringArray = toSingleLetters(input);
  for (let i = 0; i < stringArray.length - 2; i++) {
    if (stringArray[i] === stringArray[i + 2]) {
      return true;
    }
  }
  return false;
}

function assertIsNiceString(input: string): boolean {
  if (!assertReturn2LetterCombo(input)) {
    return false;
  }

  if (!assertReturningLetter(input)) {
    return false;
  }

  return true;
}

let niceStrings = 0;

const testData: string[] = ["qjhvhtzxzqqjkmpb", "xxyxx", "uurcxstgmygtbstg", "ieodomkazucvgmuy"];
// should return with 2 nice strings

const data: string[] = input.split("\n");

// const data = testData;

data.forEach((string) => {
  assertIsNiceString(string) && niceStrings++;
});

console.log("Number of nice strings: " + niceStrings);
