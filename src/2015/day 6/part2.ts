import { input, testInput } from "./input.ts";

/**
 * Grid of 1000 * 1000 lights.
 * Instructions in data on switching lights. Instruction contains:
 *  - Coordinate pair to form a grid. (example: 0,0 to 10,10)
 *  - Action to perform on grid:
 *    - Turn on: increase brightness by 1
 *    - Turn off: decrease brightness by 1, minimum of 0
 *    - Toggle: increase brightness by 2
 *
 * What is the total, combined brightness of all lights? Add them all up.
 */

let lights = new Array(1000);

for (let i = 0; i < 1000; i++) {
  lights[i] = new Array(1000).fill(0);
}

type Coordinates = {
  x: number;
  y: number;
};

type Instruction = {
  action: "turnOn" | "turnOff" | "toggle";
  startCoordinate: Coordinates;
  endCoordinate: Coordinates;
};

function splitCoordinates(rawInput: string): Coordinates {
  const splitInput = rawInput.split(",");

  return {
    x: Number(splitInput[0]),
    y: Number(splitInput[1]),
  };
}

function extractInstruction(rawInput: string): Instruction {
  const splitData = rawInput.split(" ");

  if (splitData.length > 4) {
    splitData.splice(0, 1);
  }

  const action = splitData[0] === "on" ? "turnOn" : splitData[0] === "off" ? "turnOff" : "toggle";

  const startCoordinate = splitCoordinates(splitData[1]!);
  const endCoordinate = splitCoordinates(splitData[3]!);

  return {
    action,
    startCoordinate,
    endCoordinate,
  };
}

const data = input.split("\n").map((rawData) => extractInstruction(rawData));

data.forEach(({ action, startCoordinate, endCoordinate }) => {
  if (action === "turnOn") {
    for (let y = startCoordinate.y; y <= endCoordinate.y; y++) {
      for (let x = startCoordinate.x; x <= endCoordinate.x; x++) {
        lights[y][x]++;
      }
    }
  }

  if (action === "turnOff") {
    for (let y = startCoordinate.y; y <= endCoordinate.y; y++) {
      for (let x = startCoordinate.x; x <= endCoordinate.x; x++) {
        if (lights[y][x] > 0) {
          lights[y][x]--;
        }
      }
    }
  }

  if (action === "toggle") {
    for (let y = startCoordinate.y; y <= endCoordinate.y; y++) {
      for (let x = startCoordinate.x; x <= endCoordinate.x; x++) {
        lights[y][x] = lights[y][x] + 2;
      }
    }
  }
});

const totalBrightness = () => {
  let brightness = 0;

  lights.forEach((row) => {
    row.forEach((light: number) => {
      brightness = brightness + light;
    });
  });

  return brightness;
};

console.log(totalBrightness());
