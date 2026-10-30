import { testInput, input } from "./input.ts";

/**
 *
 * Run bitwise operations with wires as in instructions.
 *  check end value of for: a
 *
 * Take answer from part 1 (3176)and use that as input for wire b.
 */

const wires: Record<string, number> = {};

wires["1"] = 1;
const answerPart1 = 3176;

type BinaryOperation = {
  operationType: "AND" | "OR";
  connectedWires: [string, string];
};

type ShiftOperation = {
  operationType: "LSHIFT" | "RSHIFT";
  connectedWire: string;
  shift: number;
};

type InvertOperation = {
  operationType: "NOT";
  connectedWire: string;
};

type DirectValue = {
  operationType: "direct";
  value: number;
};

type Connection = {
  wire: string;
} & (BinaryOperation | ShiftOperation | DirectValue | InvertOperation);

const data = input.split("\n").map((rawConnectionInput): Connection => {
  const separatedStrings = rawConnectionInput.split(" ");

  // separatedStrings[1] can directly tell the operation type.
  switch (separatedStrings[1]) {
    case "->":
      return {
        wire: separatedStrings[2]!,
        operationType: "direct",
        value: Number(separatedStrings[0]),
      };

    case "AND":
      return {
        wire: separatedStrings[4]!,
        operationType: "AND",
        connectedWires: [separatedStrings[0]!, separatedStrings[2]!],
      };

    case "OR":
      return {
        wire: separatedStrings[4]!,
        operationType: "OR",
        connectedWires: [separatedStrings[0]!, separatedStrings[2]!],
      };

    case "LSHIFT":
      return {
        wire: separatedStrings[4]!,
        operationType: "LSHIFT",
        connectedWire: separatedStrings[0]!,
        shift: Number(separatedStrings[2]!),
      };

    case "RSHIFT":
      return {
        wire: separatedStrings[4]!,
        operationType: "RSHIFT",
        connectedWire: separatedStrings[0]!,
        shift: Number(separatedStrings[2]!),
      };

    default:
      return {
        wire: separatedStrings[3]!,
        operationType: "NOT",
        connectedWire: separatedStrings[1]!,
      };
  }
});

// Connect wires alphabetically

const sortByWire = data.sort((a, b) => {
  const wireA = a.wire;
  const wireB = b.wire;

  if (wireA.length < wireB.length) {
    return -1;
  }
  if (wireA.length > wireB.length) {
    return 1;
  } else {
    if (wireA < wireB) {
      return -1;
    } else {
      return 1;
    }
  }
});

sortByWire.forEach((connection) => {
  const { wire, operationType } = connection;

  if (wire === "b") {
    wires[wire] = answerPart1;
    return;
  }

  if (operationType === "direct") {
    wires[wire] = connection.value;
    return;
  }

  if (operationType === "AND") {
    wires[wire] = wires[connection.connectedWires[0]]! & wires[connection.connectedWires[1]]!;
    return;
  }

  if (operationType === "OR") {
    wires[wire] = wires[connection.connectedWires[0]]! | wires[connection.connectedWires[1]]!;
    return;
  }

  if (operationType === "RSHIFT") {
    wires[wire] = wires[connection.connectedWire]! >> connection.shift;
    return;
  }

  if (operationType === "LSHIFT") {
    wires[wire] = wires[connection.connectedWire]! << connection.shift;
    return;
  }

  if (operationType === "NOT") {
    wires[wire] = ~wires[connection.connectedWire]! & 0xffff;
    return;
  }
});

// 'a' is askded, but a is the same as 'lx'.
console.log(wires.lx); //3176
