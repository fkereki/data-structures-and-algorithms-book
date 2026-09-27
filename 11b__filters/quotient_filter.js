const { hashWithSeed } = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const ALPHA = 0.75; // target load factor (fraction of slots we expect to fill)

/*
 * A quotient filter is a compact structure for testing "have I seen this
 * item before?" — like a Bloom filter, but it also supports removing items.
 *
 * Every item is hashed into a fingerprint of `p` bits, split into two parts:
 *   - the QUOTIENT (q bits): which slot in the table this item's canonical
 *     "home" is.
 *   - the REMAINDER (r bits): the part actually stored in that slot.
 *
 * Each slot also stores 3 metadata flags:
 *   - isOccupied:     "this slot's quotient has at least one item stored
 *                       somewhere in the table" (may not be in this exact
 *                       slot — see isShifted).
 *   - isContinuation: "the item in this slot is not the FIRST item of its
 *                       run" (a run = all items sharing the same quotient,
 *                       stored contiguously).
 *   - isShifted:      "the item in this slot is not sitting in its own
 *                       home slot — it got pushed here by a collision."
 */

// ---------------------------------------------------------------------------
// Creating a filter
// ---------------------------------------------------------------------------

function createQuotientFilter(n, eps = EPSILON) {
  // p = total fingerprint bits needed to hit the target false-positive rate.
  // With the book's simplifying assumption, p never exceeds 32 bits.
  const p = Math.min(32, Math.ceil(Math.log2(n / eps)));

  // q = quotient bits needed so the table has enough slots to stay under
  // the target load factor ALPHA.
  const q = Math.ceil(Math.log2(n / ALPHA));

  // r = whatever fingerprint bits are left over get stored as the remainder.
  const r = Math.max(1, p - q);

  const s = 1 << q; // number of valid "home" positions

  // The table is allocated larger than the logical slot count so shifted
  // entries can spill forward without needing wraparound logic.
  // In this version, the backing array is exactly 2 * s slots.
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
    c: 0,
    slots: Array.from({ length: s * 2 }, makeSlot)
  };
}

// ---------------------------------------------------------------------------
// Hashing an item into (quotient, remainder)
// ---------------------------------------------------------------------------

// Use the same hash function family as the Bloom filter implementation,
// but with a single 32-bit fingerprint for the quotient filter.
function fingerprintOf(filter, item) {
  const hash = hashWithSeed(String(item), 0) >>> 0;
  const mask = filter.p === 32 ? 0xffffffff : (1 << filter.p) - 1;
  const fingerprint = hash & mask;
  const quotient = fingerprint >>> filter.r;
  const remainder = fingerprint & ((1 << filter.r) - 1);
  return { quotient, remainder };
}

// ---------------------------------s * 2------------------------------------------
// Small helpers shared by add / contains / remove
// ---------------------------------------------------------------------------

// A slot holds no data at all exactly when none of its 3 flags are set.
function isSlotEmpty(filter, slot) {
  const entry = filter.slots[slot];
  return !entry.isOccupied && !entry.isContinuation && !entry.isShifted;
}

// Starting from an item's home slot, walk left through shifted slots to
// find where its "cluster" (a chain of collided runs) begins.
function findClusterStart(filter, homeSlot) {
  let slot = homeSlot;
  while (slot > 0 && filter.slots[slot].isShifted) {
    slot--;
  }
  return slot;
}

// Locates the run belonging to `homeSlot`, whether or not it exists yet.
// Returns the physical slot where that run does (or should) start.
function locateRun(filter, homeSlot) {
  let clusterStart = homeSlot;
  while (clusterStart > 0 && filter.slots[clusterStart].isShifted) {
    clusterStart--;
  }

  let runNumber = 0;
  for (let slot = clusterStart; slot <= homeSlot; slot++) {
    if (filter.slots[slot].isOccupied) {
      runNumber++;
    }
  }

  let slot = clusterStart;
  for (let currentRun = 1; currentRun < runNumber; currentRun++) {
    do {
      slot++;
    } while (filter.slots[slot].isContinuation);
  }

  return slot;
}

// For deletion we sometimes need to know which quotient a run TRULY belongs
// to (not just its physical position). The k-th run in a cluster always
// corresponds to the k-th slot with isOccupied=true, starting from
// clusterStart. This walks the whole cluster and returns that mapping.
function clusterRunQuotients(filter, clusterStart) {
  let slot = clusterStart;
  let runCount = 0;
  while (
    slot < filter.s * 2 &&
    !isSlotEmpty(filter, slot) &&
    (slot === clusterStart || filter.slots[slot].isShifted)
  ) {
    if (!filter.slots[slot].isContinuation) {
      runCount++;
    }
    slot++;
  }

  const quotients = [];
  let candidate = clusterStart;
  for (let i = 0; i < runCount; i++) {
    while (!filter.slots[candidate].isOccupied) {
      candidate++;
    }
    quotients.push(candidate);
    candidate++;
  }
  return quotients;
}

