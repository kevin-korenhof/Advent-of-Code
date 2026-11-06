/**
 * add all number values from data.
 * Follow all down the path until the final 'value' is of type: Number, add that to total.
 * Ignore strings and empty array's/objects.
 *
 * What is total sum?
 */

/**
 * We can have different data types that each need other ways of handling:
 * Type =
 *  - number: add tot total.
 *  - string: Do nothing.
 *  - Object: iterate over key/value pairs.
 *  - Array: Iterate over each value in array.
 *
 * When iteration an object/array, it is again possible to get another object/array. Therefore we have 1 function to check type and handle the rest. When object/array, each iteration will run the same function again.
 *
 */
import { input } from "./input.ts";

let startNumber = 0;

function checkForNumber(input) {
  if (typeof input === "object") {
    Object.values(input).forEach((value) => {
      checkForNumber(value);
    });
    return;
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
