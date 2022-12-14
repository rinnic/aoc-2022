
import { readFileSync } from "fs";
const hm = readFileSync("12.in", "utf-8")
  .split("\n")
  .map((row) => row.split(""));


//console.log(hm);

interface Coords {
  i: number;
  j: number;
}
const [iS, jS] = [20, 0]
const [iE, jE] = [20, 120]

let S: Coords = { i: iS, j: jS };
let E: Coords = { i: iE, j: jE };

const minPath = (from: Coords, map: string[][], mat: number[][]): number => {
  const _minPath = (from: Coords, visited: string[], steps = 0) => {
    //console.log("-----Sono in", from , "------")
    mat[from.i][from.j] = steps
    //console.log(`Metto ${steps} in (${from.i}, ${from.j})`)
    
    let iRange = [0];
    let jRange = [0];
    //checks for the borders
    if (from.i != 0) iRange = [-1, ...iRange];
    if (from.i != hm.length - 1) iRange = [...iRange, 1];
    if (from.j != 0) jRange = [-1, ...jRange];
    if (from.j != hm[0].length - 1) jRange = [...jRange, 1];
    //console.log(iRange, jRange)
    for (const x of iRange) {
      for (const y of jRange) {
        //console.log("bt from", from.i, from.j)
        if (Math.abs(x) != Math.abs(y)) {
          //console.log(`Sto controllando ${from.i + x}, ${from.j + y}`)
          //console.log("cache", cache)
          if (visited.indexOf(`${from.i + x};${from.j + y}`) == -1) {

            if (
              map[from.i + x][from.j + y].charCodeAt(0) -
                map[from.i][from.j].charCodeAt(0) <=
              1
            ) {
              //console.log(mat)
              //console.log(`${mat[from.i + x][from.j + y ]} > ${steps + 1} ? sono in ${from.i} ${from.j} controllo ${from.i + x} ${from.j + y} `)
              if(mat[from.i + x][from.j + y ] > steps + 1) {
                _minPath({ i: from.i + x, j: from.j + y }, [...visited, `${from.i};${from.j}`], steps + 1);
              }
            }
          }
        }
      }
    }
  };
  
  map[iS][jS] = 'a'
  map[iE][jE] = 'z'
  _minPath(from, [], 0)
  return mat[iE][jE];
};

let res = Infinity

for(let i = 0; i < hm.length; i++) {
  for(let j = 0; j < hm.length; j++) {
    if(hm[i][j] == 'a') {
      const mat = new Array(hm.length).fill(Infinity).map(row => new Array(hm[0].length).fill(Infinity))
      const partRes = minPath({i: i, j: j}, hm, mat)
      if(partRes < res) {
        res = partRes
      }
    }
  }
}
console.log(res)



