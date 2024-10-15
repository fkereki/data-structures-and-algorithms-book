const quickSelect = require("../quickselect");

const qSelect = (arr, k, left = 0, right = arr.length - 1) => {
  const copy = [...arr];
  quickSelect(copy, k, left, right);
  return copy[k];
};

module.exports = qSelect;
