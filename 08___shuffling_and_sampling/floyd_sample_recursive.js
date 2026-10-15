const {
  randomInt
} = require("../00___general_functions/random");

const floydSampleKofN = (k, n) => {
  if (k === 0) {
    return [];
  } else {
    const sample = floydSampleKofN(k - 1, n - 1);
    const j = randomInt(0, n);
    sample.push(sample.includes(j) ? n - 1 : j);
    return sample;
  }
};

const floydSample = (arr, k) =>
  floydSampleKofN(k, arr.length).map((v) => arr[v]);

module.exports = { floydSampleKofN, floydSample };
