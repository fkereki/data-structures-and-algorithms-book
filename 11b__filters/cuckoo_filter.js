const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");

const {
  nextPowerOfTwo
} = require("../00___general_functions/nextPowerOfTwo");

const {
  randomInt
} = require("../00___general_functions/random");

const {
  singlePickAll
} = require("../08___shuffling_and_sampling/single_pick");

const EPSILON = 0.01;
const ALPHA = 0.9;
const MAX_KICKS = 500;

const createCuckooFilter = (n, eps = EPSILON) => {
  if (
    !Number.isInteger(n) ||
    n < 1 ||
    !Number.isFinite(eps) ||
    eps <= 0 ||
    eps >= 1
  ) {
    throw new Error("Cuckoo filter: bad parameters");
  }

  // 4 slots is the usual number; it could go up to 8 or 16
  const s = 4;
  const b = nextPowerOfTwo(n / (s * ALPHA));

  // A bucket with f fingerprint bits has a false-positive rate of about
  // 2 * bucketSize / 2^f. Round the bucket count up to a power of two so
  // the alternate-bucket calculation can use a mask.
  const p = Math.ceil(Math.log2((2 * s) / eps));
  if (p > 24) {
    throw new Error(
      "Cuckoo filter: epsilon exceeds 24-bit fingerprint limit"
    );
  }

  return {
    n,
    b,
    s,
    p,
    c: 0,
    buckets: Array.from({ length: b }, () => [])
  };
};

const fingerprintOf = (filter, item) =>
  hashWithSeed(item, 0) & ((1 << filter.p) - 1) || 1;

const hashBucket = (filter, item, seed) =>
  hashWithSeed(item, seed) % filter.b;

const index1 = (filter, item) => hashBucket(filter, item, 1);

const index2 = (filter, index1, fingerprint) =>
  index1 ^ hashBucket(filter, fingerprint, 2);

const twoBuckets = (filter, item) => {
  const fingerprint = fingerprintOf(filter, item);
  const i1 = index1(filter, item);
  return {
    fingerprint,
    indices: [i1, index2(filter, i1, fingerprint)]
  };
};

const add = (filter, item) => {
  if (filter.c + 1 > filter.n) {
    throw new Error("Cuckoo filter load limit reached");
  }

  const { fingerprint, indices } = twoBuckets(filter, item);
  for (const index of indices) {
    if (filter.buckets[index].length < filter.s) {
      filter.buckets[index].push(fingerprint);
      filter.c++;
      return true;
    }
  }

  // Save each bucket just before its first change, so failed relocation
  // only needs to restore buckets that were touched.
  const originalBuckets = new Map();

  let index = singlePickAll(indices);
  let carriedFingerprint = fingerprint;
  for (let kick = 0; kick < MAX_KICKS; kick++) {
    // Save the original bucket if it hasn't been saved yet.
    const bucket = filter.buckets[index];
    if (!originalBuckets.has(index)) {
      originalBuckets.set(index, bucket.slice());
    }

    const slot = randomInt(0, bucket.length);
    [carriedFingerprint, bucket[slot]] = [
      bucket[slot],
      carriedFingerprint
    ];
    index = index2(filter, index, carriedFingerprint);

    if (filter.buckets[index].length < filter.s) {
      filter.buckets[index].push(carriedFingerprint);
      filter.c++;
      return true;
    }
  }

  // No empty slot was found. Restore the touched buckets from their snapshots.
  for (const [bucketIndex, originalBucket] of originalBuckets) {
    filter.buckets[bucketIndex].splice(
      0,
      filter.buckets[bucketIndex].length,
      ...originalBucket
    );
  }
  return false;
};

const find = (filter, item) => {
  const {
    fingerprint,
    indices: [i1, i2]
  } = twoBuckets(filter, item);

  return (
    filter.buckets[i1].includes(fingerprint) ||
    filter.buckets[i2].includes(fingerprint)
  );
};

const remove = (filter, item) => {
  const { fingerprint, indices } = twoBuckets(filter, item);
  for (const index of indices) {
    const slot = filter.buckets[index].indexOf(fingerprint);
    if (slot !== -1) {
      filter.buckets[index].splice(slot, 1);
      filter.c--;
      return true;
    }
  }
  return false;
};

module.exports = {
  createCuckooFilter,
  add,
  find,
  remove
};
