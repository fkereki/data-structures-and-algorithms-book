const { randomInt } = require("./random");

const floydSampleKofN = (k, n) => {
  const sample = [];
  for (let i = n - k; i <= n - 1; i++) {
    const j = randomInt(0, i + 1);
    sample.push(sample.includes(j) ? i : j);
  }
  return sample;
};

const floydSample = (arr, k) =>
  floydSampleKofN(k, arr.length).map((v) => arr[v]);

const logResults = require("./log_results_sample");
logResults(floydSample, 3, 6, 40_000);
logResults(floydSample, 5, 7, 40_000);
