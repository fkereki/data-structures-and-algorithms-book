const { randomInt } = require("./random");

const singlePick = (arr, from = 0, to = arr.length - 1) =>
  arr[randomInt(from, to + 1)];

const singlePickAll = (arr) => arr[randomInt(0, arr.length)];

const logResults = require("./log_results_sample");
logResults((arr, from, to) => [singlePick(arr, from, to)], 3, 7, 20_000);
logResults((arr) => [singlePickAll(arr)], 0, 9, 20_000);
