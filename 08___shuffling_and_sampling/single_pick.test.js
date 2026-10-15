const { singlePick, singlePickAll } = require("./single_pick");
const logResults = require("./log_results_sample");

logResults(
  (arr, from, to) => [singlePick(arr, from, to)],
  3,
  7,
  20_000
);
logResults((arr) => [singlePickAll(arr)], 0, 9, 20_000);
