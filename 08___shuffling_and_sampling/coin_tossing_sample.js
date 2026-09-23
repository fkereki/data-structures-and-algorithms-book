const { randomBit } = require("./random");

const coinTossingSample = (arr, k, from = 0, to = arr.length - 1) => {
  if (k > to - from + 1) {
    return [];
  } else {
    // Invariants:
    // all 0s: from... ind0
    // all 1s: ind1...to
    // At end: ind0 === ind1 - 1

    let ind0 = from - 1;
    let ind1 = to + 1;
    for (let i = from; i < ind1; ) {
      if (randomBit()) {
        ind1--;
        [arr[i], arr[ind1]] = [arr[ind1], arr[i]];
      } else {
        ind0++;
        i++;
      }
    }

    const len0 = ind0 - from + 1;
    const len1 = to - ind1 + 1;

    if (len0 === k) {
      return arr.slice(from, ind0 + 1);
    } else if (len1 === k) {
      return arr.slice(ind1, to + 1);
    } else if (len0 > k) {
      return coinTossingSample(arr, k, from, ind0);
    } else if (len1 > k) {
      return coinTossingSample(arr, k, ind1, to);
    } else {
      return [
        ...arr.slice(from, ind0 + 1),
        ...coinTossingSample(arr, k - len0, ind1, to)
      ];
    }
  }
};

const logResults = require("./log_results_sample");
logResults(coinTossingSample, 4, 6);
logResults(coinTossingSample, 5, 7);
