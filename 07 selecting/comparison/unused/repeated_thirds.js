const simpleMedianOf3 = (arr, left, right) => {
  if (right - left === 2) {
    const swapIfGreater = (i, j) => {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };
    swapIfGreater(left, right);
    swapIfGreater(left + 1, right);
    swapIfGreater(left + 1, left);
  }
  return left;
};

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  if (left < right) {
    let rr = right;
    while (rr - left >= 3) {
      let ll = left - 1;
      for (let i = left; i <= rr; i += 3) {
        const med = simpleMedianOf3(arr, i, Math.min(i + 2, rr));
        ll++;
        [arr[ll], arr[med]] = [arr[med], arr[ll]];
      }
      rr = ll;
    }
    const mom = simpleMedianOf3(arr, left, rr);
    [arr[right], arr[mom]] = [arr[mom], arr[right]];

    const pivot = arr[right];

    let p = left;
    for (let j = left; j < right; j++) {
      if (pivot > arr[j]) {
        [arr[p], arr[j]] = [arr[j], arr[p]];
        p++;
      }
    }
    [arr[p], arr[right]] = [arr[right], arr[p]];

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
  quickSelect(arr, k, left, right);
  return arr[k];
};

module.exports = r3Select;
