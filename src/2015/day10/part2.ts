/**
 * Same as part 1, but with 50 iterations
 */

const input = `1321131112`;
const totalIterations = 50;

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
