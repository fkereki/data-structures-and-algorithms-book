const {
  fisherYatesShuffle,
  fisherYatesShuffle2
} = require("./fisher_yates_shuffle");
const logResults = require("./log_results_shuffle");

logResults(fisherYatesShuffle, 3, 6, 9, 20_000);
console.log("-----------");
logResults(fisherYatesShuffle2, 3, 6, 9, 20_000);
