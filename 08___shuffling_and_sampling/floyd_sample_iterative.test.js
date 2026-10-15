const { floydSample } = require("./floyd_sample_iterative");
const logResults = require("./log_results_sample");

logResults(floydSample, 3, 6, 40_000);
logResults(floydSample, 5, 7, 40_000);
