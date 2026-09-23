const { isEmpty, newList } = require("../linkedList");

const size = (list) => {
  let count = 0;
  for (let ptr = list; ptr !== null; ptr = ptr.next) {
    count++;
  }
  return count;
};

const print = (list) => {
  for (let ptr = list; ptr !== null; ptr = ptr.next) {
    console.log(ptr.value);
  }
};

const at = (list, position) => {
  let result = undefined;
  let ptr;
  for (ptr = list; ptr !== null && position > 0; ptr = ptr.next) {
    position--;
  }
  result = ptr === null ? undefined : ptr.value;
  return result;
};

const add = (list, position, value) => {
  if (position === 0) {
    list = { value, next: list };
  } else {
    let ptr;
    for (ptr = list; ptr.next !== null && position !== 1; ptr = ptr.next) {
      position--;
    }
    ptr = { value, next: ptr.next };
  }
};

const remove = (list, position) => {
  if (!isEmpty(list)) {
    if (position === 0) {
      list.first = list.next;
    } else {
      let ptr;
      for (ptr = list; ptr.next !== null && position !== 1; ptr = ptr.next) {
        position--;
      }
      if (ptr.next !== null) {
        ptr.next = ptr.next.next;
      }
    }
  }
  return list;
};

const find = (list, value) => {
  for (let ptr = list; ptr !== null; ptr = ptr.next) {
    if (ptr.value === value) {
      return true;
    }
  }
  return false;
};

module.exports = {
  add,
  at,
  find,
  isEmpty,
  newList,
  print,
  remove,
  size
};
