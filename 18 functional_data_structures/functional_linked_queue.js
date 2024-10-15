const newQueue = () => ({ backPart: null, frontPart: null });

const isEmpty = (queue) =>
  queue.backPart === null && queue.frontPart === null;

const enter = (queue, value) => ({
  backPart: { value, next: queue.backPart },
  frontPart: queue.frontPart
});

const exit = (queue) => {
  if (isEmpty(queue)) {
    return queue;
  } else {
    let newfrontPart = queue.frontPart;
    let oldbackPart = queue.backPart;
    if (newfrontPart === null) {
      while (oldbackPart !== null) {
        newfrontPart = { value: oldbackPart.value, next: newfrontPart };
        oldbackPart = oldbackPart.next;
      }
    }
    return { backPart: oldbackPart, frontPart: newfrontPart.next };
  }
};

const front = (queue) => {
  if (isEmpty(queue)) {
    return undefined;
  } else if (queue.frontPart !== null) {
    return queue.frontPart.value;
  } else {
    let ptr = queue.backPart;
    while (ptr.next !== null) {
      ptr = ptr.next;
    }
    return ptr.value;
  }
};

module.exports = {
  isEmpty,
  newQueue,
  enter,
  exit,
  front
};
