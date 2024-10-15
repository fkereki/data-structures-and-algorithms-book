const process = require("process");

let compares = 0;
const greater = (v1, v2) => (compares++, v1 > v2);

let swaps = 0;
const swapper = (arr, i, j) => {
  if (i !== j) {
    swaps++;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const insertionSort = (arr, from, to) => {
  for (let i = from + 1; i <= to; i++) {
    const temp = arr[i];
    let j;
    for (j = i; j > from && greater(arr[j - 1], temp); j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = temp;
  }
};

const simpleMedianOf9 = (arr, left, right) => {
  insertionSort(arr, left, right);
  return Math.floor((left + right) / 2);
};

const simpleMedianOf3 = (arr, left, right) => {
  /*
    leave median of (up to) three values in first position
  */
  if (right - left === 2) {
    const swapIfGreater = (i, j) => {
      if (greater(arr[i], arr[j])) {
        swapper(arr, i, j);
      }
    };
    swapIfGreater(left, right);
    swapIfGreater(left + 1, right);
    swapIfGreater(left + 1, left);
  }
};

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  if (left < right) {
    let rr = right;
    while (rr - left >= 9) {
      let ll = left - 1;
      for (let i = left; i <= rr; i += 3) {
        simpleMedianOf3(arr, i, Math.min(i + 2, rr));
        swapper(arr, ++ll, i);
      }
      rr = ll;
    }
    const mom = simpleMedianOf9(arr, left, rr);
    swapper(arr, right, mom);

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
      return;
    } else if (p > k) {
      quickSelect(arr, k, left, p - 1);
    } else {
      quickSelect(arr, k, p + 1, right);
    }
  }
};

const r9Select = (arr, k, left = 0, right = arr.length - 1) => {
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

module.exports = r9Select;
