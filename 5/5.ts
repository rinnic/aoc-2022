import { readFileSync } from "fs";

const [base, steps] = readFileSync("5.in", "utf-8").split("\n\n");
const lines = base.split("\n");
const rules = steps.split("\n");

const N = 9;

const stacks = new Map<number, string[]>();

lines.slice(0, lines.length - 1).forEach((line) => {
  for (let i = 0; i < N; i++) {
    const char = line.charAt(i * 4 + 1);
    if (char != " " && char != "") {
      stacks.set(i, [...(stacks.get(i) || []), char]);
    }
  }
});

rules.forEach((rule) => {
  const splitted = rule.split(" ");

  const n = parseInt(splitted[1]);
  const from = parseInt(splitted[3]);
  const to = parseInt(splitted[5]);
  let toList = stacks.get(to - 1);
  let fromList = stacks.get(from - 1);

  if (n == 1) {
    toList = stacks.get(to - 1);
    fromList = stacks.get(from - 1);
    const [el, ...rest] = fromList || [];
    stacks.set(from - 1, rest);
    toList = [el, ...(toList || [])];
    stacks.set(to - 1, toList);
  } else {
    // part 1
    // for(let i = 0; i < n; i++) {
    //   toList = stacks.get(to-1)
    //   fromList = stacks.get(from-1)
    //   const [el, ...rest] = fromList || []
    //   stacks.set(from-1, rest)
    //   toList = [el, ...toList||[]]
    //   stacks.set(to-1, toList)
    // }
    toList = stacks.get(to - 1);
    fromList = stacks.get(from - 1);
    const [el, ...rest] = fromList || [];
    const els = fromList?.slice(0, n);
    stacks.set(from - 1, fromList!.slice(n));
    toList = [...(els || []), ...(toList || [])];
    stacks.set(to - 1, toList);
  }
});

let res = "";
for (let i = 0; i < N; i++) {
  res += (stacks.get(i) || [])[0];
}
console.log("res:", res);
