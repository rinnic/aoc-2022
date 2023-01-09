import { readFileSync } from "fs";

const input = readFileSync("15.in", "utf-8").split("\n");

const manhattan = (p1: number[], p2: number[]): number => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};

const reduceIntervals = (ints: number[][] | undefined): number[][] => {
  if(!ints) return []
  const sortedByStart = ints.sort((x, y) => x[0]-y[0])
  console.log(sortedByStart)
  let index = 0
  for(let i = 1; i < sortedByStart.length; i++) {
    if(sortedByStart[i][0] <= sortedByStart[index][1]) {
      sortedByStart[index][1] = Math.max(sortedByStart[index][1], sortedByStart[i][1])
    }
    else {
      index += 1
      sortedByStart[index] = sortedByStart[i]
    }
  }
  return sortedByStart.splice(0, index+1)


}

const distances: number[][][] = [];

input.forEach((row) => {
  const words = row.split(" ");

  distances.push([
    [
      parseInt(words[2].split("=")[1]),
      parseInt(words[3].split("=")[1]),
    ],
    [
      parseInt(words[8].split("=")[1]),
      parseInt(words[9].split("=")[1]),
    ],
  ]);
});

const Y = 2000000
const map = new Set<string>();
const ranges = new Map<number, number[][]>()

distances.forEach(([[x1, y1], [x2, y2]]) => {
  const d = manhattan([x1, y1], [x2, y2]);
  for (let i = -d; i <= 0; i++) {
    if(y1+i != Y) continue
    const width = i + d;
    const actual = ranges.get(y1+i)
    ranges.set(y1+i, actual ? [[x1-width,x1+width], ...actual] : [[x1-width,x1+width]])

  }
  for (let i = d; i > 0; i--) {
    if(y1+i != Y) continue
    const width = d - i;
    const actual = ranges.get(y1+i)
    ranges.set(y1+i, actual ? [[x1-width,x1+width], ...actual] : [[x1-width,x1+width]])
  }
});

const r = reduceIntervals(ranges.get(Y)) 
let part1 = 0
if(r) {
  for(const el of r) {
    part1 += el[1] - el[0]
  }
}



//part 2 idea
//represent the circles as interval instead as explicit set of coordinates
//find the row of the 4M * 4M grid with 399999 invalid spots

//to get the

// const part1 = map.size
console.log(part1)
