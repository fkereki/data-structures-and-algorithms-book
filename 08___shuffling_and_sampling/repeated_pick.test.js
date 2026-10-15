const {
  repeatedPick,
  repeatedPickAll
} = require("./repeated_pick");
const logResults = require("./log_results_sample");

logResults(repeatedPick, 3, 4, 60000, false);
logResults(repeatedPickAll, 2, 4, 60000, false);
