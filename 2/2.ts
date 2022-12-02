import { readFileSync } from "fs";

const input = readFileSync("2.in", "utf-8");

const choiceDict1 = new Map<string, number>([
  ["X", 1],
  ["Y", 2],
  ["Z", 3]
])

const pointDict1 = new Map<string, number>([
  ["A X", 3], ["A Y", 6], ["A Z", 0],
  ["B X", 0], ["B Y", 3], ["B Z", 6],
  ["C X", 6], ["C Y", 0], ["C Z", 3]
])

const pointDict2 = new Map<string, number>([
  ["X", 0],
  ["Y", 3],
  ["Z", 6]
])

const choiceDict2 = new Map<string, number>([
  ["A X", 3], ["A Y", 1], ["A Z", 2],
  ["B X", 1], ["B Y", 2], ["B Z", 3],
  ["C X", 2], ["C Y", 3], ["C Z", 1]
])

let part1 = 0
input.split("\n").forEach((el) => {
  part1 +=  (pointDict1.get(el) || 0) + (choiceDict1.get(el.split(" ")[1]) || 0)
})

let part2 = 0
input.split("\n").forEach((el) => {
  part2 +=  (pointDict2.get(el.split(" ")[1]) || 0) + (choiceDict2.get(el) || 0)
})

console.log("part1:", part1)
console.log("part2:", part2)