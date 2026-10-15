const {
  randomInt
} = require("../00___general_functions/random");

const singlePick = (arr, from = 0, to = arr.length - 1) =>
  arr[randomInt(from, to + 1)];

const singlePickAll = (arr) => arr[randomInt(0, arr.length)];

module.exports = { singlePick, singlePickAll };
