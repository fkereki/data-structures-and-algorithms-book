const { hashWithSeed } = require("../00___general_functions/hashWithSeed");

/*
 * QUOTIENT FILTER COUNTERS — SEMANTICS
 *
 * filter.c:
 *   Number of physical table slots that currently contain an actual
 *   (remainder, isContinuation, isShifted) entry.
 *   Incremented only when an actual entry is written into an empty slot.
 *   Decremented only when an actual entry is removed from a slot.
 */

const EPSILON = 0.01;
const ALPHA = 0.75; // target load factor (fraction of slots we expect to fill)

/*
 * Every item is hashed into a fingerprint of `p` bits, split into two parts:
 *   - the QUOTIENT (q bits): which slot in the table this item's canonical
 *     "home" is.
 *   - the REMAINDER (r bits): the part actually stored in that slot.
 *
 * Each slot also stores 3 metadata flags:
 *   - isOccupied: "this slot's quotient has at least one item stored
 *                 somewhere in the table" (may not be in this exact
 *                 slot — see isShifted).
 *   - isContinuation: "the item in this slot is not the FIRST item of its
 *                     run" (a run = all items sharing the same quotient,
 *                     stored contiguously).
 *   - isShifted: "the item in this slot is not sitting in its own
 *                 home slot — it got pushed here by a collision."
 */

const createQuotientFilter = (n, eps = EPSILON) => {
  /*
   * p = total fingerprint bits needed to hit the target false-positive rate.
   * q = quotient bits needed so the table has enough slots to stay under the target load factor ALPHA
   * r = whatever fingerprint bits are left over get stored as the remainder.
   * s = number of valid "home" positions
   * c = number of positions used
   */
  const p = Math.ceil(Math.log2(n / eps));
  const q = Math.ceil(Math.log2(n / ALPHA));
  const r = p - q;
  const s = 1 << q;
  const c = 0;

  if (p > 32 || p <= q) {
    throw new Error("Quotient filter: bad parameters");
  }

  const makeSlot = () => ({
    remainder: 0,
    isOccupied: false,
    isContinuation: false,
    isShifted: false
  });

  return {
    p,
    q,
    r,
    s,
    c,
    slots: Array.from({ length: s }, makeSlot)
  };
};

// ---------------------------------------------------------------------------
// Hashing an item into (quotient, remainder)
// ---------------------------------------------------------------------------
const fingerprintOf = (filter, item) => {
  const hash = hashWithSeed(String(item), 0) >>> 0;
  const mask = filter.p === 32 ? 0xffffffff : (1 << filter.p) - 1;
  const fingerprint = hash & mask;
  const quotient = fingerprint >>> filter.r;
  const remainder = fingerprint & ((1 << filter.r) - 1);
  return { quotient, remainder };
};

const wrapSlot = (filter, slot) => (slot + filter.s) % filter.s;

// A slot holds no data at all exactly when none of its 3 flags are set.
const isSlotEmpty = (filter, slot) => {
  const entry = filter.slots[slot];
  return !entry.isOccupied && !entry.isContinuation && !entry.isShifted;
};

// Starting at a given slot, search for an unshifted slot moving leftward.
const findClusterStart = (filter, slot) => {
  while (filter.slots[slot].isShifted) {
    slot = wrapSlot(filter, slot - 1);
  }
  return slot;
};

// Locates the run belonging to `homeSlot`, whether or not it exists yet.
// Returns the physical slot where that run does (or should) start.
const locateRun = (filter, homeSlot) => {
  let clusterStart = findClusterStart(filter, homeSlot);

  let runNumber = 0;
  let slot = clusterStart;

  for (;;) {
    if (filter.slots[slot].isOccupied) {
      runNumber++;
    }

    if (slot === homeSlot) {
      break;
    }

    slot = wrapSlot(filter, slot + 1);
  }

  let runStart = clusterStart;

  for (let currentRun = 1; currentRun < runNumber; currentRun++) {
    do {
      runStart = wrapSlot(filter, runStart + 1);
    } while (filter.slots[runStart].isContinuation);
  }

  return runStart;
};

