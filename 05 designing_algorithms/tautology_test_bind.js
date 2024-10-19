const isTaut = (fn) => {
  if (fn.length === 0) {
    return !!fn();
  } else {
    const f0 = fn.bind(null, false);
    const f1 = fn.bind(null, true);
    return isTaut(f0) && isTaut(f1);
  }
};

const f = (x, y) => x || y || (!x && !y);
console.log(isTaut(f)); // true

const g = (x, y) => (x || (!x && y)) === (x || y);
console.log(isTaut(g)); // true

const h = (x, y, z) => !x || (x && z) || !y || (y && z) || z;
console.log(isTaut(h)); // false
