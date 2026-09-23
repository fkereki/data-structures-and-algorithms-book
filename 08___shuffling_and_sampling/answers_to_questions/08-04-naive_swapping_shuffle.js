const { randomInt } = require("../random");

const naiveSwappingShuffle = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const j = randomInt(0, n);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const logResults = require("../log_results_shuffle");
logResults(naiveSwappingShuffle, 0, 3, 3, 20_000);