// For deletion we sometimes need to know which quotient a run TRULY belongs
// to (not just its physical position). The k-th run in a cluster always
// corresponds to the k-th slot with isOccupied=true, starting from
// clusterStart. This walks the whole cluster and returns that mapping.
const clusterRunQuotients = (filter, clusterStart) => {
  const quotients = [];
  let slot = wrapSlot(filter, clusterStart);

  let isFirstPass = true;
  for (;;) {
    if (isSlotEmpty(filter, slot)) {
      break;
    }

    if (
      (isFirstPass || filter.slots[slot].isShifted) &&
      filter.slots[slot].isOccupied
    ) {
      quotients.push(slot);
    }

    if (!isFirstPass && !filter.slots[slot].isShifted) {
      break;
    }

    slot = wrapSlot(filter, slot + 1);
    isFirstPass = false;
  }

  return quotients;
};

const add = (filter, item) => {
  if (filter.c + 1 > filter.slots.length * ALPHA) {
    throw new Error("Quotient filter load limit reached");
  }

  const { quotient: homeSlot, remainder } = fingerprintOf(filter, item);

  // Fast path: the home slot is completely untouched.
  if (isSlotEmpty(filter, homeSlot)) {
    const slot = filter.slots[homeSlot];
    slot.remainder = remainder;
    slot.isOccupied = true;
    slot.isContinuation = false;
    slot.isShifted = false;

    filter.c++;

    return;
  }

  const runAlreadyExists = filter.slots[homeSlot].isOccupied;

  // This quotient now has a run, one way or another.
  filter.slots[homeSlot].isOccupied = true;

  const runStart = locateRun(filter, homeSlot);

  let insertAt;
  let isFirstOfRun;

  if (runAlreadyExists) {
    // Find the correct sorted position inside the existing run.
    let slot = runStart;

    for (;;) {
      if (
        isSlotEmpty(filter, slot) ||
        (slot !== runStart && !filter.slots[slot].isContinuation) ||
        filter.slots[slot].remainder >= remainder
      ) {
        break;
      }

      slot = wrapSlot(filter, slot + 1);
    }

    insertAt = wrapSlot(filter, slot);
    isFirstOfRun = insertAt === runStart;
  } else {
    // Brand new run, inserted as a single element right where it belongs.
    insertAt = runStart;
    isFirstOfRun = true;
  }

  // If we're inserting at the very front of an existing run, we're taking
  // over "first of run" duty from whatever was there — that old element
  // needs its continuation flag flipped on as it gets pushed right.
  shiftRightAndInsert(
    filter,
    insertAt,
    remainder,
    !isFirstOfRun,
    insertAt !== homeSlot,
    runAlreadyExists && isFirstOfRun
  );
};

// Inserts one new (remainder, continuation, shifted) triple at `slot`,
// pushing everything already there one position to the right, cascading
// until an empty slot swallows the last displaced item.
const shiftRightAndInsert = (
  filter,
  slot,
  remainder,
  continuationFlag,
  shiftedFlag,
  forceNextContinuation
) => {
  let carryRemainder = remainder;
  let carryContinuation = continuationFlag;
  let carryShifted = shiftedFlag;
  let currentSlot = wrapSlot(filter, slot);
  let isFirstIteration = true;

  for (;;) {
    if (isSlotEmpty(filter, currentSlot)) {
      filter.slots[currentSlot].remainder = carryRemainder;
      filter.slots[currentSlot].isContinuation = carryContinuation;
      filter.slots[currentSlot].isShifted = carryShifted;

      filter.c++;

      return;
    }

    const displacedRemainder = filter.slots[currentSlot].remainder;
    let displacedContinuation = filter.slots[currentSlot].isContinuation;

    if (isFirstIteration && forceNextContinuation) {
      displacedContinuation = true;
    }

    filter.slots[currentSlot].remainder = carryRemainder;
    filter.slots[currentSlot].isContinuation = carryContinuation;
    filter.slots[currentSlot].isShifted = carryShifted;

    carryRemainder = displacedRemainder;
    carryContinuation = displacedContinuation;
    carryShifted = true; // anything pushed off its slot is now shifted

    currentSlot = wrapSlot(filter, currentSlot + 1);
    isFirstIteration = false;
  }
};

