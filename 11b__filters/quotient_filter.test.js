/*
 * Thorough quotient-filter coverage using a 16-slot filter:
 * - Check slot flags, cluster/run boundaries, sorted remainders, occupied
 *   buckets, stored fingerprints, item count, and find() results after every
 *   add and remove.
 * - Exercise empty and singleton runs, several runs, ordered and out-of-order
 *   remainders, duplicate fingerprints, and removals from run heads, middles,
 *   tails, and absent values.
 * - Exercise clusters that wrap around the end of the slot array, collisions
 *   that shift entries, and deletion repairs within those clusters.
 * - Fill to the 75% load limit, verify an over-capacity add is rejected without
 *   mutation, then drain the filter and check that it returns to empty.
 * - Run a deterministic sequence of mixed additions/removals, validating the
 *   complete structure and membership results after each operation.
 */
const assert = require("assert");
const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");
const {
  createQuotientFilter,
  add,
  find,
  remove
} = require("./quotient_filter");

const FILTER_SIZE = 16;
const CAPACITY = Math.floor(FILTER_SIZE * 0.75);
const itemCache = new Map();

const fingerprintOf = (qf, item) => {
  const hash = hashWithSeed(String(item), 0);
  const fingerprint = hash & (2 ** qf.p - 1);
  return {
    quotient: fingerprint >>> qf.r,
    rem: fingerprint & (2 ** qf.r - 1)
  };
};

const fingerprintKey = ({ quotient, rem }) =>
  `${quotient}:${rem}`;

const itemFor = (quotient, rem) => {
  const key = `${quotient}:${rem}`;
  if (itemCache.has(key)) {
    return itemCache.get(key);
  }

  for (let candidateNumber = 0; ; candidateNumber++) {
    const candidate = `thorough-${quotient}-${rem}-${candidateNumber}`;
    const filter = { p: 10, r: 6 };
    if (
      fingerprintOf(filter, candidate).quotient === quotient &&
      fingerprintOf(filter, candidate).rem === rem
    ) {
      itemCache.set(key, candidate);
      return candidate;
    }
  }
};

const makeFilter = () => {
  const filter = createQuotientFilter(8, 0.01);
  assert.strictEqual(filter.slots.length, FILTER_SIZE);
  assert.strictEqual(filter.c, 0);
  return filter;
};

const isEmpty = (slot) =>
  !slot.isOcc && !slot.isCont && !slot.isShifted;

