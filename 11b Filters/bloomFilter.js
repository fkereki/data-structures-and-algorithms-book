const crypto = require("crypto");

const EPSILON = 0.01;

/**
 * Formulas used:
 *   m = -(n * ln(EPSILON)) / (ln(2)^2)   -> bit array size
 *   k = (m / n) * ln(2)                  -> number of hash functions
 */
const newBloomFilter = (n, eps = EPSILON) => {
  const ln2 = Math.log(2);
  const m = Math.ceil(-(n * Math.log(eps)) / (ln2 * ln2));
  const k = Math.max(1, Math.round((m / n) * ln2));

  return {
    size: m,
    hashCount: k,
    bits: new Array(m).fill(false) // real booleans
  };
};

/**
 * Produces a SHA-256 hash of `value` combined with a seed,
 * then reduces it to a single unsigned 32-bit integer.
 *
 * @param {string} value
 * @param {number} seed
 * @returns {number}
 */
const hashWithSeed = (value, seed) =>
  crypto
    .createHash("sha256")
    .update(`${seed}:${value}`)
    .digest()
    .readUInt32BE(0);

/**
 * Computes the k array indices for a given value.
 *
 * @param {object} filter
 * @param {string} value
 * @returns {number[]} array of indices into filter.bits
 */
const getIndices = (filter, value) =>
  Array.from(
    { length: filter.hashCount },
    (_, i) => hashWithSeed(String(value), i) % filter.size
  );

/**
 * Adds an element to the Bloom filter.
 *
 * @param {object} filter - a filter created with newBloomFilter
 * @param {string} value - the element to add
 */
const add = (filter, value) => {
  for (const idx of getIndices(filter, value)) {
    filter.bits[idx] = true;
  }
};

/**
 * Checks whether an element MIGHT be in the filter.
 * False positives are possible; false negatives are not.
 *
 * @param {object} filter - a filter created with newBloomFilter
 * @param {string} value - the element to check
 * @returns {boolean} true if possibly present, false if definitely absent
 */
const find = (filter, value) =>
  getIndices(filter, value).every((idx) => filter.bits[idx] === true);

module.exports = { newBloomFilter, add, find };
