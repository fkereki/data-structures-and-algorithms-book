const { solve } = require("../send_more_money_puzzle");

const toGoOut = (g, o, u, t) => {
  if (t === 0 || g === 0 || o === 0) {
    return false;
  } else {
    const TO = Number(`${t}${o}`);
    const GO = Number(`${g}${o}`);
    const OUT = Number(`${o}${u}${t}`);
    return TO + GO === OUT;
  }
};

solve(toGoOut);
// SOLUTION:
// 21+81=102
