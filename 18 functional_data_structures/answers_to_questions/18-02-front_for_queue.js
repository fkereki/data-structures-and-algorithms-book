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
