const { randomInt } = require("./random");

const reservoirSample = (arr, k) => {
  const n = arr.length;
  const sample = arr.slice(0, k);

  for (let i = k; i < n; i++) {
    const j = randomInt(0, i + 1);
    if (j < k) {
      sample[j] = arr[i];
    }
  }

  return sample;
};

const reservoirSample2 = (arr, k) => {
  const n = arr.length;
  for (let i = k; i < n; i++) {
    const j = randomInt(0, i + 1);
    if (j < k) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  return arr.slice(0, k);
};

const logResults = require("./log_results_sample");
logResults(reservoirSample, 4, 6);
logResults(reservoirSample2, 5, 7);
