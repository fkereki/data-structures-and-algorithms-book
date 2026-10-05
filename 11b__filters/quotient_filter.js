const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const ALPHA = 0.75;

const createQuotientFilter = (n, eps = EPSILON) => {
  const p = Math.ceil(Math.log2(n / eps));
  const q = Math.ceil(Math.log2(n / ALPHA));
  const r = p - q;
  const s = 1 << q;
  const c = 0;

  if (p < 1 || q < 0 || p > 24 || p <= q) {
    throw new Error("Quotient filter: bad parameters");
  }

  return {
    p,
    q,
    r,
    s,
    c,
    slots: Array.from({ length: s }, () => ({
      rem: 0,
      isOcc: false,
      isCont: false,
      isShifted: false
    }))
  };
};

const fingerprintOf = (qf, item) => {
  const hash = hashWithSeed(String(item), 0);
  return [
    (hash & ((1 << qf.p) - 1)) >>> qf.r,
    hash & ((1 << qf.r) - 1)
  ];
};

const wrapSlot = (qf, slot) => (slot + qf.s) % qf.s;

const isSlotEmpty = (qf, slot) =>
  !qf.slots[slot].isOcc &&
  !qf.slots[slot].isCont &&
  !qf.slots[slot].isShifted;

const findClusterStart = (qf, slot) => {
  while (qf.slots[slot].isShifted) {
    slot = wrapSlot(qf, slot - 1);
  }
  return slot;
};

const locateRun = (qf, quot) => {
  let clusterStart = findClusterStart(qf, quot);
  let runNumber = 0;

  let slot = clusterStart;
  while (true) {
    if (qf.slots[slot].isOcc) runNumber++;
    if (slot === quot) break;
    slot = wrapSlot(qf, slot + 1);
  }

  let runStart = clusterStart;
  for (
    let currentRun = 1;
    currentRun < runNumber;
    currentRun++
  ) {
    do {
      runStart = wrapSlot(qf, runStart + 1);
    } while (qf.slots[runStart].isCont);
  }

  return runStart;
};

const clusterRunQuotients = (qf, slot) => {
  const quots = [];

  for (
    let is1stPass = true;
    !isSlotEmpty(qf, slot) &&
    (is1stPass || qf.slots[slot].isShifted);
    slot = wrapSlot(qf, slot + 1), is1stPass = false
  ) {
    if (qf.slots[slot].isOcc) {
      quots.push(slot);
    }
  }

  return quots;
};

const add = (qf, item) => {
  if (qf.c + 1 > qf.s * ALPHA) {
    throw new Error("Quotient filter load limit reached");
  }

  const [quot, rem] = fingerprintOf(qf, item);

  if (isSlotEmpty(qf, quot)) {
    const slot = qf.slots[quot];
    slot.rem = rem;
    slot.isOcc = true;
    qf.c++;
    return;
  }

  const runAlreadyExists = qf.slots[quot].isOcc;
  qf.slots[quot].isOcc = true;
  const runStart = locateRun(qf, quot);

  let insertAt;
  let is1stOfRun;
  if (runAlreadyExists) {
    let slot = runStart;

    for (;;) {
      if (
        isSlotEmpty(qf, slot) ||
        (slot !== runStart && !qf.slots[slot].isCont) ||
        qf.slots[slot].rem >= rem
      ) {
        break;
      }

      slot = wrapSlot(qf, slot + 1);
    }

    insertAt = slot;
    is1stOfRun = insertAt === runStart;
  } else {
    insertAt = runStart;
    is1stOfRun = true;
  }

  shiftRightAndInsert(
    qf,
    insertAt,
    rem,
    !is1stOfRun,
    insertAt !== quot,
    runAlreadyExists && is1stOfRun
  );
};

