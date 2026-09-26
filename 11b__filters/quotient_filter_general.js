const { hashWithSeed } = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const LN2 = Math.log(2);
const LN2_SQ = LN2 * LN2;
const HASH_BITS = 32;

const newQuotientFilter = (n, eps = EPSILON) => {
  const b = Math.ceil(-(n * Math.log(eps)) / LN2_SQ);
  const q = Math.max(1, Math.ceil(Math.log(b) / LN2));
  const s = Math.max(1, Math.ceil(b / q));
  const d = Math.max(1, Math.floor(2 ** HASH_BITS / s));

  return {
    b,
    q,
    d,
    slots: new Array(s).fill(null).map(() => [])
  };
};

const getIndices = (filter, value) =>
  Array.from(
    { length: filter.q },
    (_, i) => hashWithSeed(String(value), i) % filter.slots.length
  );

const getFingerprint = (filter, value) => {
  const fullHash = hashWithSeed(String(value), 0);
  const quotient = Math.floor(fullHash / filter.d);
  const remainder = fullHash % filter.d;

  return { quotient, remainder };
};

const add = (filter, value) => {
  const { quotient, remainder } = getFingerprint(filter, value);
  const bucket = filter.slots[quotient];

  if (!bucket.includes(remainder)) {
    bucket.push(remainder);
  }
};

const find = (filter, value) => {
  const { quotient, remainder } = getFingerprint(filter, value);
  const bucket = filter.slots[quotient];

  return bucket.includes(remainder);
};

const remove = (filter, value) => {
  const { quotient, remainder } = getFingerprint(filter, value);
  const bucket = filter.slots[quotient];

  filter.slots[quotient] = bucket.filter((entry) => entry !== remainder);
};

module.exports = { newQuotientFilter, add, find, remove };