// ---------------------------------------------------------------------------
// add
// ---------------------------------------------------------------------------

function add(filter, item) {
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
  filter.slots[homeSlot].isOccupied = true; // this quotient now has a run, one way or another

  const runStart = locateRun(filter, homeSlot);

  let insertAt;
  let isFirstOfRun;

  if (runAlreadyExists) {
    // Find the correct sorted position inside the existing run.
    let slot = runStart;
    while (true) {
      if (isSlotEmpty(filter, slot)) break;
      if (slot !== runStart && !filter.slots[slot].isContinuation) break; // reached the next run
      if (filter.slots[slot].remainder >= remainder) break;
      slot++;
    }
    insertAt = slot;
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
  filter.c++;
}

// Inserts one new (remainder, continuation, shifted) triple at `slot`,
// pushing everything already there one position to the right, cascading
// until an empty slot swallows the last displaced item.
function shiftRightAndInsert(
  filter,
  slot,
  remainder,
  continuationFlag,
  shiftedFlag,
  forceNextContinuation
) {
  let carryRemainder = remainder;
  let carryContinuation = continuationFlag;
  let carryShifted = shiftedFlag;
  let isFirstIteration = true;

  while (!isSlotEmpty(filter, slot)) {
    const displacedRemainder = filter.slots[slot].remainder;
    let displacedContinuation = filter.slots[slot].isContinuation;
    if (isFirstIteration && forceNextContinuation) {
      displacedContinuation = true;
    }

    filter.slots[slot].remainder = carryRemainder;
    filter.slots[slot].isContinuation = carryContinuation;
    filter.slots[slot].isShifted = carryShifted;

    carryRemainder = displacedRemainder;
    carryContinuation = displacedContinuation;
    carryShifted = true; // anything pushed off its slot is now shifted

    slot++;
    isFirstIteration = false;
    if (slot >= filter.s * 2) {
      throw new Error("Quotient filter ran out of room — table is too full");
    }
  }

  filter.slots[slot].remainder = carryRemainder;
  filter.slots[slot].isContinuation = carryContinuation;
  filter.slots[slot].isShifted = carryShifted;
}

// ---------------------------------------------------------------------------
// find
// ---------------------------------------------------------------------------

function find(filter, item) {
  const { quotient: homeSlot, remainder } = fingerprintOf(filter, item);
  if (!filter.slots[homeSlot].isOccupied) return false; // no run for this quotient, anywhere

  const runStart = locateRun(filter, homeSlot);

  let slot = runStart;
  while (true) {
    if (isSlotEmpty(filter, slot)) return false;
    if (slot !== runStart && !filter.slots[slot].isContinuation) return false; // ran into the next run
    if (filter.slots[slot].remainder === remainder) return true;
    if (filter.slots[slot].remainder > remainder) return false; // run is sorted — stop early
    slot++;
  }
}

// ---------------------------------------------------------------------------
// remove
// ---------------------------------------------------------------------------

function remove(filter, item) {
  const { quotient: homeSlot, remainder } = fingerprintOf(filter, item);
  if (!filter.slots[homeSlot].isOccupied) return false;

  const clusterStart = findClusterStart(filter, homeSlot);
  const runStart = locateRun(filter, homeSlot);

  // Find the exact element to remove within its run.
  let target = runStart;
  let found = false;
  while (true) {
    if (isSlotEmpty(filter, target)) break;
    if (target !== runStart && !filter.slots[target].isContinuation) break;
    if (filter.slots[target].remainder === remainder) {
      found = true;
      break;
    }
    if (filter.slots[target].remainder > remainder) break;
    target++;
  }
  if (!found) return false;

  const wasRunStart = target === runStart;
  const hasMoreOfSameRun =
    target + 1 < filter.s * 2 &&
    !isSlotEmpty(filter, target + 1) &&
    filter.slots[target + 1].isContinuation;

  // Work out, before we mutate anything, which quotient each run in this
  // cluster truly belongs to — needed to correctly clear `isShifted` for
  // any run-start that gets pulled leftward across a run boundary below.
  const runQuotients = clusterRunQuotients(filter, clusterStart);
  let currentRunIndex = runQuotients.indexOf(homeSlot);

  if (wasRunStart && !hasMoreOfSameRun) {
    filter.slots[homeSlot].isOccupied = false;
  }

  let slot = target;
  let isFirstIteration = true;

  while (true) {
    const next = slot + 1;
    if (
      next >= filter.s * 2 ||
      isSlotEmpty(filter, next) ||
      !filter.slots[next].isShifted
    ) {
      // Nothing left to pull in — clear this slot and stop.
      filter.slots[slot].remainder = 0;
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

  filter.c--;
  return true;
}

module.exports = {
  createQuotientFilter,
  add,
  find,
  remove
};
