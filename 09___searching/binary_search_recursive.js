const binarySearch = (arr, key, l = 0, r = arr.length - 1) => {
  if (l > r) {
    return -1;
  } else {
    const m = (l + r) >> 1;
    if (arr[m] === key) {
      return m;
    } else if (arr[m] > key) {
      return binarySearch(arr, key, l, m - 1);
    } else {
      return binarySearch(arr, key, m + 1, r);
    }
  }
};

module.exports = binarySearch;
