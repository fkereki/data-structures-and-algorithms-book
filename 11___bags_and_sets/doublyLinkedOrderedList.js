const { isEmpty, size, print, find } = require("../lists/linkedList.js");

const newDoubleList = () => ({ first: null, last: null });

const newNode = (key) => ({ key, next: null, prev: null });

const add = (list, keyToAdd) => {
  const keyNode = newNode(keyToAdd);
  if (isEmpty(list)) {
    list.first = keyNode;
    list.last = keyNode;
  } else if (keyToAdd < list.first.key) {
    list.first.prev = keyNode;
    keyNode.next = list.first;
    list.first = keyNode;
  } else if (keyToAdd > list.last.key) {
    list.last.next = keyNode;
    keyNode.prev = list.last;
    list.last = keyNode;
  } else {
    let ptr = list.first;
    while (keyToAdd > ptr.next.key) {
      ptr = ptr.next;
    }
    keyNode.next = ptr.next;
    keyNode.prev = ptr;
    ptr.next.prev = keyNode;
    ptr.next = keyNode;
  }
  return list;
};

const remove = (list, keyToRemove) => {
  if (
    isEmpty(list) ||
    keyToRemove < list.first.key ||
    keyToRemove > list.last.key
  ) {
    // nothing to do!
  } else if (keyToRemove === list.first.key && list.first === list.last) {
    list.first = null;
    list.last = null;
  } else if (keyToRemove === list.first.key) {
    list.first = list.first.next;
    list.first.prev = null;
  } else if (keyToRemove === list.last.key) {
    list.last = list.last.prev;
    list.last.next = null;
  } else {
    let ptr = list.first;
    while (keyToRemove > ptr.next.key) {
      ptr = ptr.next;
    }
    if (keyToRemove === ptr.next.key) {
      ptr.next = ptr.next.next;
      ptr.next.prev = ptr;
    }
  }
  return list;
};

module.exports = {
  add,
  find,
  isEmpty,
  newDoubleList,
  print,
  remove,
  size
};
