const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const MAX_SEEDS = 1000;
const RIBBON_WIDTH = 32;
const WORD_MASK = 0xffffffffn;

const fingerprintOf = (value, bits) =>
  hashWithSeed(value, 0) & ((1 << bits) - 1);

const startOf = (value, seed, s) =>
  hashWithSeed(value, 3 * seed + 1) % (s - RIBBON_WIDTH + 1);

const coefficientsOf = (value, seed) =>
  hashWithSeed(value, 3 * seed + 2);

const lowestSetBit = (bits) => {
  let offset = 0;
  while ((bits & WORD_MASK) === 0n) {
    bits >>= 32n;
    offset += 32;
  }
  const lowWord = Number(bits & WORD_MASK);
  return offset + 31 - Math.clz32(lowWord & -lowWord);
};

/*
 * A ribbon row is a short run of coefficients in a binary linear system.
 * Elimination stores one equation per pivot column; BigInts hold the rows.
 */
const createRibbonFilter = (items, eps = EPSILON) => {
  if (
    !Array.isArray(items) ||
    !Number.isFinite(eps) ||
    eps <= 0 ||
    eps >= 1
  ) {
    throw new Error("Ribbon filter: bad parameters");
  }

  const p = Math.ceil(Math.log2(1 / eps));
  if (p > 24) {
    throw new Error(
      "Ribbon filter: epsilon exceeds 24-bit fingerprint limit"
    );
  }

  if (items.length === 0) {
    return { p, seed: 0, s: 0, width: RIBBON_WIDTH, b: [] };
  }

  /* Leave slack columns so the system is usually consistent and solvable. */
  const s = Math.ceil(1.23 * items.length) + RIBBON_WIDTH;
  const fingerprintMask = (1 << p) - 1;

  for (let seed = 0; seed < MAX_SEEDS; seed++) {
    const pivots = new Array(s);
    const pivotValues = new Uint32Array(s);
    let consistent = true;

    for (const item of items) {
      const start = startOf(item, seed, s);
      const coefficients = coefficientsOf(item, seed);
      let row = BigInt(coefficients) << BigInt(start);
      let value = fingerprintOf(item, p);

      while (row !== 0n) {
        const pivot = lowestSetBit(row);
        if (pivots[pivot] === undefined) {
          pivots[pivot] = row;
          pivotValues[pivot] = value;
          break;
        }
        row ^= pivots[pivot];
        value ^= pivotValues[pivot];
      }

      if (row === 0n && value !== 0) {
        consistent = false;
        break;
      }
    }

    if (consistent) {
      /* Back-substitute, choosing zero for columns without pivots. */
      const b = new Uint32Array(s);
      for (let pivot = s - 1; pivot >= 0; pivot--) {
        if (pivots[pivot] !== undefined) {
          let value = pivotValues[pivot];
          let remaining = pivots[pivot] >> BigInt(pivot + 1);
          while (remaining !== 0n) {
            const bit = lowestSetBit(remaining);
            value ^= b[pivot + 1 + bit];
            remaining &= remaining - 1n;
          }
          b[pivot] = value & fingerprintMask;
        }
      }

      return { p, seed, s, width: RIBBON_WIDTH, b };
    }
  }

  throw new Error(
    "Ribbon filter: could not construct a consistent filter"
  );
};

const find = (filter, value) => {
  if (filter.s === 0) return false;

  const start = startOf(value, filter.seed, filter.s);
  const coefficients = coefficientsOf(value, filter.seed);
  let fingerprint = 0;
  for (let bit = 0; bit < filter.width; bit++) {
    if ((coefficients >>> bit) & 1) {
      fingerprint ^= filter.b[start + bit];
    }
  }

  return fingerprintOf(value, filter.p) === fingerprint;
};

module.exports = { createRibbonFilter, find };
