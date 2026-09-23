const { randomInt } = require("./random");

const fisherYatesSample = (arr, k) => {
  const n = arr.length;
  for (let i = 0; i < k; i++) {
    const j = randomInt(i, n);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, k);
};

const logResults = require("./log_results_sample");
logResults(fisherYatesSample, 4, 6);
