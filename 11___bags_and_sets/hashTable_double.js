const EMPTY = undefined;
const AVAILABLE = null;

const newHashTable = (n = 100) => ({
  slots: new Array(n).fill(EMPTY),
  used: 0
});

const hash1 = (ht, value) => value % ht.slots.length;
const hash2 = (ht, value) => 1 + (value % (ht.slots.length - 1));

const load = (ht) => ht.used / ht.slots.length;

const add = (ht, value) => {
  let i = hash1(ht, value);
  if (ht.slots[i] !== EMPTY) {
    const step = hash2(ht, value);
    let i0 = i;
    while (ht.slots[i] !== EMPTY && ht.slots[i] !== AVAILABLE) {
      i = (i + step) % ht.slots.length;
      if (i === i0) {
        i = (i + 1) % ht.slots.length;
        i0 = i;
      }
    }
  }

  if (ht.slots[i] === EMPTY) {
    ht.used++;
  }
  ht.slots[i] = value;

  if (load(ht) > 0.7) {
    const newHT = newHashTable(ht.slots.length * 2);
    ht.slots.forEach((v) => {
      if (v !== EMPTY && v !== AVAILABLE) {
        add(newHT, v);
      }
    });
    return newHT;
  } else {
    return ht;
  }
};

const remove = (ht, value) => {
  let i = hash1(ht, value);
  const step = hash2(ht, value);
  let i0 = i;
  while (ht.slots[i] !== EMPTY && ht.slots[i] !== value) {
    i = (i + step) % ht.slots.length;
    if (i0 === i) {
      i = (i + 1) % ht.slots.length;
      i0 = i;
    }
  }

  if (ht.slots[i] === value) {
    ht.slots[i] = AVAILABLE;
  }
  return ht;
};

const find = (ht, value) => {
  let i = hash1(ht, value);
  const step = hash2(ht, value);
  let i0 = i;
  while (ht.slots[i] !== EMPTY && ht.slots[i] !== value) {
    i = (i + step) % ht.slots.length;
    if (i0 === i) {
      i = (i + 1) % ht.slots.length;
      i0 = i;
    }
  }

  return ht.slots[i] === value;
};

/*
Lazy deletion refers to a method of deleting elements
from a hash1 table that uses open addressing.
In this method, deletions are done by marking an
element as deleted, rather than erasing it entirely.
Deleted locations are treated as empty when inserting
and as occupied during a search.
*/

module.exports = { add, find, newHashTable, remove };
