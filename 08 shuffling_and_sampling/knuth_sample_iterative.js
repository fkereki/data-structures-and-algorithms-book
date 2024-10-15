/* Algorithm S from section 3.4.2 of TAOCP */

const orderedSample = (arr, k) => {
  const n = arr.length;
  const sample = [];
  let toSelect = k;
  let toConsider = n;
  for (let i = 0; toSelect > 0; i++) {
    if (Math.random() < toSelect / toConsider) {
      sample.push(arr[i]);
      toSelect--;
    }
    toConsider--;
  }
  return sample;
};

const orderedSample2 = (arr, k) => {
  const n = arr.length;
  const sample = [];
  for (let i = 0; k > 0; i++) {
    if (Math.random() < k / (n - i)) {
      sample.push(arr[i]);
      k--;
    }
  }
  return sample;
};

const logResults = require("./log_results_sample");
logResults(orderedSample, 3, 6, 20_000, false);
console.log("---");
logResults(orderedSample2, 5, 7, 20_000, false);
