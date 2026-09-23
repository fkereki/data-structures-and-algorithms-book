const { newList, isEmpty, size, print, at } = require("../lists/linkedList");

const findMTF = (list, keyToFind) => {
  if (isEmpty(list)) {
    return [list, false];
  } else if (list.value === keyToFind) {
    return [list, true];
  } else {
    let [prev, curr] = [list, list.next];
    while (!isEmpty(curr) && curr.value !== keyToFind) {
      [prev, curr] = [curr, curr.next];
    }

    if (isEmpty(curr)) {
      return [list, false];
    } else {
      [prev.next, curr.next] = [curr.next, list];
      return [curr, true];
    }
  }
};

const add = (list, valueToAdd) => {
  list = { value: valueToAdd, next: list };
  return list;
};

const remove = (list, valueToRemove) => {
  if (isEmpty(list)) {
    return list;
  } else if (valueToRemove === list.value) {
    return list.next;
  } else {
    list.next = remove(list.next, valueToRemove);
    return list;
  }
};

/*
OTHER TECHNIQUES:
Transpose method ("SWP: swap with previous")
Count method
*/

module.exports = {
  add,
  at,
  findMTF,
  isEmpty,
  newList,
  print,
  remove,
  size
};
