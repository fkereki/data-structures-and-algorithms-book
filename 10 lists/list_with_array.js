const newList = () => [];

const size = (list) => (list ? list.length : 0);

const isEmpty = (list) => size(list) === 0;

const add = (list, position, value) => {
  list.splice(list, position, value);
  return list;
};

const remove = (list, position) => {
  list.splice(list, position);
  return list;
};

const at = (list, position) => list[position];

const find = (list, value) => list.includes(value);

module.exports = {
  add,
  at,
  find,
  isEmpty,
  newList,
  remove,
  size
};
