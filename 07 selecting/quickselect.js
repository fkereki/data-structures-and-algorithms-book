const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pick = Math.floor(left + (right + 1 - left) * Math.random());
    if (pick !== right) {
      [arr[pick], arr[right]] = [arr[right], arr[pick]];
    }
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

const qSelect = (arr, k, left = 0, right = arr.length - 1) => {
  quickSelect(arr, k, left, right);
  return arr[k];
};

module.exports = qSelect;
