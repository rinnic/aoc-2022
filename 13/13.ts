import { readFileSync } from "fs";

let input = readFileSync("13.in", "utf-8");
const pairs = input.split("\n\n");

type Packet = (number | Packet)[];

const isDigit = (str: string) => {
  return str !== " " && !isNaN(Number(str));
};

const parseList = (str: string, from: number): [Packet, number] => {
  const lst: Packet = [];
  while (str[from] != "]") {
    from += 1;
    if (isDigit(str[from])) {
      let num = 0;
      while (isDigit(str[from])) {
        num = num * 10 + Number(str[from++]);
      }
      lst.push(num);
    } else if (str[from] === "[") {
      //it is a nested list
      const [sublist, newFrom] = parseList(str, from);
      lst.push(sublist);
      from = newFrom;
    }
  }
  return [lst, from + 1];
};

const arePacketsInOrder = (p1: Packet, p2: Packet): number => {
  if (p2.length === 0) {
    return p1.length === 0 ? 0 : 1;
  }
  if (p1.length === 0) {
    return p2.length === 0 ? 0 : -1;
  }
  const [e1, ...rest1] = p1;
  const [e2, ...rest2] = p2;

  let rec = 0;

  if (typeof e1 === "number" && typeof e2 === "number") {
    if (e1 > e2) rec = 1;
    else if (e1 < e2) rec = -1;
    else rec = arePacketsInOrder(rest1, rest2);
  } else if (typeof e1 === "number" && typeof e2 === "object") {
    rec = arePacketsInOrder([e1], e2);
  } else if (typeof e1 === "object" && typeof e2 === "number") {
    rec = arePacketsInOrder(e1, [e2]);
  } else if (typeof e1 === "object" && typeof e2 === "object") {
    rec = arePacketsInOrder(e1, e2);
  }
  return rec === 0 ? arePacketsInOrder(rest1, rest2) : rec;
};

let part1 = 0;

pairs.forEach((pair, i) => {
  const [p1, p2] = pair.split("\n");
  if (arePacketsInOrder(parseList(p1, 0)[0], parseList(p2, 0)[0]) === -1) {
    part1 += i + 1;
  }
});

let packets = input
  .split("\n")
  .filter((packet) => packet != "")
  .map((packet) => parseList(packet, 0)[0]);
packets = [[[2]], [[6]], ...packets].sort((p1, p2) =>
  arePacketsInOrder(p1, p2)
);

let part2 = 1;
packets.forEach((p, i) => {
  if (JSON.stringify(p) === "[[2]]" || JSON.stringify(p) === "[[6]]") {
    console.log(packets[i], i + 1);
    part2 *= i + 1;
  }
});

console.log("part1:", part1);
console.log("part2:", part2);
