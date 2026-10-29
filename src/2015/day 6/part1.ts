import { input, testInput } from "./input.ts";

/**
 * Grid of 1000 * 1000 lights.
 * Instructions in data on switching lights. Instruction contains:
 *  - Coordinate pair to form a grid. (example: 0,0 to 10,10)
 *  - Action to perform on grid:
 *    - Turn on
 *    - Turn off
 *    - Toggle: Switch on/off based on current state.
 *
 * How many lights are lit at end of instructions?
 */

let lights = new Array(1000);

for (let i = 0; i < 1000; i++) {
  lights[i] = new Array(1000).fill(false);
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
        lights[y][x] = true;
      }
    }
  }

  if (action === "turnOff") {
    for (let y = startCoordinate.y; y <= endCoordinate.y; y++) {
      for (let x = startCoordinate.x; x <= endCoordinate.x; x++) {
        lights[y][x] = false;
      }
    }
  }

  if (action === "toggle") {
    for (let y = startCoordinate.y; y <= endCoordinate.y; y++) {
      for (let x = startCoordinate.x; x <= endCoordinate.x; x++) {
        lights[y][x] = !lights[y][x];
      }
    }
  }
});

const burningLights = () => {
  let turnedOn = 0;

  lights.forEach((row) => {
    row.forEach((light: boolean) => {
      if (light) {
        turnedOn++;
      }
    });
  });

  return turnedOn;
};

console.log(burningLights()); // 543903
