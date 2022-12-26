import { readFileSync } from "fs";

const input = readFileSync("15.in", "utf-8").split("\n");

const distances: number[][][] = [];

input.forEach((row) => {
  const words = row.split(" ");
  distances.push([
    [
      parseInt(words[2].match(/\d+/g)?.at(0) || "0"),
      parseInt(words[3].match(/\d+/g)?.at(0) || "0"),
    ],
    [
      parseInt(words[8].match(/\d+/g)?.at(0) || "0"),
      parseInt(words[9].match(/\d+/g)?.at(0) || "0"),
    ],
  ]);
});

console.log(distances);
