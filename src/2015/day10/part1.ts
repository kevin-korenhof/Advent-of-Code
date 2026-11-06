/**
 * look-and-say:
 * Look-and-say sequences are generated iteratively, using the previous value as input for the next step. For each step, take the previous value, and replace each run of digits (like 111) with the number of digits (3) followed by the digit itself (1).
 *
 * For example:
 *
 * 1 becomes 11 (1 copy of digit 1).
 * 11 becomes 21 (2 copies of digit 1).
 * 21 becomes 1211 (one 2 followed by one 1).
 * 1211 becomes 111221 (one 1, one 2, and two 1s).
 * 111221 becomes 312211 (three 1s, two 2s, and one 1).
 * Starting with the digits in your puzzle input, apply this process 40 times. What is the length of the result?
 *
 * Your puzzle input is 1321131112.
 */

const input = `1321131112`;
const totalIterations = 40;

let sequence = input;

const findRepetitionsRegex = /(\d)\1*/g;

function lookAndSayRegEx(input) {
  let answer = "";
  const solutionParts = input.match(findRepetitionsRegex);
  solutionParts.forEach((part) => {
    answer += part.length + part[0];
  });

  return answer;
}

for (let iteration = 1; iteration <= totalIterations; iteration++) {
  sequence = lookAndSayRegEx(sequence);
}

console.log(sequence.length);
