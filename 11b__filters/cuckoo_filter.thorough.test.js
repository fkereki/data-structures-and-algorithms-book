/*
 * Thorough cuckoo-filter coverage using a 16-item filter:
 * - Check bucket capacities, stored fingerprints, item count, and find() results
 *   after every add and remove.
 * - Exercise empty and singleton filters, duplicate values, absent removals,
 *   and repeated deletion.
 * - Fill both buckets available to a set of fingerprints, force relocation to
 *   fail, and verify that the failed add leaves every bucket unchanged.
 * - Fill to the configured item limit, verify an over-capacity add is
 *   rejected without mutation, then drain the filter.
 * - Run a deterministic sequence of mixed additions and removals, validating
 *   structure and membership after each operation.
 */
const assert = require("assert");

const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");

const {
  createCuckooFilter,
  add,
  find,
  remove
} = require("./cuckoo_filter");

const FILTER_CAPACITY = 16;
const BUCKET_SIZE = 4;
const itemCache = new Map();
const usedFingerprints = new Set();

const fingerprintOf = (filter, item) => {
  const value = String(item);
  const rawFingerprint =
    (hashWithSeed(value, 1) & ((1 << filter.p) - 1)) >>> 0;
  return {
    index: hashWithSeed(value, 0) % filter.b,
    fingerprint: rawFingerprint || 1
  };
};

const alternateIndex = (filter, index, fingerprint) => {
  const delta = hashWithSeed(String(fingerprint), 2) % filter.b;
  return (index ^ delta) % filter.b;
};

const candidateBuckets = (filter, item) => {
  const { index, fingerprint } = fingerprintOf(filter, item);
  return [index, alternateIndex(filter, index, fingerprint)];
};

const makeFilter = () => {
  const filter = createCuckooFilter(FILTER_CAPACITY, 0.01);
  assert.strictEqual(filter.b, 8);
  assert(!Object.hasOwn(filter, "mask"));
  assert.strictEqual(filter.c, 0);
  return filter;
};

const runFingerprintWidthScenario = () => {
  const maximumEpsilon = (2 * BUCKET_SIZE) / 2 ** 24;
  const maximumWidthFilter = createCuckooFilter(
    FILTER_CAPACITY,
    maximumEpsilon
  );
  assert.strictEqual(maximumWidthFilter.p, 24);
  assert.throws(
    () =>
      createCuckooFilter(FILTER_CAPACITY, maximumEpsilon / 2),
    /24-bit fingerprint limit/
  );
};

const itemForPair = (filter, first, second, label) => {
  const key = `${first}:${second}:${label}`;
  if (itemCache.has(key)) return itemCache.get(key);

  for (let candidateNumber = 0; ; candidateNumber++) {
    const candidate = `cuckoo-${label}-${candidateNumber}`;
    const { index, fingerprint } = fingerprintOf(
      filter,
      candidate
    );
    const alternate = alternateIndex(
      filter,
      index,
      fingerprint
    );
    if (
      ((index === first && alternate === second) ||
        (index === second && alternate === first)) &&
      !usedFingerprints.has(fingerprint)
    ) {
      usedFingerprints.add(fingerprint);
      itemCache.set(key, candidate);
      return candidate;
    }
  }
};

const itemWithUniqueFingerprint = (filter, label) => {
  for (let candidateNumber = 0; ; candidateNumber++) {
    const candidate = `cuckoo-${label}-${candidateNumber}`;
    const { fingerprint } = fingerprintOf(filter, candidate);
    if (!usedFingerprints.has(fingerprint)) {
      usedFingerprints.add(fingerprint);
      return candidate;
    }
  }
};

const assertStructureAndContents = (
  filter,
  model,
  candidates,
  label
) => {
  const context = ` after ${label}`;
  const modelCount = [...model.values()].reduce(
    (sum, count) => sum + count,
    0
  );
  assert.strictEqual(
    filter.c,
    modelCount,
    `count mismatch${context}`
  );
  assert(filter.c <= filter.n, `capacity exceeded${context}`);
  assert.strictEqual(filter.b, 8);

  let physicalEntryCount = 0;
  for (let index = 0; index < filter.b; index++) {
    const bucket = filter.buckets[index];
    assert(
      bucket.length <= BUCKET_SIZE,
      `bucket ${index} overfull${context}`
    );
    for (const fingerprint of bucket) {
      physicalEntryCount++;
      assert(Number.isInteger(fingerprint));
      assert(
        fingerprint > 0 && fingerprint <= (1 << filter.p) - 1,
        `fingerprint out of range in bucket ${index}${context}`
      );
    }
  }
  assert.strictEqual(
    physicalEntryCount,
    modelCount,
    `physical entry count mismatch${context}`
  );

  for (const candidate of candidates) {
    assert.strictEqual(
      find(filter, candidate),
      (model.get(candidate) || 0) > 0,
      `find mismatch for ${candidate}${context}`
    );
  }
};

const applyAdd = (filter, model, candidates, item, label) => {
  assert.strictEqual(
    add(filter, item),
    true,
    `add result ${label}`
  );
  model.set(item, (model.get(item) || 0) + 1);
  if (!candidates.includes(item)) candidates.push(item);
  assertStructureAndContents(filter, model, candidates, label);
};

