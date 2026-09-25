const { hashWithSeed } = require("../../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const LN2 = Math.log(2);
const LN2_SQ = LN2 * LN2;

const newStandardBloomFilter = (n, eps = EPSILON) => {
  const b = Math.ceil(-(n * Math.log(eps)) / LN2_SQ);
  const h = Math.max(1, Math.round((b / n) * LN2));
  const bits = new Array(b).fill(false);

  const getIndices = (value) =>
    Array.from({ length: h }, (_, i) => hashWithSeed(String(value), i) % b);

  const add = (value) => {
    for (const idx of getIndices(value)) {
      bits[idx] = true;
    }
  };

  const find = (value) =>
    getIndices(value).every((idx) => bits[idx] === true);

  return { add, find };
};

module.exports = { StandardBloomFilter: newStandardBloomFilter };
