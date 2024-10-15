const { randomInt } = require("./random");

const lotterySample = (arr, k) => {
  const n = arr.length;
  const sample = Array(k);

  for (let i = 0; i < k; i++) {
    const j = randomInt(0, n - i);
    sample[i] = arr[j];
    arr[j] = arr[n - i - 1];
  }

  return sample;
};

const logResults = require("./log_results_sample");
logResults(lotterySample, 2, 7, 20_000);
