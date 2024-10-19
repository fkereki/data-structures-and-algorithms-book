const swapIfNeeded = (arr, i, j) => {
  if (i !== j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const medianOf3 = (arr, left, right) => {
  if (right - left === 2) {
    const c01 = arr[left] > arr[left + 1];
    const c12 = arr[left + 1] > arr[left + 2];
    if (c01 === c12) {
      return left + 1;
    } else {
      const c20 = arr[left + 2] > arr[left];
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
        swapIfNeeded(arr, ++ll, m3);
      }
      rr = ll;
    }
    const m3 = medianOf3(arr, left, rr);
    swapIfNeeded(arr, right, m3);

    const pivot = arr[right];

    let p = left;
    for (let j = left; j < right; j++) {
      if (pivot > arr[j]) {
        swapIfNeeded(arr, p, j);
        p++;
      }
    }
    swapIfNeeded(arr, p, right);

    if (p === k) {
      left = right = p;
    } else if (p > k) {
      right = p - 1;
    } else {
      left = p + 1;
    }
  }
};

const sicilianSelect = (arr, k, left = 0, right = arr.length - 1) => {
  quickSelect(arr, k, left, right);
  return arr[k];
};

module.exports = sicilianSelect;
