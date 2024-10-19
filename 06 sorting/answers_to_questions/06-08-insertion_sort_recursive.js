const insertionSort = (arr, from = 0, to = arr.length - 1) => {
  if (to > from) {
    insertionSort(arr, from, to - 1);
    const temp = arr[to];
    let j;
    for (j = to; j > from && arr[j - 1] > temp; j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = temp;
  }
  return arr;
};

module.exports = insertionSort;