const find = (filter, item) => {
  const { quotient: homeSlot, remainder } = fingerprintOf(filter, item);

  if (!filter.slots[homeSlot].isOccupied) {
    return false; // no run for this quotient, anywhere
  }

  const runStart = locateRun(filter, homeSlot);

  let slot = runStart;

  for (;;) {
    if (isSlotEmpty(filter, slot)) {
      return false;
    }

    if (slot !== runStart && !filter.slots[slot].isContinuation) {
      return false;
    }

    if (filter.slots[slot].remainder === remainder) {
      return true;
    }

    if (filter.slots[slot].remainder > remainder) {
      return false;
    }

    slot = wrapSlot(filter, slot + 1);
  }

  return false;
};

const remove = (filter, item) => {
  const { quotient: homeSlot, remainder } = fingerprintOf(filter, item);

  if (!filter.slots[homeSlot].isOccupied) {
    return false;
  }

  const clusterStart = findClusterStart(filter, homeSlot);
  const runStart = locateRun(filter, homeSlot);

  // Find the exact element to remove within its run.
  let target = runStart;

  for (;;) {
    if (
      isSlotEmpty(filter, target) ||
      (target !== runStart && !filter.slots[target].isContinuation) ||
      filter.slots[target].remainder > remainder
    ) {
      return false;
    }

    if (filter.slots[target].remainder === remainder) {
      break;
    }
    target = wrapSlot(filter, target + 1);
  }

  const wasRunStart = target === runStart;

  const nextSlot = wrapSlot(filter, target + 1);

  const hasMoreOfSameRun =
    !isSlotEmpty(filter, nextSlot) && filter.slots[nextSlot].isContinuation;

  // Work out, before we mutate anything, which quotient each run in this
  // cluster truly belongs to — needed to correctly clear `isShifted` for
  // any run-start that gets pulled leftward across a run boundary below.
  const runQuotients = clusterRunQuotients(filter, clusterStart);
  let currentRunIndex = runQuotients.indexOf(homeSlot);

  if (wasRunStart && !hasMoreOfSameRun) {
    // The quotient no longer has a run.
    //
    // IMPORTANT: clearing isOccupied does NOT decrement `used`.
    // `used` counts physical entries, not quotient markers.
    filter.slots[homeSlot].isOccupied = false;
  }

  let slot = target;
  let isFirstIteration = true;

  for (;;) {
    const next = wrapSlot(filter, slot + 1);

    if (isSlotEmpty(filter, next) || !filter.slots[next].isShifted) {
      // Nothing left to pull in — clear this slot and stop.
      filter.c--;

      filter.slots[slot].remainder = 0;
      filter.slots[slot].isOccupied = false;
      filter.slots[slot].isContinuation = false;
      filter.slots[slot].isShifted = false;

      break;
    }

    if (!filter.slots[next].isContinuation) {
      currentRunIndex++;
    }

    let continuationToWrite = filter.slots[next].isContinuation;

    if (isFirstIteration && wasRunStart && hasMoreOfSameRun) {
      continuationToWrite = false;
    }

    filter.slots[slot].remainder = filter.slots[next].remainder;

    filter.slots[slot].isContinuation = continuationToWrite;

    if (!continuationToWrite) {
      // This is now a run-start sitting at `slot` — it's only "shifted"
      // if `slot` isn't that run's true home.
      filter.slots[slot].isShifted = slot !== runQuotients[currentRunIndex];
    } else {
      filter.slots[slot].isShifted = true; // continuations are always shifted
    }

    slot = next;
    isFirstIteration = false;
  }

  return true;
};

module.exports = {
  createQuotientFilter,
  add,
  find,
  remove
};
