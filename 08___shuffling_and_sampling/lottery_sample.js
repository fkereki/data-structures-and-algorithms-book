const {
  randomInt
} = require("../00___general_functions/random");

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

module.exports = { lotterySample };
