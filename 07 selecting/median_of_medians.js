const insertionSort = require("../sorting/insertion_sort_2");

const simpleMedian = (arr, left, right) => {
  insertionSort(arr, left, right);
  return Math.floor((left + right) / 2);
};

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  if (left < right) {
    let mom;
    if (right - left < 5) {
      mom = simpleMedian(arr, left, right);
    } else {
      let j = left - 1;
      for (let i = left; i <= right; i += 5) {
        const med = simpleMedian(arr, i, Math.min(i + 4, right));
        j++;
        [arr[j], arr[med]] = [arr[med], arr[j]];
      }
      mom = Math.floor((left + j) / 2);
      quickSelect(arr, mom, left, j);
    }
    [arr[right], arr[mom]] = [arr[mom], arr[right]];

    const pivot = arr[right];

    let p = left;
    for (let j = left; j < right; j++) {
      if (pivot > arr[j]) {
        [arr[p], arr[j]] = [arr[j], arr[p]];
        p++;
      }
    }
    [arr[p], arr[right]] = [arr[right], arr[p]];

    if (p === k) {
      return;
    } else if (p > k) {
      return quickSelect(arr, k, left, p - 1);
    } else {
      return quickSelect(arr, k, p + 1, right);
    }
  }
};

const momSelect = (arr, k, left = 0, right = arr.length - 1) => {
  arr[quickSelect(arr, k, left, right)];
  return arr[k];
};

module.exports = momSelect;
