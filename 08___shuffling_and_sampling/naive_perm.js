const {
  randomInt
} = require("../00___general_functions/random");

const naivePerm = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const j = randomInt(0, n);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

module.exports = { naivePerm };
