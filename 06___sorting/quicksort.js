const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    /* Choose random element as pivot
      const pick = Math.floor(left + (right + 1 - left) * Math.random());
      if (pick !== right) {
        [arr[pick], arr[right]] = [arr[right], arr[pick]];
      }
    */

    /* Choose median of three as pivot
      const middle = Math.floor((left + right) / 2);
      if (arr[left] > arr[middle]) {
        [arr[left], arr[middle]] = [arr[middle], arr[left]];
      }
      if (arr[left] > arr[right]) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
      }
      if (arr[right] > arr[middle]) {
        [arr[right], arr[middle]] = [arr[middle], arr[right]];
      }
    */

    const pivot = arr[right];

    // Partition: pivot will end in arr[p]
    let p = left;
    for (let j = left; j < right; j++) {
      if (pivot > arr[j]) {
        [arr[p], arr[j]] = [arr[j], arr[p]];
        p++;
      }
    }
    [arr[p], arr[right]] = [arr[right], arr[p]];
    // Recursively sort the two partitions
    quickSort(arr, left, p - 1);
    quickSort(arr, p + 1, right);
  }

  return arr;
};

module.exports = quickSort;
