const { randomInt } = require("./random");

const naivePerm = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const j = randomInt(0, n);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/*
it works in n^n ways, but
n^n isn't a multiple of n!
*/

const logResults = require("../log_results");
logResults(naivePerm, 4, 4000);
