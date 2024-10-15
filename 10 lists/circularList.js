const newCircularList = () => null; // current

const isEmpty = (circ) => circ === null;

const print = (circ) => {
  if (!isEmpty(circ)) {
    let ptr = circ;
    do {
      console.log(ptr.value);
      ptr = ptr.next;
    } while (ptr !== circ);
  }
};

const printBackwards = (circ) => {
  if (!isEmpty(circ)) {
    let ptr = circ;
    do {
      console.log(ptr.value);
      ptr = ptr.prev;
    } while (ptr !== circ);
  }
};

const size = (circ) => {
  let count = 0;
  if (!isEmpty(circ)) {
    let ptr = circ;
    do {
      count++;
      ptr = ptr.next;
    } while (ptr !== circ);
  }
  return count;
};

const find = (circ, valueToFind) => {
  let found = false;
  if (!isEmpty(circ)) {
    let ptr = circ;
    do {
      found = ptr.value === valueToFind;
      ptr = ptr.next;
    } while (!found && ptr !== circ);
  }
  return found;
};

const add = (circ, valueToAdd) => {
  const newNode = { value: valueToAdd };
  if (isEmpty(circ)) {
    newNode.next = newNode;
    newNode.prev = newNode;
  } else {
    newNode.next = circ;
    newNode.prev = circ.prev;
    circ.prev.next = newNode;
    circ.prev = newNode;
  }
  return newNode;
};

const remove = (circ) => {
  if (isEmpty(circ)) {
    return circ;
  } else if (circ.next === circ) {
    return newCircularList();
  } else {
    circ.prev.next = circ.next;
    circ.next.prev = circ.prev;
    return circ.next;
  }
};

const current = (circ) => (isEmpty(circ) ? undefined : circ.value);

const advance = (circ) => (isEmpty(circ) ? circ : circ.next);

module.exports = {
  add,
  advance,
  current,
  find,
  isEmpty,
  newCircularList,
  print,
  printBackwards,
  remove,
  size
};
