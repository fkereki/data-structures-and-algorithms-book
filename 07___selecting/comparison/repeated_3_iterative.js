let compares = 0;
const greater = (v1, v2) => (compares++, v1 > v2);

let swaps = 0;
const swapper = (arr, i, j) => {
  if (i !== j) {
    swaps++;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
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
    while (rr - left >= 3) {
      let ll = left - 1;
      for (let i = left; i <= rr; i += 3) {
        const m3 = medianOf3(arr, i, Math.min(i + 2, rr));
        swapper(arr, ++ll, m3);
      }
      rr = ll;
    }
    const m3 = medianOf3(arr, left, rr);
    swapper(arr, right, m3);

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
