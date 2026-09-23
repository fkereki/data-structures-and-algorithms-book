const interpolationSearch = (arr, key) => {
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    const m =
      arr[l] === arr[r]
        ? l
        : Math.round(l + ((r - l) * (key - arr[l])) / (arr[r] - arr[l]));

    if (m < l || m > r) {
      return -1;
    } else if (arr[m] === key) {
      return m;
    } else if (arr[m] > key) {
      r = m - 1;
    } /* arr[m] < key */ else {
      l = m + 1;
    }
  }

  return -1;
};

module.exports = interpolationSearch;
