const combSort = (arr, from = 0, to = arr.length - 1) => {
  let gap = to - from + 1;
  const SHRINK_FACTOR = 1.3;

  for (let sorted = false; !sorted; ) {
    // Prepare the gap value for combing
    gap = Math.floor(gap / SHRINK_FACTOR);
    if (gap < 1) {
      gap = 1;
      sorted = true;
    }

    // Do a "comb" over all the array
    for (let i = from; i <= to - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        sorted = false;
      }
    }

    if (gap === 1) {
      to--;
    }
  }

  return arr;
};

module.exports = combSort;
