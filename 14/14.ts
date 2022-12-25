import { readFileSync } from "fs";

const cave = new Map<string, string>();

const input = readFileSync("14.in", "utf-8").split("\n");

const paths = input.map((path) =>
  path.split(" -> ").map((pair) => pair.split(",").map((c) => parseInt(c)))
);
console.log(paths);
let maxDepth = 0
//build the cave
for (const path of paths) {
  for (let i = 0; i < path.length - 1; i++) {
    if(path[i][1] > maxDepth) {
      maxDepth = path[i][1]
    }
    if (path[i][0] === path[i + 1][0]) {
      //vertical trace
      const start = path[i][1] < path[i+1][1] ? path[i][1] : path[i+1][1]
      const end = path[i][1] < path[i+1][1] ? path[i+1][1] : path[i][1]
      for (let row = start; row <= end; row++) {
        cave.set(`${row},${path[i][0]}`, "#");
      }
    } else {
      //orizzontal trace
      const start = path[i][0] < path[i+1][0] ? path[i][0] : path[i+1][0]
      const end = path[i][0] < path[i+1][0] ? path[i+1][0] : path[i][0]
      for (let col = start; col <= end; col++) {
        cave.set(`${path[i][1]},${col}`, "#");
      }
    }
  }
}

// for(let i = 0; i < 10; i++) {
//   for(let j = 493; j < 504; j++) {
//     if(cave.has(`${i},${j}`)) {
//       process.stdout.write("#");
//     } else {
//       process.stdout.write(".");
//     }
//   }
//   console.log()
// }
