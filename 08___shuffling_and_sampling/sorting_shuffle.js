const sortingShuffle = (arr) =>
  arr
    .map((v) => ({ val: v, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map((o) => o.val);

const logResults = require("./log_results_shuffle");
logResults(sortingShuffle, 0, 4, 4, 24000);