const assertStructureAndContents = (
  qf,
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
    qf.c,
    modelCount,
    `count mismatch${context}`
  );
  assert(qf.c <= CAPACITY, `load limit exceeded${context}`);
  assert.strictEqual(qf.slots.length, FILTER_SIZE);

  let physicalEntryCount = 0;
  for (let index = 0; index < FILTER_SIZE; index++) {
    const slot = qf.slots[index];
    if (isEmpty(slot)) {
      assert.strictEqual(
        slot.rem,
        0,
        `stale empty remainder at ${index}${context}`
      );
    } else {
      physicalEntryCount++;
      assert(
        Number.isInteger(slot.rem),
        `noninteger remainder at ${index}${context}`
      );
      assert(
        slot.rem >= 0 && slot.rem < 2 ** qf.r,
        `remainder out of range at ${index}${context}`
      );
    }
    if (slot.isCont) {
      assert(
        !isEmpty(slot),
        `empty continuation slot ${index}${context}`
      );
    }
  }
  assert.strictEqual(
    physicalEntryCount,
    modelCount,
    `entry count mismatch${context}`
  );

  const expectedQuotients = new Set(
    [...model.keys()].map((key) => Number(key.split(":")[0]))
  );
  const actualQuotients = new Set();
  for (let index = 0; index < FILTER_SIZE; index++) {
    if (qf.slots[index].isOcc) {
      actualQuotients.add(index);
    }
  }
  assert.deepStrictEqual(
    actualQuotients,
    expectedQuotients,
    `occupied buckets mismatch${context}`
  );

  const clusterStarts = [];
  for (let index = 0; index < FILTER_SIZE; index++) {
    const previous = (index + FILTER_SIZE - 1) % FILTER_SIZE;
    if (
      !isEmpty(qf.slots[index]) &&
      isEmpty(qf.slots[previous])
    ) {
      clusterStarts.push(index);
    }
  }

  const actualModel = new Map();
  const visited = new Set();
  for (const clusterStart of clusterStarts) {
    const clusterSlots = [];
    let index = clusterStart;
    while (!isEmpty(qf.slots[index])) {
      assert(
        !visited.has(index),
        `clusters overlap at ${index}${context}`
      );
      visited.add(index);
      clusterSlots.push(index);
      index = (index + 1) % FILTER_SIZE;
      assert(
        clusterSlots.length <= FILTER_SIZE,
        `unterminated cluster${context}`
      );
    }

    assert(clusterSlots.length > 0);
    assert(
      !qf.slots[clusterSlots[0]].isShifted,
      `cluster starts with shifted entry at ${clusterSlots[0]}${context}`
    );

    const runStarts = [];
    const occupiedBuckets = [];
    for (
      let offset = 0;
      offset < clusterSlots.length;
      offset++
    ) {
      const slotIndex = clusterSlots[offset];
      const slot = qf.slots[slotIndex];
      if (!slot.isCont) runStarts.push(offset);
      if (slot.isOcc) occupiedBuckets.push(slotIndex);
    }

    assert.strictEqual(
      runStarts.length,
      occupiedBuckets.length,
      `run/bucket count mismatch in cluster at ${clusterStart}${context}`
    );

    for (
      let runNumber = 0;
      runNumber < runStarts.length;
      runNumber++
    ) {
      const startOffset = runStarts[runNumber];
      const endOffset =
        runNumber + 1 < runStarts.length
          ? runStarts[runNumber + 1]
          : clusterSlots.length;
      const quotient = occupiedBuckets[runNumber];
      let previousRem = -1;

      for (
        let offset = startOffset;
        offset < endOffset;
        offset++
      ) {
        const slotIndex = clusterSlots[offset];
        const slot = qf.slots[slotIndex];
        assert.strictEqual(
          slot.isCont,
          offset !== startOffset,
          `continuation flag mismatch at ${slotIndex}${context}`
        );
        assert.strictEqual(
          slot.isShifted,
          slotIndex !== quotient,
          `shift flag mismatch at ${slotIndex} for quotient ${quotient}${context}`
        );
        assert(
          slot.rem >= previousRem,
          `remainders are not sorted in quotient ${quotient}'s run${context}`
        );
        previousRem = slot.rem;

        const key = fingerprintKey({
          quotient,
          rem: slot.rem
        });
        actualModel.set(key, (actualModel.get(key) || 0) + 1);
      }
    }
  }

  assert.strictEqual(
    visited.size,
    physicalEntryCount,
    `unvisited cluster entries${context}`
  );
  assert.deepStrictEqual(
    actualModel,
    model,
    `stored fingerprints mismatch${context}`
  );

  for (const candidate of candidates) {
    const key = fingerprintKey(fingerprintOf(qf, candidate));
    assert.strictEqual(
      find(qf, candidate),
      (model.get(key) || 0) > 0,
      `find mismatch for ${candidate}${context}`
    );
  }
};

const applyAdd = (qf, model, candidates, item, label) => {
  add(qf, item);
  const key = fingerprintKey(fingerprintOf(qf, item));
  model.set(key, (model.get(key) || 0) + 1);
  assertStructureAndContents(qf, model, candidates, label);
};

const applyRemove = (qf, model, candidates, item, label) => {
  const key = fingerprintKey(fingerprintOf(qf, item));
  const expected = (model.get(key) || 0) > 0;
  assert.strictEqual(
    remove(qf, item),
    expected,
    `remove result for ${item} ${label}`
  );
  if (expected) {
    if (model.get(key) === 1) model.delete(key);
    else model.set(key, model.get(key) - 1);
  }
  assertStructureAndContents(qf, model, candidates, label);
};

