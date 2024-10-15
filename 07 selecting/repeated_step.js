const insertionSort = require("../sorting/insertion_sort_2");

const simpleMedian = (arr, left, right) => {
  insertionSort(arr, left, right);
  return Math.floor((left + right) / 2);
};

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  if (left < right) {
    let mom;
    if (right - left < 9) {
      mom = simpleMedian(arr, left, right);
    } else {
      let j1 = left - 1;
      for (let i = left; i <= right; i += 3) {
        const med = simpleMedian(arr, i, Math.min(i + 2, right));
        j1++;
        [arr[j1], arr[med]] = [arr[med], arr[j1]];
      }

      let j2 = left - 1;
      for (let i = left; i <= j1; i += 3) {
        const med = simpleMedian(arr, i, Math.min(i + 2, j1));
        j2++;
        [arr[j2], arr[med]] = [arr[med], arr[j2]];
      }

      mom = Math.floor((left + j2) / 2);
      quickSelect(arr, mom, left, j2);
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
      quickSelect(arr, k, left, p - 1);
    } else {
      quickSelect(arr, k, p + 1, right);
    }
  }
};

const rsSelect = (arr, k, left = 0, right = arr.length - 1) => {
  quickSelect(arr, k, left, right);
  return arr[k];
};

module.exports = rsSelect;
