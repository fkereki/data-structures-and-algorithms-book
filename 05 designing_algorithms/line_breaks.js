const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const strX = JSON.stringify(args);
    return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
  };
};

const MW = 10;

const blocks = [7, 2, 5, 3, 6]; // the original data in the book
const blocks2 = [
  // another set: optimum breaks are at 4, 8, 12, 16, 22, 26, 28, 32
  2, // 0
  2, // 1
  1, // 2
  1, // 3
  2, // 4
  4, // 5
  2, // 6
  1, // 7
  1, // 8
  2, // 9
  4, // 10
  1, // 11
  1, // 12
  2, // 13
  4, // 14
  2, // 15
  2, // 16
  3, // 17
  1, // 18
  1, // 19
  1, // 20
  1, // 21
  3, // 22
  1, // 23
  2, // 24
  1, // 25
  6, // 26
  6, // 27
  2, // 28
  1, // 29
  4, // 30
  1, // 31
  1 // 32
];

const acumW = blocks.reduce((a, c, i) => ((a[i + 1] = a[i] + c), a), [0]);
const totalWidth = (p, q) => acumW[q + 1] - acumW[p];

const costOfFragment = memoize((p, q) => {
  // fits in single row?
  const s = totalWidth(p, q);
  if (s <= MW) {
    return [(MW - s) ** 2, [q]];
  }

  // no fit; try row breaks
  let optimum = Infinity;
  let split = [];
  for (let r = p; r < q; r++) {
    if (totalWidth(p, r) > MW) {
      break;
    }

    const left = costOfFragment(p, r);
    const right = costOfFragment(r + 1, q);
    const newTry = left[0] + right[0];
    if (newTry < optimum) {
      optimum = newTry;
      split = [r, ...right[1]];
    }
  }
  return [optimum, split];
});

const result = costOfFragment(0, blocks.length - 1);
console.log(result[0], result[1]);
