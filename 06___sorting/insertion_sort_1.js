const insertionSort = (arr, from = 0, to = arr.length - 1) => {
  for (let i = from + 1; i <= to; i++) {
    for (let j = i; j > from && arr[j - 1] > arr[j]; j--) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
    }
  }

  return arr;
};

module.exports = insertionSort;
