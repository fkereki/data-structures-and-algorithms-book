const newBag = () => [];

const isEmpty = (bag) => bag.length === 0;

const find = (bag, value) => bag.includes(value);

const greatest = (bag) => (isEmpty(bag) ? undefined : bag[bag.length - 1]);

const add = (bag, value) => [...bag, value].sort();

const remove = (bag, value) => {
  const pos = bag.indexOf(value);
  return pos !== -1 ? [...bag].splice(pos) : bag;
};

module.exports = {
  add,
  find,
  isEmpty,
  greatest,
  newBag,
  remove
};
