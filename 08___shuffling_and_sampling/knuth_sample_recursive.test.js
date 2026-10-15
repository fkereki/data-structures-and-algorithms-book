const { orderedSample } = require("./knuth_sample_recursive");
const logResults = require("./log_results_sample");

logResults(orderedSample, 3, 6, 20_000, false);
console.log("---");
logResults(orderedSample, 5, 7, 20_000, false);
