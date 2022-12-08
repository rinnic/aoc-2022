import { readFileSync } from "fs";

const input = readFileSync("8.in", "utf-8")
  .split("\n")
  .map((row) => row.split("").map(el => parseInt(el)));

let part1 = input.length * 4 - 4;
let part2 = 0

const getColumn = (grid: number[][], column: number): number[] => {
  return grid.map(row => row[column])
}

const rowScore = (row: number[], n: number): number => {
  let res = 0
  for(let i = 0; i < row.length; i++) {
    if(row[i] >= n) {
      res+=1
      break
    }
    res += 1
  }
  return res
}

for (let i = 1; i < input.length - 1; i++) {
  for (let j = 1; j < input.length - 1; j++) {
    //part 1
    let visible = false;
    visible ||= input[i].slice(0, j).every(tree => tree < input[i][j])
    visible ||= input[i].slice(j + 1).every(tree => tree < input[i][j]);
    visible ||= getColumn(input, j).slice(0, i).every(tree => tree < input[i][j]);
    visible ||= getColumn(input, j).slice(i + 1).every(tree => tree < input[i][j]);
    if(visible) {
      part1 += 1
    }

    let score = 1;
    score *= rowScore(input[i].slice(0, j).reverse(), input[i][j])
    score *= rowScore(input[i].slice(j + 1), input[i][j])
    score *= rowScore(getColumn(input, j).slice(0, i).reverse(), input[i][j])
    score *= rowScore(getColumn(input, j).slice(i + 1), input[i][j])
    if(score > part2) {
      part2 = score
    }
  }
}

console.log("part1:", part1)
console.log("part2:", part2)