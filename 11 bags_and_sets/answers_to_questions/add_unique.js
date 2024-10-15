const EMPTY = undefined;
const AVAILABLE = null;

const hash = (ht, value) => value % ht.slots.length;

const addUnique = (ht, value) => {
  let i = hash(ht, value);
  let j = undefined;
  while (ht.slots[i] !== EMPTY) {
    if (ht.slots[i] === value) {
      // nothing -- or throw an error!
    } else if (ht.slots[i] === AVAILABLE) {
      j ??= i; // xxxxx
    }
    i = (i + 1) % ht.length;
  }

  if (ht.slots[i] === EMPTY) {
    ht.used++;
  }
  ht.slots[j ?? i] = value; // xxxxx
  return ht;
};

module.exports = { addUnique };
