const { floydShuffle } = require("./floyd_shuffle");
const logResults = require("./log_results_shuffle");

logResults(floydShuffle, 3, 6, 9, 48000);
