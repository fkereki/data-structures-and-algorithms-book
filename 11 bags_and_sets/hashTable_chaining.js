const {
  add: addToList,
  find: findInList,
  newList,
  remove: removeFromList
} = require("./linkedOrderedList.js");

const newHashTable = (n = 100) => ({
  slots: new Array(n).fill(0).map(() => newList())
});

const hash = (ht, value) => value % ht.slots.length;

const add = (ht, value) => {
  const i = hash(ht, value);
  ht.slots[i] = addToList(ht.slots[i], value);
  return ht;
};

const remove = (ht, value) => {
  const i = hash(ht, value);
  ht.slots[i] = removeFromList(ht.slots[i], value);
  return ht;
};

const find = (ht, value) => {
  const i = hash(ht, value);
  return findInList(ht.slots[i], value);
};

module.exports = { add, find, newHashTable, remove };
