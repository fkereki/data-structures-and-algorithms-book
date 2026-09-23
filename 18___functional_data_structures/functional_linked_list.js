const newList = () => null;

const isEmpty = (list) => list === null;

const size = (list) => (isEmpty(list) ? 0 : 1 + size(list.next));

const print = (list) => {
  if (list !== null) {
    console.log(list.value);
    print(list.next);
  }
};

const at = (list, position) => {
  if (isEmpty(list)) {
    return undefined;
  } else if (position === 0) {
    return list.value;
  } else {
    return at(list.next, position - 1);
  }
};

const add = (list, position, value) => {
  if (isEmpty(list) || position === 0) {
    return { value, next: list };
  } else {
    return { value: list.value, next: add(list.next, position - 1, value) };
  }
};

const remove = (list, position) => {
  if (isEmpty(list)) {
    return list;
  } else if (position === 0) {
    return list.next;
  } else {
    return { value: list.value, next: remove(list.next, position - 1) };
  }
};

const find = (list, value) => {
  if (isEmpty(list)) {
    return false;
  } else {
    return list.value === value || find(list.next, value);
  }
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
