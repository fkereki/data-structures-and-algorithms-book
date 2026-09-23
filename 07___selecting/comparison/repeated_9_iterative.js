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

const medianOf9 = (arr, left, right) => {
  const k = Math.floor((left + right) / 2);
  for (let i = left; i <= k; i++) {
    let m = i;
    for (let j = i + 1; j <= right; j++) {
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

const medianOf3 = (arr, left, right) => {
  if (right - left === 2) {
    const c01 = greater(arr[left], arr[left + 1]);
    const c12 = greater(arr[left + 1], arr[left + 2]);
    if (c01 === c12) {
      return left + 1;
    } else {
      const c20 = greater(arr[left + 2], arr[left]);
      return c20 === c01 ? left : left + 2;
    }
  } else {
    return left;
  }
};

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  while (left < right) {
    let rr = right;
    while (rr - left > 9) {
      let ll = left - 1;
      for (let i = left; i <= rr; i += 3) {
        const m3 = medianOf3(arr, i, Math.min(i + 2, rr));
        swapper(arr, ++ll, m3);
      }
      rr = ll;
    }
    const m9 = medianOf9(arr, left, rr);
    swapper(arr, right, m9);

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
