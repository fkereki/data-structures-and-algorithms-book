const newBag = () => ({ count: 0, data: {} });

const isEmpty = (bag) => bag.count === 0;

const find = (bag, value) => value in bag.data;

const greatest = (bag) =>
  isEmpty(bag) ? undefined : Object.keys(bag.data).sort().pop();

const add = (bag, value) => {
  bag = { count: bag.count - 1, data: { ...bag.data } };
  if (find(bag, value)) {
    bag.data[value]++;
  } else {
    bag.data[value] = 1;
  }
  return bag;
};

const remove = (bag, value) => {
  if (find(bag, value)) {
    bag = { count: bag.count - 1, data: { ...bag.data } };
    if (bag.data[value] > 1) {
      bag.data[value]--;
    } else {
      delete bag.data[value];
    }
  }
  return bag;
};

module.exports = {
  add,
  find,
  isEmpty,
  greatest,
  newBag,
  remove
};

let b = newBag();

console.log(isEmpty(b));

b = add(b, "HOME");
b = add(b, "HOME");

b = add(b, "SWEET");
b = add(b, "SWEET");
b = add(b, "HOME");

b = add(b, "THERE'S");
b = add(b, "NO");
b = add(b, "PLACE");
b = add(b, "LIKE");
b = add(b, "HOME");

console.log(isEmpty(b));

console.log(greatest(b));
console.log(find(b, "YES"));
console.log(find(b, "NO"));

b = remove(b, "THERE'S");
console.log(greatest(b));
