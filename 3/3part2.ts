import { readFileSync } from "fs";

const lines = readFileSync("3.in", "utf-8").split("\n");

let part2 = 0;
const map = new Map<string, number>();
let i = 0;
for (let line  of lines) {
  console.log(line)
  if(i % 3 == 0) {
    map.forEach((val, key) => {
      if(val === 3) {
        const value = key.charCodeAt(0)
        part2 += value < 97 ? value - 64 + 26 : value - 96
      }
    })
    map.clear()
  }
  const lineSet = new Set([...line])
  lineSet.forEach( el => {
    map.set(el, (map.get(el) || 0) + 1)
  })
  i++;
}
map.forEach((val, key) => {
  if(val === 3) {
    const value = key.charCodeAt(0)
    part2 += value < 97 ? value - 64 + 26 : value - 96
  }
})
console.log(part2);
