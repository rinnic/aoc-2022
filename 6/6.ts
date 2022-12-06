import { readFileSync } from "fs";

//part1
//const N = 4
const N = 14


const input = readFileSync("6.in", "utf-8").split("")

for(let i = N; i < input.length; i++) {
  const chunk = new Set(input.slice(i - N, i))
  //console.log(chunk)
  if(chunk.size == N) {
    console.log(i)
    break;
  }
}