const {
  randomInt
} = require("../00___general_functions/random");

const fisherYatesShuffle = (
  arr,
  from = 0,
  to = arr.length - 1
) => {
  for (let i = to + 1; i > from + 1; i--) {
    const j = randomInt(from, i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
};

const fisherYatesShuffle2 = (
  arr,
  from = 0,
  to = arr.length - 1
) => {
  for (let i = from; i < to; i++) {
    const j = randomInt(i, to + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

module.exports = { fisherYatesShuffle, fisherYatesShuffle2 };
