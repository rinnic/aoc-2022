import { defaultMaxListeners } from "events";
import { readFileSync } from "fs";

const input = readFileSync("2.in", "utf-8");

const paired = input.split("\n").map((row) => row.split(" "));

const choice = (row: string[]): number => {
  switch (row[1]) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
    default:
      return -1;
  }
};

const part1points = (row: string[]): number => {
  const n = row[0];
  const m = row[1];
  switch (n) {
    case "A":
      if (m === "X") return 3;
      else if (m === "Y") return 6;
      else return 0;
    case "B":
      if (m === "X") return 0;
      else if (m === "Y") return 3;
      else return 6;
    case "C":
      if (m === "X") return 6;
      else if (m === "Y") return 0;
      else return 3;
  }
  return -1
};

const part2points = (row: string[]): number => {
  const m = row[1];
  switch (m) {
    case "X": return 0
    case "Y": return 3
    case "Z": return 6
  }
  return -1
};

const makeChoice = (row: string[]): string[] => {
  const n = row[0];
  const m = row[1];
  let newM = "";
  switch (n) {
    case "A":
      if (m === "Z") newM = "Y";
      else if (m === "Y") newM = "X";
      else newM = "Z";
      break;
    case "B":
      if (m === "Z") newM = "Z";
      else if (m === "Y") newM = "Y";
      else newM = "X";
      break;
    case "C":
      if (m === "Z") newM = "X";
      else if (m === "Y") newM = "Z";
      else newM = "Y";
  }
  return [n, newM]
};

const part1 = paired.map(row => choice(row)).reduce((a,b) => a + b) +
              paired.map(row => part1points(row)).reduce((a,b) => a + b)


const part2 = paired.map(row => part2points(row)).reduce((a,b) => a + b) + 
              paired.map(row => makeChoice(row)).map(row => choice(row)).reduce((a,b) => a + b)


console.log("part1: ", part1)
console.log("part2: ", part2)


