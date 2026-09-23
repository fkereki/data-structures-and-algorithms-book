const sort = require("../sorting/mergesort");

const lazySelectMedian = (arr, left = 0, right = arr.length - 1) => {
  const len = right - left + 1;
  const sR = Math.floor(len ** 0.75);
  const dIndex = Math.max(0, Math.floor(sR / 2 - Math.sqrt(len)));
  const uIndex = Math.min(sR - 1, Math.ceil(sR / 2 + Math.sqrt(len)));
  let dSize, uSize, m;
  do {
    const r = [];
    for (let i = 0; i < sR; i++) {
      r.push(arr[left + Math.floor((right - left) * Math.random())]);
    }
    sort(r);

    dSize = uSize = 0;
    m = [];
    for (let i = left; i <= right; i++) {
      if (r[dIndex] > arr[i]) {
        dSize++;
      } else if (arr[i] > r[uIndex]) {
        uSize++;
      } else {
        m.push(arr[i]);
      }
    }
  } while (dSize > len / 2 || uSize > len / 2 || m.length > 4 * sR);

  sort(m);
  return m[Math.floor(len / 2) - dSize];
};

module.exports = lazySelectMedian;
