const frSelect = (arr, k, left = 0, right = arr.length - 1) => {
  while (right > left) {
    if (right - left > 600) {
      // Choosing a small subarray S based on sampling. 600, 0.5 and 0.5 are arbitrary constants
      const n = right - left + 1;
      const i = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp((2 * z) / 3);
      const sd = 0.5 * Math.sqrt(z * s * (1 - s / n)) * Math.sign(i - n / 2);

      const newLeft = Math.max(left, Math.floor(k - (i * s) / n + sd));
      const newRight = Math.min(right, Math.floor(k + (1 - i / n) * s + sd));

      frSelect(arr, k, newLeft, newRight);
    }

    // Partition arr[left..right] using arr[k] as pivot
    const pivot = arr[k];
    let ll = left;
    let rr = right;

    [arr[ll], arr[k]] = [arr[k], arr[ll]];
    if (arr[right] > arr[left]) {
      [arr[ll], arr[rr]] = [arr[rr], arr[ll]];
    }

    while (ll < rr) {
      [arr[ll], arr[rr]] = [arr[rr], arr[ll]];
      do {
        ll++;
      } while (pivot > arr[ll]);
      do {
        rr--;
      } while (arr[rr] > pivot);
    }

    if (arr[left] === pivot) {
      [arr[left], arr[rr]] = [arr[rr], arr[left]];
    } else {
      rr++;
      [arr[right], arr[rr]] = [arr[rr], arr[right]];
    }

    // Adjust left and right to select the subarray having k
    if (rr <= k) {
      left = rr + 1;
    }
    if (k <= rr) {
      right = rr - 1;
    }
  }

  return arr[k];
};

module.exports = frSelect;
