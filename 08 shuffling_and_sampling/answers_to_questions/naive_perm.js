const { randomInt } = require("../random");

const naivePerm = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const j = randomInt(0, n);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/*
problema: tiene n^n formas de funcionar
pero n^n no es divisible entre n!
*/

const logResults = require("../log_results");
logResults(naivePerm, 4, 4000);
