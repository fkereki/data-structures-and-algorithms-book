const linearSearch = (arr, key) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (arr[i] === key) {
      return i;
    }
  }
  return -1;
};

module.exports = linearSearch;
