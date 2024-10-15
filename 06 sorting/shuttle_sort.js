const shuttleSort = (arr, from = 0, to = arr.length - 1) => {
  let f = from;
  let t = to;

  while (f < t) {
    for (let i = f; i <= t - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
    t--;

    for (let i = t - 1; i >= f; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
    f++;
  }

  return arr;
};

module.exports = shuttleSort;
