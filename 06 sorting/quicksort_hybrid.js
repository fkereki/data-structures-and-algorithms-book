const insertionSort = require("./insertion_sort_2");

const CUTOFF = 7;

const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    if (right - left < CUTOFF) {
      insertionSort(arr, left, right);
    } else {
      /*
      // Choose random element as pivot
      const iPivot = Math.floor(left + (right + 1 - left) * Math.random());
      if (iPivot !== right) {
        [arr[iPivot], arr[right]] = [arr[right], arr[iPivot]];
      }
      */
      const pivot = arr[right];

      // Partition: pivot will end in arr[p]
      let p = left;
      for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
          [arr[p], arr[j]] = [arr[j], arr[p]];
          p++;
        }
      }
      [arr[p], arr[right]] = [arr[right], arr[p]];

      // Recursively sort the two partitions
      quickSort(arr, left, p - 1);
      quickSort(arr, p + 1, right);
    }
  }

  return arr;
};

module.exports = quickSort;
