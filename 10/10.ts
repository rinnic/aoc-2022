import { readFileSync } from "fs";

const prg = readFileSync("10.in", "utf-8").split("\n");

let part1 = 0;

let cycles = new Set([20, 60, 100, 140, 180, 220]);
let x = 1;
let pc = 1;
let sprite = [0, 1, 2];
const N = 40;
const display = new Map<string, string>();

for (const cmd of prg) {
  let val = 0;
  for (let i = 0; i < 2; i++) {
    let pcj = (pc - 1) % N;
    let pci = Math.floor((pc - 1) / N);

    if (sprite.indexOf(pcj) != -1) {
      display.set(`${pci};${pcj}`, "#");
    } else {
      display.set(`${pci};${pcj}`, " ");
    }
    pc += 1;
    if (cycles.has(pc)) {
      part1 += x * pc;
    }
    if (cmd === "noop") {
      break;
    } else if (i == 1) {  // i == 0 for part 1
      val = parseInt(cmd.split(" ")[1]);
      x += val;
      sprite = [x - 1, x, x + 1];
    }
  }
}

//console.log(part1);
for(let i = 0; i < 6; i++) {
  for(let j = 0; j < N; j++) {
    process.stdout.write(display.get(`${i};${j}`) || "")
  }
  console.log()
}
