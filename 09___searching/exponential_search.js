const binarySearch = require("./binary_search_iterative");

const exponentialSearch = (arr, key) => {
  const n = arr.length;

  let i = 1;
  while (i < n && key > arr[i]) {
    i = i << 1;
  }

  return binarySearch(arr, key, i >> 1, Math.min(i, n - 1));
};

module.exports = exponentialSearch;
