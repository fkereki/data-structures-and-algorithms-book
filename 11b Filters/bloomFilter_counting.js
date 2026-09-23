const crypto = require("crypto");

const EPSILON = 0.01;
const LN2 = Math.log(2);
const LN2_SQ = LN2 * LN2;

const newCountingBloomFilter = (n, eps = EPSILON) => {
  const b = Math.ceil(-(n * Math.log(eps)) / LN2_SQ);
  const h = Math.max(1, Math.round((b / n) * LN2));

  return {
    b,
    h,
    bits: new Array(b).fill(0)
  };
};

const hashWithSeed = (value, seed, limit) =>
  crypto
    .createHash("sha256")
    .update(`${seed}:${value}`)
    .digest()
    .readUInt32BE(0) % limit;

const getIndices = (filter, value) =>
  Array.from({ length: filter.h }, (_, i) =>
    hashWithSeed(String(value), i, filter.size)
  );

const add = (filter, value) => {
  for (const idx of getIndices(filter, value)) {
    filter.bits[idx]++;
  }
};

const find = (filter, value) =>
  getIndices(filter, value).every((idx) => filter.bits[idx] > 0);

const removeWithCheck = (filter, value) => {
  if (find(filter, value)) {
    for (const idx of getIndices(filter, value)) {
      if (filter.bits[idx] > 0) {
        filter.bits[idx]--;
      }
    }
  }
};

const remove = (filter, value) => {
  for (const idx of getIndices(filter, value)) {
    if (filter.bits[idx] > 0) {
      filter.bits[idx]--;
    }
  }
};

module.exports = { newCountingBloomFilter, add, find };
