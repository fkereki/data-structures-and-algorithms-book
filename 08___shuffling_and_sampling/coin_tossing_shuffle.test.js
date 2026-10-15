const {
  coinTossingShuffle
} = require("./coin_tossing_shuffle");
const logResults = require("./log_results_shuffle");

logResults(coinTossingShuffle, 4, 4000);
