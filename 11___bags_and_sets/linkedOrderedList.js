const { newList, isEmpty, size, print } = require("../lists/linkedList");

const add = (list, valueToAdd) => {
  if (isEmpty(list) || valueToAdd < list.value) {
    list = { value: valueToAdd, next: list };
  } else {
    list.next = add(list.next, valueToAdd);
  }
  return list;
};

const find = (list, valueToFind) => {
  if (isEmpty(list) || valueToFind < list.value) {
    return false;
  } else if (valueToFind === list.value) {
    return true;
  } else {
    // valueToRemove > list.value
    return find(list.next, valueToFind);
  }
};

const remove = (list, valueToRemove) => {
  if (isEmpty(list) || valueToRemove < list.value) {
    return list;
  } else if (valueToRemove === list.value) {
    return list.next;
  } else {
    // valueToRemove > list.value
    list.next = remove(list.next, valueToRemove);
    return list;
  }
};

module.exports = {
  add,
  find,
  isEmpty,
  newList,
  print,
  remove,
  size
};
