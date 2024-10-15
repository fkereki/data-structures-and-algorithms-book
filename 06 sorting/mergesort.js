const mergesort = (arr, left = 0, right = arr.length - 1) => {
  if (right > left) {
    // split array in two parts
    const split = Math.floor((left + right) / 2);

    // recursively sort each half
    const arrL = mergesort(arr.slice(left, split + 1));
    const arrR = mergesort(arr.slice(split + 1, right + 1));

    // merge sorted halves into arr[left...right]

    let ll = 0;
    let rr = 0;
    for (let i = left; i <= right; i++) {
      if (rr === arrR.length || (ll !== arrL.length && arrR[rr] > arrL[ll])) {
        arr[i] = arrL[ll];
        ll++;
      } else {
        arr[i] = arrR[rr];
        rr++;
      }
    }
  }

  return arr;
};

module.exports = mergesort;
