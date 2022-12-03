import { readFileSync } from "fs";

const lines = readFileSync("3.in", "utf-8").split("\n");

let part1 = 0;
for (let line of lines) {
  const map = new Map<string, boolean>();
  const chars: string[] = [...line];
  for (let i = 0; i < line.length / 2; i++) {
    map.set(line.charAt(i), true);
  }
  for (let i = chars.length / 2; i < chars.length; i++) {
    if (map.has(line.charAt(i))) {
      const value = line.charCodeAt(i)
      part1 += value < 97 ? value - 64 + 26 : value - 96
      break;
    }
  }
}

console.log(part1);