const applyRemove = (
  filter,
  model,
  candidates,
  item,
  label
) => {
  const expected = (model.get(item) || 0) > 0;
  assert.strictEqual(
    remove(filter, item),
    expected,
    `remove result for ${item} ${label}`
  );
  if (expected) {
    if (model.get(item) === 1) model.delete(item);
    else model.set(item, model.get(item) - 1);
  }
  if (!candidates.includes(item)) candidates.push(item);
  assertStructureAndContents(filter, model, candidates, label);
};

const runBasicAndCapacityScenario = () => {
  const filter = makeFilter();
  const model = new Map();
  const candidates = [];
  const first = itemWithUniqueFingerprint(
    filter,
    "basic-first"
  );
  const second = itemWithUniqueFingerprint(
    filter,
    "basic-second"
  );
  const absent = itemWithUniqueFingerprint(
    filter,
    "basic-absent"
  );
  candidates.push(first, second, absent);

  assert.strictEqual(find(filter, first), false);
  assert.strictEqual(remove(filter, first), false);
  assertStructureAndContents(
    filter,
    model,
    candidates,
    "empty filter"
  );

  applyAdd(
    filter,
    model,
    candidates,
    first,
    "insert singleton"
  );
  applyAdd(
    filter,
    model,
    candidates,
    first,
    "insert duplicate"
  );
  applyAdd(
    filter,
    model,
    candidates,
    second,
    "insert second value"
  );
  applyRemove(
    filter,
    model,
    candidates,
    absent,
    "remove absent value"
  );
  applyRemove(
    filter,
    model,
    candidates,
    first,
    "remove one duplicate"
  );
  assert.strictEqual(find(filter, first), true);
  applyRemove(
    filter,
    model,
    candidates,
    first,
    "remove last duplicate"
  );
  applyRemove(
    filter,
    model,
    candidates,
    first,
    "remove already absent value"
  );
  applyRemove(
    filter,
    model,
    candidates,
    second,
    "empty before capacity test"
  );

  for (let index = 0; index < FILTER_CAPACITY; index++) {
    const item = itemWithUniqueFingerprint(
      filter,
      `capacity-${index}`
    );
    applyAdd(
      filter,
      model,
      candidates,
      item,
      `fill to capacity (${index + 1}/${FILTER_CAPACITY})`
    );
  }

  const beforeRejectedAdd = JSON.stringify(filter);
  assert.throws(
    () => add(filter, absent),
    /load limit/i,
    "over-capacity add should throw"
  );
  assert.strictEqual(
    JSON.stringify(filter),
    beforeRejectedAdd,
    "rejected capacity add mutated filter"
  );
  assertStructureAndContents(
    filter,
    model,
    candidates,
    "rejected capacity add"
  );

  const remaining = [...model.keys()].reverse();
  for (const item of remaining) {
    applyRemove(
      filter,
      model,
      candidates,
      item,
      "drain filter"
    );
  }
  assert.strictEqual(filter.c, 0);
};

const runFailedRelocationScenario = () => {
  const filter = makeFilter();
  const model = new Map();
  const candidates = [];
  const firstBucket = 0;
  const secondBucket = 4;
  const pairItems = [];

  for (let index = 0; index < BUCKET_SIZE * 2; index++) {
    const item = itemForPair(
      filter,
      firstBucket,
      secondBucket,
      `pair-${index}`
    );
    pairItems.push(item);
    applyAdd(
      filter,
      model,
      candidates,
      item,
      `fill relocation pair (${index + 1}/${BUCKET_SIZE * 2})`
    );
  }

  const failedItem = itemForPair(
    filter,
    firstBucket,
    secondBucket,
    "pair-failed-add"
  );
  candidates.push(failedItem);
  const beforeFailedAdd = JSON.stringify(filter);
  const originalRandom = Math.random;
  let added;
  try {
    Math.random = () => 0;
    added = add(filter, failedItem);
  } finally {
    Math.random = originalRandom;
  }

  assert.strictEqual(
    added,
    false,
    "full relocation cycle should fail"
  );
  assert.strictEqual(
    JSON.stringify(filter),
    beforeFailedAdd,
    "failed relocation mutated filter"
  );
  assertStructureAndContents(
    filter,
    model,
    candidates,
    "failed relocation rollback"
  );
  for (const item of pairItems) {
    assert.strictEqual(find(filter, item), true);
  }
};

const runDeterministicMixedScenario = () => {
  const filter = makeFilter();
  const model = new Map();
  const candidates = [];
  const pool = Array.from({ length: 40 }, (_, index) =>
    itemWithUniqueFingerprint(filter, `mixed-${index}`)
  );
  candidates.push(...pool);

  let randomState = 0x51f15e;
  const random = () => {
    randomState =
      (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
    return randomState;
  };

  for (let step = 0; step < 180; step++) {
    const item = pool[random() % pool.length];
    if ((random() & 3) !== 0 && filter.c < FILTER_CAPACITY) {
      applyAdd(
        filter,
        model,
        candidates,
        item,
        `mixed add #${step}`
      );
    } else {
      applyRemove(
        filter,
        model,
        candidates,
        item,
        `mixed remove #${step}`
      );
    }
  }

  while (filter.c > 0) {
    const item = [...model.keys()][0];
    applyRemove(
      filter,
      model,
      candidates,
      item,
      "mixed scenario cleanup"
    );
  }
};

runFingerprintWidthScenario();
runBasicAndCapacityScenario();
runFailedRelocationScenario();
runDeterministicMixedScenario();
console.log(
  "cuckoo_filter.thorough.test.js: all checks passed"
);
