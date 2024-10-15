const EMPTY = undefined;
const AVAILABLE = null;

const isPrime = (n) => {
  if (n <= 3) {
    return true;
  } else if (n % 2 === 0) {
    return false;
  }

  for (let d = 3, q = n; d < q; d += 2) {
    q = n / d;
    if (Math.floor(q) === q) {
      return false;
    }
  }
  return true;
};

const findNextPrime = (n) => {
  while (!isPrime(n)) {
    n++;
  }
  return n;
};

/*
let x = new Array(100).fill(0).map((v,i)=>i)
(100) [0, 1, 2, 3, ..., 96, 97, 98, 99]
x.filter(isPrime)
(27) [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
      31, 37, 41, 43, 47, 53, 59, 61, 67,
      71, 73, 79, 83, 89, 97]
*/

const newHashTable = (n = 100) => ({
  slots: new Array(findNextPrime(n)).fill(EMPTY),
  used: 0
});

const hash1 = (ht, value) => value % ht.slots.length;
const hash2 = (ht, value) => 1 + (value % (ht.slots.length - 1));

const load = (ht) => ht.used / ht.slots.length;

const add = (ht, value) => {
  let i = hash1(ht, value);
  if (ht.slots[i] !== EMPTY && ht.slots[i] !== AVAILABLE) {
    const step = hash2(ht, value);
    while (ht.slots[i] !== EMPTY && ht.slots[i] !== AVAILABLE) {
      i = (i + step) % ht.slots.length;
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
  while (ht.slots[i] !== EMPTY && ht.slots[i] !== value) {
    i = (i + step) % ht.slots.length;
  }

  if (ht.slots[i] === value) {
    ht.slots[i] = AVAILABLE;
  }
  return ht;
};

const find = (ht, value) => {
  let i = hash1(ht, value);
  const step = hash2(ht, value);
  while (ht.slots[i] !== EMPTY && ht.slots[i] !== value) {
    i = (i + step) % ht.slots.length;
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
