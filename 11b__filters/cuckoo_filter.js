const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const BUCKET_SIZE = 4;
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

  // A bucket with f fingerprint bits has a false-positive rate of about
  // 2 * bucketSize / 2^f. Round the bucket count up to a power of two so
  // the alternate-bucket calculation can use a mask.
  const fingerprintBits = Math.max(
    1,
    Math.ceil(Math.log2((2 * BUCKET_SIZE) / eps))
  );
  if (fingerprintBits > 24) {
    throw new Error(
      "Cuckoo filter: epsilon exceeds 24-bit fingerprint limit"
    );
  }
  const mask = (1 << fingerprintBits) - 1;
  const bucketCount = Math.max(
    2,
    2 **
      Math.ceil(Math.log2(Math.ceil(n / (BUCKET_SIZE * 0.95))))
  );

  return {
    n,
    mask,
    c: 0,
    buckets: Array.from({ length: bucketCount }, () => [])
  };
};

const fingerprintOf = (filter, item) => {
  const value = String(item);
  const index = hashWithSeed(value, 0) % filter.buckets.length;
  const fingerprint = hashWithSeed(value, 1) & filter.mask || 1;
  return {
    index,
    fingerprint
  };
};

const alternateIndex = (filter, index, fingerprint) => {
  const bucketCount = filter.buckets.length;
  const delta =
    hashWithSeed(String(fingerprint), 2) % bucketCount;
  return (index ^ delta) % bucketCount;
};

const candidateBuckets = (filter, item) => {
  const { index, fingerprint } = fingerprintOf(filter, item);
  const alternate = alternateIndex(filter, index, fingerprint);
  return { fingerprint, indices: [index, alternate] };
};

const add = (filter, item) => {
  if (filter.c + 1 > filter.n) {
    throw new Error("Cuckoo filter load limit reached");
  }

  const { fingerprint, indices } = candidateBuckets(
    filter,
    item
  );
  for (const index of indices) {
    if (filter.buckets[index].length < BUCKET_SIZE) {
      filter.buckets[index].push(fingerprint);
      filter.c++;
      return true;
    }
  }

  const originalBuckets = filter.buckets.map((bucket) =>
    bucket.slice()
  );
  let index =
    indices[Math.floor(Math.random() * indices.length)];
  let carriedFingerprint = fingerprint;
  for (let kick = 0; kick < MAX_KICKS; kick++) {
    const bucket = filter.buckets[index];
    const slot = Math.floor(Math.random() * bucket.length);
    [carriedFingerprint, bucket[slot]] = [
      bucket[slot],
      carriedFingerprint
    ];
    index = alternateIndex(filter, index, carriedFingerprint);

    if (filter.buckets[index].length < BUCKET_SIZE) {
      filter.buckets[index].push(carriedFingerprint);
      filter.c++;
      return true;
    }
  }

  // Failed relocation must leave the filter unchanged.
  for (
    let bucketIndex = 0;
    bucketIndex < filter.buckets.length;
    bucketIndex++
  ) {
    filter.buckets[bucketIndex].splice(
      0,
      filter.buckets[bucketIndex].length,
      ...originalBuckets[bucketIndex]
    );
  }
  return false;
};

const find = (filter, item) => {
  const { fingerprint, indices } = candidateBuckets(
    filter,
    item
  );
  return indices.some((index) =>
    filter.buckets[index].includes(fingerprint)
  );
};

const remove = (filter, item) => {
  const { fingerprint, indices } = candidateBuckets(
    filter,
    item
  );
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
  createCuckooFIlter: createCuckooFilter,
  add,
  find,
  remove
};
