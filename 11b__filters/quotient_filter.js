const {
  hashWithSeed
} = require("../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const ALPHA = 0.75;

const createQuotientFilter = (n, eps = EPSILON) => {
  const p = Math.ceil(Math.log2(n / eps));
  const q = Math.ceil(Math.log2(n / ALPHA));
  const r = p - q;
  const c = 0;

  if (p < 1 || q < 0 || p > 24 || p <= q) {
    throw new Error("Quotient filter: bad parameters");
  }

  const s = 1 << q;

  const makeSlot = () => ({
    rem: 0,
    isOcc: false,
    isCont: false,
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

const locateRun = (qf, homeSlot) => {
  let clusterStart = findClusterStart(qf, homeSlot);
  let runNumber = 0;
  let slot = clusterStart;

  for (;;) {
    if (qf.slots[slot].isOcc) {
      runNumber++;
    }

    if (slot === homeSlot) {
      break;
    }

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

const clusterRunQuotients = (qf, clusterStart) => {
  const quotients = [];
  let slot = wrapSlot(qf, clusterStart);

  let is1stPass = true;
  for (;;) {
    if (
      isSlotEmpty(qf, slot) ||
      (!is1stPass && !qf.slots[slot].isShifted)
    ) {
      break;
    }

    if (
      (is1stPass || qf.slots[slot].isShifted) &&
      qf.slots[slot].isOcc
    ) {
      quotients.push(slot);
    }

    slot = wrapSlot(qf, slot + 1);
    is1stPass = false;
  }

  return quotients;
};

const add = (qf, item) => {
  if (qf.c + 1 > qf.s * ALPHA) {
    throw new Error("Quotient filter load limit reached");
  }

  const [quotient, rem] = fingerprintOf(qf, item);

  if (isSlotEmpty(qf, quotient)) {
    const slot = qf.slots[quotient];
    slot.rem = rem;
    slot.isOcc = true;
    qf.c++;
    return;
  }

  const runAlreadyExists = qf.slots[quotient].isOcc;
  qf.slots[quotient].isOcc = true;
  const runStart = locateRun(qf, quotient);

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

    insertAt = wrapSlot(qf, slot);
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
    insertAt !== quotient,
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
  let currentSlot = wrapSlot(qf, slot);
  let is1stIteration = true;

  for (;;) {
    if (isSlotEmpty(qf, currentSlot)) {
      qf.slots[currentSlot].rem = carryRem;
      qf.slots[currentSlot].isCont = carryContinuation;
      qf.slots[currentSlot].isShifted = carryShifted;
      qf.c++;
      return;
    }

    const displacedRem = qf.slots[currentSlot].rem;
    let displacedContinuation = qf.slots[currentSlot].isCont;

    if (is1stIteration && forceNextContinuation) {
      displacedContinuation = true;
    }

    qf.slots[currentSlot].rem = carryRem;
    qf.slots[currentSlot].isCont = carryContinuation;
    qf.slots[currentSlot].isShifted = carryShifted;

    carryRem = displacedRem;
    carryContinuation = displacedContinuation;
    carryShifted = true;

    currentSlot = wrapSlot(qf, currentSlot + 1);
    is1stIteration = false;
  }
};

const find = (qf, item) => {
  const [homeSlot, rem] = fingerprintOf(qf, item);

  if (!qf.slots[homeSlot].isOcc) {
    return false;
  }

  const runStart = locateRun(qf, homeSlot);
  for (let slot = runStart; ; slot = wrapSlot(qf, slot + 1)) {
    if (
      isSlotEmpty(qf, slot) ||
      (slot !== runStart && !qf.slots[slot].isCont) ||
      qf.slots[slot].rem > rem
    ) {
      return false;
    } else if (qf.slots[slot].rem === rem) {
      return true;
    }
  }

  return false;
};

const remove = (qf, item) => {
  const [homeSlot, rem] = fingerprintOf(qf, item);

  if (!qf.slots[homeSlot].isOcc) {
    return false;
  }

  const clusterStart = findClusterStart(qf, homeSlot);
  const runStart = locateRun(qf, homeSlot);

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
  let currentRunIndex = runQuotients.indexOf(homeSlot);

  if (wasRunStart && !hasMoreOfSameRun) {
    qf.slots[homeSlot].isOcc = false;
  }

  let slot = target;
  let is1stIteration = true;

  for (;;) {
    const next = wrapSlot(qf, slot + 1);

    if (isSlotEmpty(qf, next) || !qf.slots[next].isShifted) {
      qf.slots[slot].rem = 0;
      qf.slots[slot].isOcc = false;
      qf.slots[slot].isCont = false;
      qf.slots[slot].isShifted = false;
      qf.c--;
      break;
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

  return true;
};

module.exports = {
  createQuotientFilter,
  add,
  find,
  remove
};