const shiftRightAndInsert = (
  qf,
  slot,
  rem,
  continuationFlag,
  shiftedFlag,
  forceNextContinuation
) => {
  let carryRem = rem;
  let carryContinuation = continuationFlag;
  let carryShifted = shiftedFlag;
  let is1stIteration = true;

  for (;;) {
    if (isSlotEmpty(qf, slot)) {
      qf.slots[slot].rem = carryRem;
      qf.slots[slot].isCont = carryContinuation;
      qf.slots[slot].isShifted = carryShifted;
      qf.c++;
      return;
    }

    const displacedRem = qf.slots[slot].rem;
    let displacedContinuation = qf.slots[slot].isCont;

    if (is1stIteration && forceNextContinuation) {
      displacedContinuation = true;
    }

    qf.slots[slot].rem = carryRem;
    qf.slots[slot].isCont = carryContinuation;
    qf.slots[slot].isShifted = carryShifted;

    carryRem = displacedRem;
    carryContinuation = displacedContinuation;
    carryShifted = true;

    slot = wrapSlot(qf, slot + 1);
    is1stIteration = false;
  }
};

const shiftLeftAndRemove = (
  qf,
  slot,
  runQuotients,
  currentRunIndex,
  wasRunStart,
  hasMoreOfSameRun
) => {
  let is1stIteration = true;

  for (;;) {
    const next = wrapSlot(qf, slot + 1);

    if (isSlotEmpty(qf, next) || !qf.slots[next].isShifted) {
      qf.slots[slot].rem = 0;
      qf.slots[slot].isOcc = false;
      qf.slots[slot].isCont = false;
      qf.slots[slot].isShifted = false;
      qf.c--;
      return;
    }

    if (!qf.slots[next].isCont) {
      currentRunIndex++;
    }

    let continuationToWrite = qf.slots[next].isCont;
    if (is1stIteration && wasRunStart && hasMoreOfSameRun) {
      continuationToWrite = false;
    }

    qf.slots[slot].rem = qf.slots[next].rem;
    qf.slots[slot].isCont = continuationToWrite;

    if (!continuationToWrite) {
      qf.slots[slot].isShifted =
        slot !== runQuotients[currentRunIndex];
    } else {
      qf.slots[slot].isShifted = true;
    }

    slot = next;
    is1stIteration = false;
  }
};

const find = (qf, item) => {
  const [quot, rem] = fingerprintOf(qf, item);

  if (!qf.slots[quot].isOcc) {
    return false;
  }

  const runStart = locateRun(qf, quot);
  let slot = runStart;
  while (true) {
    if (
      isSlotEmpty(qf, slot) ||
      (slot !== runStart && !qf.slots[slot].isCont) ||
      qf.slots[slot].rem > rem
    ) {
      return false;
    } else if (qf.slots[slot].rem === rem) {
      return true;
    } else {
      slot = wrapSlot(qf, slot + 1);
    }
  }
};

const remove = (qf, item) => {
  const [quot, rem] = fingerprintOf(qf, item);

  if (!qf.slots[quot].isOcc) {
    return false;
  }

  const clusterStart = findClusterStart(qf, quot);
  const runStart = locateRun(qf, quot);

  let target = runStart;

  for (;;) {
    if (
      isSlotEmpty(qf, target) ||
      (target !== runStart && !qf.slots[target].isCont) ||
      qf.slots[target].rem > rem
    ) {
      return false;
    }

    if (qf.slots[target].rem === rem) {
      break;
    }
    target = wrapSlot(qf, target + 1);
  }

  const wasRunStart = target === runStart;

  const nextSlot = wrapSlot(qf, target + 1);

  const hasMoreOfSameRun =
    !isSlotEmpty(qf, nextSlot) && qf.slots[nextSlot].isCont;

  const runQuotients = clusterRunQuotients(qf, clusterStart);
  let currentRunIndex = runQuotients.indexOf(quot);

  if (wasRunStart && !hasMoreOfSameRun) {
    qf.slots[quot].isOcc = false;
  }

  shiftLeftAndRemove(
    qf,
    target,
    runQuotients,
    currentRunIndex,
    wasRunStart,
    hasMoreOfSameRun
  );

  return true;
};

module.exports = {
  createQuotientFilter,
  add,
  find,
  remove
};
