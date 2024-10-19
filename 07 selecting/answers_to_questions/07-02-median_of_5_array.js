const swapper = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

const medianOf5 = (arr5) => {
  if (arr5[0] > arr5[1]) {
    swapper(arr5, 0, 1);
  }

  if (arr5[2] > arr5[3]) {
    swapper(arr5, 2, 3);
  }

  if (arr5[0] > arr5[2]) {
    swapper(arr5, 0, 2);
    swapper(arr5, 1, 3);
  }

  if (arr5[1] > arr5[4]) {
    swapper(arr5, 1, 4);
  }

  if (arr5[2] > arr5[1]) {
    return arr5[4] > arr5[2] ? 2 : 4;
  } else {
    return arr5[3] > arr5[1] ? 1 : 3;
  }
};

module.exports = medianOf5;

let count = 0;
for (let a = 1; a <= 5; a++) {
  for (let b = 1; b <= 5; b++) {
    for (let c = 1; c <= 5; c++) {
      for (let d = 1; d <= 5; d++) {
        for (let e = 1; e <= 5; e++) {
          if (
            a !== b &&
            a !== c &&
            a !== d &&
            a !== e &&
            b !== c &&
            b !== d &&
            b !== e &&
            c !== d &&
            c !== e &&
            d !== e
          ) {
            const arr = [a, b, c, d, e];
            const m = medianOf5(arr);
            if (arr[m] === 3) {
              count++;
            }
          }
        }
      }
    }
  }
}

console.log(count);
