const { randomBit } = require("./random");

const coinTossingShuffle = (arr, from = 0, to = arr.length - 1) => {
  const len = to - from + 1;
  if (len < 2) {
    // nothing to do
  } else if (len === 2) {
    if (randomBit()) {
      [arr[from], arr[to]] = [arr[to], arr[from]];
    }
  } else {
    /* len > 2 */
    // Invariants:
    // all 0s: from... ind0
    // all 1s: ind1...to
    // At end: ind0 === ind1 - 1
    let ind0 = from - 1;
    let ind1 = to + 1;
    let i = from;
    while (i < ind1) {
      if (randomBit()) {
        ind1--;
        [arr[i], arr[ind1]] = [arr[ind1], arr[i]];
      } else {
        ind0++;
        i++;
      }
    }

    coinTossingShuffle(arr, from, ind0);
    coinTossingShuffle(arr, ind1, to);
  }

  return arr;
};

const logResults = require("./log_results_shuffle");
logResults(coinTossingShuffle, 4, 4000);
