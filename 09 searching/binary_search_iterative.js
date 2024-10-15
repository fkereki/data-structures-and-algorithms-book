const binarySearch = (arr, key, l = 0, r = arr.length - 1) => {
  while (l <= r) {
    const m = (l + r) >> 1;
    if (arr[m] === key) {
      return m;
    } else if (arr[m] > key) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return -1;
};

module.exports = binarySearch;
