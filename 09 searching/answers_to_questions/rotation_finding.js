const rotationFind = (arr) => {
  let l = 0;
  let r = arr.length - 1;
  while (arr[l] > arr[r]) {
    const m = (l + r) >> 1;
    if (arr[m] > arr[r]) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return l;
};

console.log(rotationFind([9, 12, 22, 34, 56, 60, 4]));
console.log(rotationFind([12, 22, 34, 56, 60, 4, 9]));
console.log(rotationFind([22, 34, 56, 60, 4, 9, 12]));
console.log(rotationFind([34, 56, 60, 4, 9, 12, 22]));
console.log(rotationFind([56, 60, 4, 9, 12, 22, 34]));
console.log(rotationFind([60, 4, 9, 12, 22, 34, 56]));
console.log(rotationFind([4, 9, 12, 22, 34, 56, 60]));
