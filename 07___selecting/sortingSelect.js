const sortingSelect = (arr, k, from = 0, to = arr.length - 1) => {
  for (let i = from; i <= k; i++) {
    let m = i;
    for (let j = i + 1; j <= to; j++) {
      if (arr[m] > arr[j]) {
        m = j;
      }
    }
    if (m !== i) {
      [arr[i], arr[m]] = [arr[m], arr[i]];
    }
  }

  return arr[k];
};

module.exports = sortingSelect;
