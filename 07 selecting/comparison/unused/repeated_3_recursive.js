let compares = 0;
const greater = (v1, v2) => (compares++, v1 > v2);

let swaps = 0;
const swapper = (arr, i, j) => {
  if (i !== j) {
    swaps++;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
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
    while (rr - left >= 3) {
      let ll = left - 1;
      for (let i = left; i <= rr; i += 3) {
        simpleMedianOf3(arr, i, Math.min(i + 2, rr));
        swapper(arr, ++ll, i);
      }
      rr = ll;
    }
    simpleMedianOf3(arr, left, rr);
    swapper(arr, right, left);

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
