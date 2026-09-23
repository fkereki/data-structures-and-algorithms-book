/* Algorithm S from section 3.4.2 of TAOCP */

const orderedSample = (arr, k) => {
  if (k === 0) {
    return [];
  } else if (Math.random() < k / arr.length) {
    return [arr[0], ...orderedSample(arr.slice(1), k - 1)];
  } else {
    return [...orderedSample(arr.slice(1), k)];
  }
};

const logResults = require("./log_results_sample");
logResults(orderedSample, 3, 6, 20_000, false);
console.log("---");
logResults(orderedSample, 5, 7, 20_000, false);
