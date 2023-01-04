import { readFileSync } from "fs";

const input = readFileSync("15.in", "utf-8").split("\n");

const manhattan = (p1: number[], p2: number[]): number => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};

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
const beacons: string[] = distances.map(pair => `${pair[1][0]};${pair[1][1]}`)
const map = new Set<string>();

distances.forEach(([[x1, y1], [x2, y2]]) => {
  const d = manhattan([x1, y1], [x2, y2]);
  for (let i = -d; i <= 0; i++) {
    if(y1+i != Y) continue
    const width = i + d;
    for (let j = -width; j <= width; j++) {
      if(beacons.includes(`${x1+j};${y1 + i}`) == false){
        map.add(`${x1+j};${y1 + i}`)
      }
    }
  }
  for (let i = d; i > 0; i--) {
    if(y1+i != Y) continue
    const width = d - i;
    for (let j = -width; j <= width; j++) {
      if(beacons.includes(`${x1+j};${y1 + i}`) == false){
        map.add(`${x1+j};${y1 + i}`)
      }
    }
  }
});

const part1 = map.size
console.log(part1)
