const medianOf3 = (arr, left, right) => {
  if (right - left < 2) {
    return left;
  } else {
    const c01 = arr[left] > arr[left + 1];
    const c12 = arr[left + 1] > arr[left + 2];
    if (c01 === c12) {
      return left + 1;
    } else {
      const c20 = arr[left + 2] > arr[left];
      return c20 === c01 ? left : left + 2;
    }
  }
};

const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  if (left < right) {
    let rr = right;
    while (rr - left >= 3) {
      let ll = left - 1;
      for (let i = left; i <= rr; i += 3) {
        const med = medianOf3(arr, i, Math.min(i + 2, rr));
        ll++;
        [arr[ll], arr[med]] = [arr[med], arr[ll]];
      }
      rr = ll;
    }
    const mom = medianOf3(arr, left, rr);
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

const sSelect = (arr, k, left = 0, right = arr.length - 1) => {
  quickSelect(arr, k, left, right);
  return arr[k];
};

module.exports = sSelect;
