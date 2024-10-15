const linearSearch = (arr, key) => {
  const n = arr.length;
  arr[n] = key;
  let i = 0;
  while (arr[i] !== key) {
    i++;
  }
  arr.length = n;
  return i === n ? -1 : i;
};

module.exports = linearSearch;
