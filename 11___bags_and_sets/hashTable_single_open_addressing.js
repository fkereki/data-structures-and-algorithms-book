const EMPTY = undefined;
const AVAILABLE = null;

const newHashTable = (n = 100) => ({
  slots: new Array(n).fill(EMPTY),
  used: 0
});

const hash = (ht, value) => value % ht.slots.length;

const load = (ht) => ht.used / ht.slots.length;

const add = (ht, value) => {
  let i = hash(ht, value);
  while (ht.slots[i] !== EMPTY && ht.slots[i] !== AVAILABLE) {
    i = (i + 1) % ht.slots.length;
  }

  if (ht.slots[i] === EMPTY) {
    ht.used++;
  }
  ht.slots[i] = value;

  if (load(ht) > 0.75) {
    let newHT = newHashTable(ht.slots.length * 2);
    ht.slots.forEach((v) => {
      if (v !== EMPTY && v !== AVAILABLE) {
        newHT = add(newHT, v);
      }
    });
    return newHT;
  } else {
    return ht;
  }
};

const remove = (ht, value) => {
  let i = hash(ht, value);
  while (ht.slots[i] !== EMPTY && ht.slots[i] !== value) {
    i = (i + 1) % ht.slots.length;
  }

  if (ht.slots[i] === value) {
    ht.slots[i] = AVAILABLE;
  }
  return ht;
};

const find = (ht, value) => {
  let i = hash(ht, value);
  while (ht.slots[i] !== EMPTY && ht.slots[i] !== value) {
    i = (i + 1) % ht.slots.length;
  }

  return ht.slots[i] === value;
};

/*
Lazy deletion refers to a method of deleting elements
from a hash table that uses open addressing.
In this method, deletions are done by marking an
element as deleted, rather than erasing it entirely.
Deleted locations are treated as empty when inserting
and as occupied during a search.
*/

module.exports = { add, find, newHashTable, remove };
