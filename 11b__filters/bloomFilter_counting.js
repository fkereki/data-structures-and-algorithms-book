const { hashWithSeed } = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const LN2 = Math.log(2);
const LN2_SQ = LN2 * LN2;

const newCountingBloomFilter = (n, eps = EPSILON) => {
  const b = Math.ceil(-(n * Math.log(eps)) / LN2_SQ);
  const h = Math.max(1, Math.round((b / n) * LN2));

  return {
    b,
    h,
    count: new Array(b).fill(0)
  };
};

const getIndices = (filter, value) =>
  Array.from(
    { length: filter.h },
    (_, i) => hashWithSeed(String(value), i) % filter.b
  );

const add = (filter, value) => {
  for (const idx of getIndices(filter, value)) {
    filter.count[idx]++;
  }
};

const find = (filter, value) =>
  getIndices(filter, value).every((idx) => filter.count[idx] > 0);

const remove = (filter, value) => {
  if (find(filter, value)) {
    for (const idx of getIndices(filter, value)) {
      filter.count[idx]--;
    }
  }
};

module.exports = {
  newCountingBloomFilter,
  add,
  find,
  remove
};
