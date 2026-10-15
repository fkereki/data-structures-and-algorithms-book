/* Algorithm S from section 3.4.2 of TAOCP */

const orderedSample = (arr, k) => {
  if (k === 0) {
    return [];
  } else if (Math.random() < k / arr.length) {
    return [arr[0], ...orderedSample(arr.slice(1), k - 1)];
  } else {
    return [...orderedSample(arr.slice(1), k)];
  }
};

module.exports = { orderedSample };
