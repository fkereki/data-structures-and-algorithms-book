const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const strX = JSON.stringify(args);
    return strX in cache ? cache[strX] : (cache[strX] = fn(...args));
  };
};

const MW = 10;

const blocks = [7, 2, 5, 3, 6];
const acumW = blocks.reduce((a, c, i) => ((a[i + 1] = a[i] + c), a), [0]);
const totalWidth = (p, q) => acumW[q + 1] - acumW[p];

const costOfFragment = memoize((p, q) => {
  const s = totalWidth(p, q);
  if (s <= MW) {
    return [(MW - s) ** 2, [q]];
  }

  let optimum = Infinity;
  let split = [];
  for (let r = p; r < q; r++) {
    if (totalWidth(p, r) > MW) {
      // This is the extra code to avoid more work
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
console.log(result[0], JSON.stringify(result[1]));
