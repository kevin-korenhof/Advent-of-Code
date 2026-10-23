import { secretKey } from "./input.ts";
import crypto from "node:crypto";

/**
 * Same as part 1, but with 6 zero's.
 */

function createHash(input: string) {
  return crypto.createHash("md5").update(input).digest("hex");
}

function assertHash(hash: string): boolean {
  // should start with 5 zero's, otherwise it's false.
  return hash.slice(0, 6) === "000000";
}

let counter: number = 0;

while (!assertHash(createHash(`${secretKey}${counter}`))) {
  counter++;
}

console.log(counter);
