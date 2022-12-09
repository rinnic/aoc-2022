import { readFileSync } from "fs";

const lines = readFileSync("9.in", "utf-8").split("\n");
const N = 10;
//head = pos[0], tail = pos[9]
let pos = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

let hx = 0;
let hy = 0;
let tx = 0;
let ty = 0;

const part1 = new Set<string>(["0;0"]);
const part2 = new Set<string>(["0;0"]);

for (const line of lines) {
  const [dir, n] = line.split(" ");
  const steps = parseInt(n);
  //console.log(`vado verso ${dir} di ${steps} passi`)
  for (let i = 0; i < steps; i++) {
    console.log(pos);
    let oldPos = JSON.parse(JSON.stringify(pos));
    let oldhx = hx;
    let oldhy = hy;
    switch (dir) {
      case "U":
        hy += 1;
        pos[0][1] += 1;
        break;
      case "D":
        hy -= 1;
        pos[0][1] -= 1;
        break;
      case "R":
        hx += 1;
        pos[0][0] += 1;
        break;
      case "L":
        hx -= 1;
        pos[0][0] -= 1;
        break;
    }
    for (let j = 1; j < N; j++) {
      // if (Math.abs(pos[j][0] - pos[j - 1][0]) > 1 || Math.abs(pos[j][1] - pos[j - 1][1]) > 1) {
      //   pos[j][0] = oldPos[j - 1][0];
      //   pos[j][1] = oldPos[j - 1][1];
      //   part2.add(`${pos[N - 1][0]};${pos[N - 1][1]}`);
      // }
      if (
        (pos[j][0] - pos[j - 1][0] == -1 && pos[j][1] - pos[j - 1][1] == -2) ||
        (pos[j][0] - pos[j - 1][0] == -2 && pos[j][1] - pos[j - 1][1] == -1)
      ) {
        pos[j][0] += 1;
        pos[j][1] += 1;
      }
      if (
        (pos[j][0] - pos[j - 1][0] == 2 && pos[j][1] - pos[j - 1][1] == -1) ||
        (pos[j][0] - pos[j - 1][0] == 1 && pos[j][1] - pos[j - 1][1] == -2)
      ) {
        pos[j][0] -= 1;
        pos[j][1] += 1;
      }
      if (
        (pos[j][0] - pos[j - 1][0] == 2 && pos[j][1] - pos[j - 1][1] == 1) ||
        (pos[j][0] - pos[j - 1][0] == 1 && pos[j][1] - pos[j - 1][1] == 2)
      ) {
        pos[j][0] -= 1;
        pos[j][1] -= 1;
      }
      if (
        (pos[j][0] - pos[j - 1][0] == -1 && pos[j][1] - pos[j - 1][1] == 2) ||
        (pos[j][0] - pos[j - 1][0] == -2 && pos[j][1] - pos[j - 1][1] == 1)
      ) {
        pos[j][0] += 1;
        pos[j][1] -= 1;
      }
      if (pos[j][0] - pos[j - 1][0] == -2 && pos[j][1] - pos[j - 1][1] == -2){
        pos[j][0] += 1;
        pos[j][1] += 1;
      }
      if (pos[j][0] - pos[j - 1][0] == -2 && pos[j][1] - pos[j - 1][1] == 2){
        pos[j][0] += 1;
        pos[j][1] -= 1;
      }
      if (pos[j][0] - pos[j - 1][0] == 2 && pos[j][1] - pos[j - 1][1] == -2){
        pos[j][0] -= 1;
        pos[j][1] += 1;
      }
      if (pos[j][0] - pos[j - 1][0] == 2 && pos[j][1] - pos[j - 1][1] == 2){
        pos[j][0] -= 1;
        pos[j][1] -= 1;
      }

      if (pos[j][0] == pos[j-1][0]) {
        if(pos[j][1] - pos[j - 1][1] == 2)
          pos[j][1] -= 1;
        else if(pos[j][1] - pos[j - 1][1] == -2) {
          pos[j][1] += 1;
        }
      }
      if (pos[j][1] == pos[j-1][1]) {
        if(pos[j][0] - pos[j - 1][0] == 2)
          pos[j][0] -= 1;
        else if(pos[j][0] - pos[j - 1][0] == -2) {
          pos[j][0] += 1;
        }
      }
      part2.add(`${pos[N - 1][0]};${pos[N - 1][1]}`);
    }
    if (Math.abs(hx - tx) > 1 || Math.abs(hy - ty) > 1) {
      tx = oldhx;
      ty = oldhy;
      part1.add(`${tx};${ty}`);
    }
  }
}
console.log("part1:", part1.size);
console.log("part2:", part2.size);
