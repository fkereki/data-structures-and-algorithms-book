/* Algorithm S from section 3.4.2 of TAOCP */

const orderedSample = (arr, k) => {
  const n = arr.length;
  const sample = [];
  let toSelect = k;
  let toConsider = n;
  for (let i = 0; toSelect > 0; i++) {
    if (Math.random() < toSelect / toConsider) {
      sample.push(arr[i]);
      toSelect--;
    }
    toConsider--;
  }
  return sample;
};

const orderedSample2 = (arr, k) => {
  const n = arr.length;
  const sample = [];
  for (let i = 0; k > 0; i++) {
    if (Math.random() < k / (n - i)) {
      sample.push(arr[i]);
      k--;
    }
  }
  return sample;
};

module.exports = { orderedSample, orderedSample2 };
