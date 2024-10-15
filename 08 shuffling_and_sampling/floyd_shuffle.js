const { randomInt } = require("./random");

const floydShuffleN = (n) => {
  const result = [];

  for (let i = 0; i < n; i++) {
    const j = randomInt(0, i + 1);
    result.splice(j, 0, i);
  }
  return result;
};

const floydShuffle = (arr, from = 0, to = arr.length - 1) => {
  const sample = floydShuffleN(to - from + 1);
  const original = arr.slice(from, to + 1);
  sample.forEach((v, i) => (arr[from + i] = original[v]));
  return arr;
};

const logResults = require("./log_results_shuffle");
logResults(floydShuffle, 3, 6, 9, 48000);
