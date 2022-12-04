import { readFileSync } from "fs";

const input = readFileSync("4.in", "utf-8").split("\n")

let part1 = 0;
let part2 = 0;
for(const line of input) {
  let [first, second] = line.split(",")
  let [a,b] = first.split("-").map(el => parseInt(el))
  let [c,d] = second.split("-").map(el => parseInt(el))
  if(a <= c && b >= d || a >= c && b <= d) part1++;
  if(a <= c && b >= c || c <= a && d >= a) part2++;
}
                                           
console.log("part1:", part1)
console.log("part2:", part2)