const runExplicitScenario = () => {
  const filter = makeFilter();
  const model = new Map();
  const candidates = [];
  const addOne = (q, r, label = `add q=${q}, r=${r}`) => {
    const item = itemFor(q, r);
    candidates.push(item);
    applyAdd(filter, model, candidates, item, label);
    return item;
  };
  const removeOne = (q, r, label = `remove q=${q}, r=${r}`) => {
    const item = itemFor(q, r);
    candidates.push(item);
    applyRemove(filter, model, candidates, item, label);
  };

  // One run with increasing, decreasing, middle, and duplicate remainders.
  const q4high = addOne(4, 52);
  addOne(4, 8);
  addOne(4, 35);
  addOne(4, 35); // duplicate fingerprint/value is retained as a second entry
  addOne(4, 63);
  addOne(5, 12);
  addOne(5, 48);
  addOne(7, 21);
  addOne(15, 4);

  removeOne(4, 35, "remove one of two duplicate fingerprints");
  assert.strictEqual(find(filter, itemFor(4, 35)), true);
  removeOne(4, 8, "remove first item in a run");
  removeOne(4, 63, "remove last item in a run");
  removeOne(
    4,
    1,
    "remove absent remainder from an existing run"
  );
  removeOne(15, 4, "remove a singleton run");
  assert.strictEqual(find(filter, q4high), true);

  // A wraparound cluster and neighboring runs, followed by front/middle deletes.
  for (const q of [13, 14, 15, 0, 1, 2, 3])
    addOne(q, (q * 7) % 64);
  removeOne(14, (14 * 7) % 64, "remove from a wrapped cluster");
  removeOne(
    15,
    (15 * 7) % 64,
    "remove run head in wrapped cluster"
  );
  addOne(15, 60);
  addOne(0, 1);
  removeOne(0, 1, "remove shifted neighbor in wrapped cluster");

  // Reset before exercising a separate dense multi-run cluster.
  for (const [key, count] of [...model]) {
    const [q, r] = key.split(":").map(Number);
    for (let i = 0; i < count; i++)
      removeOne(q, r, `reset q=${q}, r=${r}`);
  }

  // Many separate buckets plus collisions force multi-run clusters and shifts.
  for (const q of [6, 8, 10, 12, 4, 9, 11, 5])
    addOne(q, (q * 11 + 3) % 64);
  removeOne(
    8,
    (8 * 11 + 3) % 64,
    "delete between multiple runs"
  );
  removeOne(6, (6 * 11 + 3) % 64, "delete cluster head");

  // Fill exactly to the supported load and prove a rejected add is nonmutating.
  let rem = 0;
  while (filter.c < CAPACITY) {
    const q = (rem * 5 + filter.c * 3) % FILTER_SIZE;
    let r = (rem * 13 + 17) % 64;
    while (model.has(`${q}:${r}`)) r = (r + 1) % 64;
    addOne(
      q,
      r,
      `fill to capacity (${filter.c + 1}/${CAPACITY})`
    );
    rem++;
  }
  const beforeRejectedAdd = JSON.stringify(filter);
  assert.throws(
    () => add(filter, itemFor(3, 62)),
    /load limit/i
  );
  assert.strictEqual(
    JSON.stringify(filter),
    beforeRejectedAdd,
    "rejected add mutated filter"
  );
  assertStructureAndContents(
    filter,
    model,
    candidates,
    "rejected capacity add"
  );

  // Empty the filter in a nontrivial order, checking every transition.
  const remaining = [];
  for (const [key, count] of model) {
    const [q, r] = key.split(":").map(Number);
    for (let i = 0; i < count; i++) remaining.push([q, r]);
  }
  remaining.reverse();
  for (const [q, r] of remaining)
    removeOne(q, r, `drain q=${q}, r=${r}`);
  assert.strictEqual(filter.c, 0);
};

const runDeterministicMixedScenario = () => {
  const filter = makeFilter();
  const model = new Map();
  const candidates = [];
  const pool = [];
  for (let q = 0; q < FILTER_SIZE; q++) {
    for (const r of [0, 7, 19, 42, 63]) {
      const item = itemFor(q, r);
      pool.push(item);
      candidates.push(item);
    }
  }

  let randomState = 0x51f15e;
  const random = () => {
    randomState =
      (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
    return randomState;
  };

  for (let step = 0; step < 180; step++) {
    const item = pool[random() % pool.length];
    if ((random() & 3) !== 0 && filter.c < CAPACITY) {
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
    const entry = [...model.entries()].find(
      ([, count]) => count > 0
    );
    const [q, r] = entry[0].split(":").map(Number);
    applyRemove(
      filter,
      model,
      candidates,
      itemFor(q, r),
      "mixed scenario cleanup"
    );
  }
};

runExplicitScenario();
runDeterministicMixedScenario();
console.log(
  "quotient_filter.thorough.test.js: all checks passed"
);
