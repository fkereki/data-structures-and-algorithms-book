const { robsonShuffle } = require("./robson_shuffle");
const logResults = require("./log_results_shuffle");

logResults(robsonShuffle, 3, 6, 9, 24000);
logResults(robsonShuffle, 0, 3, 4, 48000);
