/**
 * Same as part 1, but now ignore any OBJECT, that has any value containing "red"
 */

import { input } from "./input.ts";

let startNumber = 0;

function checkForNumber(input) {
  if (typeof input === "object") {
    let red = false;

    // Check for a value of 'red'
    Object.values(input).forEach((value) => {
      if (value === "red") red = true;
    });

    if (!red) {
      Object.values(input).forEach((value) => {
        checkForNumber(value);
      });
      return;
    }
  }

  if (Array.isArray(input)) {
    input.forEach((value) => {
      checkForNumber(value);
    });
    return;
  }

  if (typeof input === "string") {
    return;
  }

  if (typeof input === "number") {
    return (startNumber += input);
  }
}

checkForNumber(input);
console.log(startNumber);
