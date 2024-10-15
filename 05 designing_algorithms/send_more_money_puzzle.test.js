const { solve } = require("./send_more_money_puzzle");

const sendMoreMoney = (s, e, n, d, m, o, r, y) => {
  if (s === 0 || m === 0) {
    return false;
  } else {
    const SEND = Number(`${s}${e}${n}${d}`);
    const MORE = Number(`${m}${o}${r}${e}`);
    const MONEY = Number(`${m}${o}${n}${e}${y}`);
    return SEND + MORE === MONEY;
  }
};

solve(sendMoreMoney);
// SOLUTION:  9 5 6 7 1 0 8 2 3 4
// 9567+1085=10652
