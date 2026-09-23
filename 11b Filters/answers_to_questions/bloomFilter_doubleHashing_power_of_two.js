const crypto = require("crypto");

const EPSILON = 0.01;
const LN2 = Math.log(2);
const LN2_SQ = LN2 * LN2;

const nextPowerOfTwo = (n) => 2 ** Math.ceil(Math.log2(n));

const newDoubleHashingBloomFilterPowerOfTwo = (n, eps = EPSILON) => {
  const b = nextPowerOfTwo(Math.ceil(-(n * Math.log(eps)) / LN2_SQ));
  const h = Math.max(1, Math.round((b / n) * LN2));

  return {
    b,
    h,
    bits: new Array(b).fill(false)
  };
};

const hashWithSeed = (value, seed, limit) =>
  crypto
    .createHash("sha256")
    .update(`${seed}:${value}`)
    .digest()
    .readUInt32BE(0) % limit;

const getIndices = (filter, value) => {
  const stringValue = String(value);
  const h1 = hashWithSeed(stringValue, 0, filter.b);
  const h2 = hashWithSeed(stringValue, 1, filter.b) | 1;

  return Array.from({ length: filter.h }, (_, i) => (h1 + i * h2) % filter.b);
};

const add = (filter, value) => {
  for (const idx of getIndices(filter, value)) {
    filter.bits[idx] = true;
  }
};

const find = (filter, value) =>
  getIndices(filter, value).every((idx) => filter.bits[idx] === true);

module.exports = {
  newDoubleHashingBloomFilterPowerOfTwo,
  add,
  find
};
