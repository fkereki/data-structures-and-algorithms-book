const { randomInt } = require("./random");

const fisherYatesShuffle = (arr, from = 0, to = arr.length - 1) => {
  for (let i = to + 1; i > from + 1; i--) {
    const j = randomInt(from, i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
};

const fisherYatesShuffle2 = (arr, from = 0, to = arr.length - 1) => {
  for (let i = from; i < to; i++) {
    const j = randomInt(i, to + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const logResults = require("./log_results_shuffle");
logResults(fisherYatesShuffle, 3, 6, 9, 20_000);
console.log("-----------");
logResults(fisherYatesShuffle2, 3, 6, 9, 20_000);
