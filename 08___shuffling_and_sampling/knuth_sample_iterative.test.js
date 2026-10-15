const {
  orderedSample,
  orderedSample2
} = require("./knuth_sample_iterative");
const logResults = require("./log_results_sample");

logResults(orderedSample, 3, 6, 20_000, false);
console.log("---");
logResults(orderedSample2, 5, 7, 20_000, false);
