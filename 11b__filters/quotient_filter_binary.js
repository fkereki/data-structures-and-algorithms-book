/*
 * Quotient filters store fingerprints of values in a table of slots.
 * A value is hashed, then split into two parts: a quotient and a remainder.
 * The quotient selects a bucket, while the remainder is stored in that bucket.
 *
 * This implementation keeps the same overall style as the Bloom filter files:
 * it uses SHA-256 with a seed, derives a deterministic index, and exposes the
 * usual add/find/remove operations. The code is intentionally simple and meant
 * to illustrate the idea rather than provide a production-grade quotient filter.
 *
 * In a true quotient filter, the table is organized so that entries can be
 * inserted, found, and removed by looking at the quotient bucket and then
 * scanning neighboring slots using the remainders. Here, we keep the same
 * conceptual idea in a compact array-of-buckets form to make the code easy to
 * read and follow.
 */

const crypto = require("crypto");

const EPSILON = 0.01;
const LN2 = Math.log(2);
const LN2_SQ = LN2 * LN2;
const HASH_BITS = 32;

const newQuotientFilter = (n, eps = EPSILON) => {
  const b = Math.ceil(-(n * Math.log(eps)) / LN2_SQ);
  const q = Math.max(1, Math.ceil(Math.log2(b)));
  const r = Math.max(1, 32 - q);

  return {
    b,
    q,
    r,
    slots: new Array(1 << q).fill(null).map(() => [])
  };
};

const hashWithSeed = (value, seed, limit) =>
  crypto
    .createHash("sha256")
    .update(`${seed}:${value}`)
    .digest()
    .readUInt32BE(0) % limit;

const getIndices = (filter, value) =>
  Array.from({ length: filter.q }, (_, i) =>
    hashWithSeed(String(value), i, 1 << filter.q)
  );

const getFingerprint = (filter, value) => {
  const fullHash = hashWithSeed(String(value), 0, 2 ** HASH_BITS);
  const quotient = fullHash >> filter.r;
  const remainder = fullHash & ((1 << filter.r) - 1);

  return { quotient, remainder };
};

const add = (filter, value) => {
  const { quotient, remainder } = getFingerprint(filter, value);
  const bucket = filter.slots[quotient] || [];

  if (!bucket.includes(remainder)) {
    bucket.push(remainder);
    filter.slots[quotient] = bucket;
  }
};

const find = (filter, value) => {
  const { quotient, remainder } = getFingerprint(filter, value);
  const bucket = filter.slots[quotient] || [];

  return bucket.includes(remainder);
};

const remove = (filter, value) => {
  const { quotient, remainder } = getFingerprint(filter, value);
  const bucket = filter.slots[quotient] || [];

  filter.slots[quotient] = bucket.filter((entry) => entry !== remainder);
};

module.exports = { newQuotientFilter, add, find, remove };
