const medianOf5 = (a, b, c, d, e) => {
  if (a > b) {
    [a, b] = [b, a];
  }
  // now a<b

  if (c > d) {
    [c, d] = [d, c];
  }
  // now c<d

  if (a > c) {
    [a, c] = [c, a];
    [b, d] = [d, b];
  }
  // now a<b, a<c<d so a isn't the median

  if (b > e) {
    [b, e] = [e, b];
  }
  // now b<e and c<d

  if (c > b) {
    // b<c<d and b<e: b isn't the median, and d isn't either
    return e > c ? c : e;
  } else {
    // c<b<e and b<d: c isn't the median, and e isn't either
    return d > b ? b : d;
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
            const m = medianOf5(a, b, c, d, e);
            if (m === 3) {
              count++;
            }
          }
        }
      }
    }
  }
}

console.log(count);
