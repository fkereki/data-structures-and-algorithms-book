const { randomBit } = require("../random");

const naiveSortShuffle = (arr) => {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (randomBit()) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
  return arr;
};

const logResults = require("../log_results_shuffle");
logResults(naiveSortShuffle, 0, 4, 4, 20_000);
