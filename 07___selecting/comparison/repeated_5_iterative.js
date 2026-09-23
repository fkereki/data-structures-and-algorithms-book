let compares = 0;
const greater = (v1, v2) => (compares++, v1 > v2);

let swaps = 0;
const swapper = (arr, i, j) => {
  if (i !== j) {
    swaps++;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const medianOf5 = (arr5, from) => {
  /*
    return index of median of array of 5 elements
  */
  const swapIfGreater = (i, j, k = -1, l = -1) => {
    if (greater(arr5[i], arr5[j])) {
      k > 0 && swapper(arr5, k, l);
      swapper(arr5, i, j);
    }
  };
  swapIfGreater(from + 0, from + 1);
  swapIfGreater(from + 2, from + 3);
  swapIfGreater(from + 0, from + 2, from + 1, from + 3);
  swapIfGreater(from + 1, from + 4);

  if (greater(arr5[from + 2], arr5[from + 1])) {
    return greater(arr5[from + 4], arr5[from + 2]) ? from + 2 : from + 4;
  } else {
    return greater(arr5[from + 3], arr5[from + 1]) ? from + 1 : from + 3;
  }
};

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
  return k;
};

const simpleMedian = (arr, left, right) =>
  sortingSelect(arr, Math.floor((left + right) / 2), left, right);

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  while (left < right) {
    let rr = right;
    while (rr - left >= 5) {
      let ll = left - 1;
      for (let i = left; i + 4 <= rr; i += 5) {
        const mm = medianOf5(arr, i);
        swapper(arr, ++ll, mm);
      }
      rr = ll;
    }
    const mm = simpleMedian(arr, left, rr);
    swapper(arr, right, mm);

    const pivot = arr[right];

    let p = left;
    for (let j = left; j < right; j++) {
      if (greater(pivot, arr[j])) {
        swapper(arr, p, j);
        p++;
      }
    }
    swapper(arr, p, right);

    if (p === k) {
      left = right = p;
    } else if (p > k) {
      right = p - 1;
    } else {
      left = p + 1;
    }
  }
};

const r3Select = (arr, k, left = 0, right = arr.length - 1) => {
  swaps = 0;
  compares = 0;
  const start = process.hrtime.bigint();
  quickSelect(arr, k, left, right);
  const stop = process.hrtime.bigint();
  return [
    "L",
    arr.length,
    "K",
    k,
    "R",
    arr[k],
    "S",
    swaps,
    "C",
    compares,
    "T",
    Number(stop - start) / 1_000_000 // milliseconds
  ];
};

module.exports = r3Select;
