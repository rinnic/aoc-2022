import { readFileSync } from "fs";



const cave = new Map<string, string>();

const printCave = () => {
  for (let i = 0; i < 14; i++) {
    process.stdout.write(`${i}`);
    for (let j = 485; j < 510; j++) {
      if (cave.has(`${i},${j}`)) {
        process.stdout.write(cave.get(`${i},${j}`) || "");
      } else {
        process.stdout.write(".");
      }
    }
    console.log();
  }
}

const input = readFileSync("14.in", "utf-8").split("\n");

const paths = input.map((path) =>
  path.split(" -> ").map((pair) => pair.split(",").map((c) => parseInt(c)))
);
let maxDepth = 0;
//build the cave
for (const path of paths) {
  for (let i = 0; i < path.length - 1; i++) {
    if (path[i][1] > maxDepth) {
      maxDepth = path[i][1];
    }
    if (path[i][0] === path[i + 1][0]) {
      //vertical trace
      const start = path[i][1] < path[i + 1][1] ? path[i][1] : path[i + 1][1];
      const end = path[i][1] < path[i + 1][1] ? path[i + 1][1] : path[i][1];
      for (let row = start; row <= end; row++) {
        cave.set(`${row},${path[i][0]}`, "#");
      }
    } else {
      //orizzontal trace
      const start = path[i][0] < path[i + 1][0] ? path[i][0] : path[i + 1][0];
      const end = path[i][0] < path[i + 1][0] ? path[i + 1][0] : path[i][0];
      for (let col = start; col <= end; col++) {
        cave.set(`${path[i][1]},${col}`, "#");
      }
    }
  }
}

let ground = maxDepth + 2;
let part1 = 0;
let i = 0;
let j = 500;

while (i < maxDepth) {
  i = 0;
  j = 500;
  console.log(ground)
  let blocked = false;
  while (!blocked && i < maxDepth) {
    if (!cave.has(`${i + 1},${j}`)) {
      //step down
      i += 1;
    } else if (!cave.has(`${i + 1},${j - 1}`)) {
      //step left-down
      i += 1;
      j -= 1;
    } else if (!cave.has(`${i + 1},${j + 1}`)) {
      //step right-down
      i += 1;
      j += 1;
    } else {
      // stop
      cave.set(`${i},${j}`, "O");
      blocked = true;
    }
  }
  
  printCave()
  part1 += 1;
}




console.log("part1:", --part1);
