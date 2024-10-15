const fact = (n) => (n < 2 ? 1 : n * fact(n - 1));

const { randomInt } = require("./random");

const robsonShuffle = (arr, from = 0, to = arr.length - 1) => {
  const n = to - from + 1;
  let r = randomInt(0, fact(n));
  for (let i = n; i > 1; i--) {
    const q = r % i;
    [arr[from + i - 1], arr[from + q]] = [arr[from + q], arr[from + i - 1]];
    r = Math.floor(r / i);
  }
  return arr;
};

const logResults = require("./log_results_shuffle");
logResults(robsonShuffle, 3, 6, 9, 24000);
logResults(robsonShuffle, 0, 3, 4, 48000);

/*
const robsonShuffle = (arr, n = arr.length) => {
  let r = randomInt(0, fact(n));
  for (let i = n; i > 1; i--) {
    const q = r % i;
    [arr[i - 1], arr[q]] = [arr[q], arr[i - 1]];
    r = Math.floor(r / i);
  }
  return arr;
};
*/
