const shellSort = (arr, from = 0, to = arr.length - 1) => {
  const gaps = [1];
  // Knuth, 1973
  while (gaps[0] < (to - from) / 3) {
    gaps.unshift(gaps[0] * 3 + 1);
  }

  gaps.forEach((gap) => {
    console.log("BEFORE GAP=", gap, arr.join("-"));
    for (let i = from + gap; i <= to; i++) {
      const temp = arr[i];
      let j;
      for (j = i; j >= from + gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
    console.log("AFTER  GAP=", gap, arr.join("-"));
  });

  return arr;
};

module.exports = shellSort;
