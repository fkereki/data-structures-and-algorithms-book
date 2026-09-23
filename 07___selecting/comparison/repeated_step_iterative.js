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

const simpleMedian = (arr, left, right) => {
  insertionSort(arr, left, right);
  return Math.floor((left + right) / 2);
};

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  while (left < right) {
    let mom;
    if (right - left < 9) {
      mom = simpleMedian(arr, left, right);
    } else {
      let j1 = left - 1;
      for (let i = left; i <= right; i += 3) {
        const med = simpleMedian(arr, i, Math.min(i + 2, right));
        j1++;
        swapper(arr, j1, med);
      }

      let j2 = left - 1;
      for (let i = left; i <= j1; i += 3) {
        const med = simpleMedian(arr, i, Math.min(i + 2, j1));
        j2++;
        swapper(arr, j2, med);
      }

      mom = Math.floor((left + j2) / 2);
      quickSelect(arr, mom, left, j2);
    }
    swapper(right, mom);

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

const rsSelect = (arr, k, left = 0, right = arr.length - 1) => {
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

module.exports = rsSelect;
