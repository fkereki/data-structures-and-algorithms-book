const { randomInt } = require("./random");
const singlePickAll = (arr) => arr[randomInt(0, arr.length)];

const repeatedPick = (arr, k, from = 0, to = arr.length - 1) => {
  const sample = Array(k);
  for (let i = 0; i < k; i++) {
    sample[i] = arr[randomInt(from, to + 1)];
  }
  return sample;
};

const repeatedPickAll = (arr, k) => {
  const sample = Array(k);
  for (let i = 0; i < k; i++) {
    sample[i] = singlePickAll(arr);
  }
  return sample;
};

const logResults = require("./log_results_sample");
logResults(repeatedPick, 3, 4, 60000, false);
logResults(repeatedPickAll, 2, 4, 60000, false);
