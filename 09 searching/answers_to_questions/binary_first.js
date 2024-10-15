const binaryFindFirst = (arr, key, l = 0, r = arr.length - 1) => {
  let result = -1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (arr[m] === key) {
      result = m;
      r = m - 1;
    } else if (arr[m] > key) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return result;
};

const data = [9, 9, 9, 9, 9, 22, 22, 22, 60];

console.log(binaryFindFirst(data, 9));
console.log(binaryFindFirst(data, 22));
console.log(binaryFindFirst(data, 60));
