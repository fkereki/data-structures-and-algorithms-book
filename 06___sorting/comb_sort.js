const bubbleSort = require("./bubblesort");

const combSort = (arr, from = 0, to = arr.length - 1) => {
  const SHRINK_FACTOR = 1.3;

  let gap = to - from + 1;
  for (;;) {
    gap = Math.floor(gap / SHRINK_FACTOR);
    if (gap === 1) {
      return bubbleSort(arr, from, to);
    }
    for (let i = from; i <= to - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
};

module.exports = combSort;
