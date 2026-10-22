const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const MAX_SEEDS = 1000;

const fingerprintOf = (value, bits) =>
  hashWithSeed(value, 0) & ((1 << bits) - 1);

const h0 = (value, seed, s) =>
  hashWithSeed(value, 3 * seed + 1) % s;

const h1 = (value, seed, s) =>
  s + (hashWithSeed(value, 3 * seed + 2) % s);

const h2 = (value, seed, s) =>
  2 * s + (hashWithSeed(value, 3 * seed + 3) % s);

const indicesOf = (value, seed, s) => [
  h0(value, seed, s),
  h1(value, seed, s),
  h2(value, seed, s)
];

const createXorFilter = (items, eps = EPSILON) => {
  if (
    !Array.isArray(items) ||
    !Number.isFinite(eps) ||
    eps <= 0 ||
    eps >= 1
  ) {
    throw new Error("XOR filter: bad parameters");
  }

  const p = Math.ceil(Math.log2(1 / eps));
  if (p > 24) {
    throw new Error(
      "XOR filter: epsilon exceeds 24-bit fingerprint limit"
    );
  }

  if (items.length === 0) {
    return { p, seed: 0, s: 0, b: [] };
  }

  /* s = size of each of the three blocks */
  const s = Math.ceil((1.23 * items.length) / 3); /* +32 */

  for (let seed = 0; seed < MAX_SEEDS; seed++) {
    const indices = items.map((item) =>
      indicesOf(item, seed, s)
    );
    const itemCounts = new Uint32Array(3 * s);
    const xors = new Uint32Array(3 * s);

    indices.forEach((itemIndices, itemIndex) => {
      itemIndices.forEach((index) => {
        itemCounts[index]++;
        xors[index] ^= itemIndex;
      });
    });

    const queue = [];
    itemCounts.forEach((count, index) => {
      if (count === 1) {
        queue.push(index);
      }
    });

    const peeled = [];
    for (let head = 0; head < queue.length; head++) {
      const index = queue[head];
      if (itemCounts[index] === 1) {
        const itemIndex = xors[index];
        peeled.push([itemIndex, index]);
        for (const other of indices[itemIndex]) {
          itemCounts[other]--;
          xors[other] ^= itemIndex;
          if (itemCounts[other] === 1) {
            queue.push(other);
          }
        }
      }
    }

    if (peeled.length === items.length) {
      const b = new Uint32Array(3 * s);
      const mask = (1 << p) - 1;
      for (let j = peeled.length - 1; j >= 0; j--) {
        const [itemIndex, index] = peeled[j];
        let fp = fingerprintOf(items[itemIndex], p);
        indices[itemIndex].forEach((i) => {
          fp ^= b[i];
        });
        b[index] = (fp ^ b[index]) & mask;
      }

      return { p, seed, s, b };
    }
  }

  throw new Error(
    "XOR filter: could not construct a peelable filter"
  );
};

const find = (filter, value) => {
  if (filter.s === 0) return false;
  const [i1, i2, i3] = indicesOf(value, filter.seed, filter.s);
  return (
    fingerprintOf(value, filter.p) ===
    (filter.b[i1] ^ filter.b[i2] ^ filter.b[i3])
  );
};

module.exports = { createXorFilter, find };
