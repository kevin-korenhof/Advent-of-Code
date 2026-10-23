import { secretKey } from "./input.ts";
import crypto from "node:crypto";

/**
 * Given that you have md5 hashes in hexadecimal:
 * has start with at least 5 zeroes in hexadecimal
 * Input to hash is secret key followed by a number in decimal.
 * Find the lowest number in decimal you get with your hash from the input.
 *
 * Example:
 * Key = abcdef
 * Answer = 609043
 * md5 hash of abcdef609043 is 000001dbbfa in hexa.
 */

function createHash(input: string) {
  return crypto.createHash("md5").update(input).digest("hex");
}

function assertHash(hash: string): boolean {
  // should start with 5 zero's, otherwise it's false.
  return hash.slice(0, 5) === "00000";
}

let counter: number = 0;

while (!assertHash(createHash(`${secretKey}${counter}`))) {
  counter++;
}

console.log(counter);
