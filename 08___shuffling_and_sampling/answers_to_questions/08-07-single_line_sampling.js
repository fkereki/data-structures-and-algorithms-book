const { randomInt } = require("../random");

const repeatedPick = (arr, k) =>
  Array(k)
    .fill(0)
    .map(() => arr[randomInt(0, arr.length)]);

const logResults = require("../log_results_sample");
logResults(repeatedPick, 3, 4, 60000, false);
logResults(repeatedPick, 2, 4, 60000, false);
