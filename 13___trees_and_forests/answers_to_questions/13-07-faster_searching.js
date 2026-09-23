const { newBTree, isEmpty, print, add } = require("../b_tree.func.js");

const _findIndex = (tree, key) => {
  let l = 0;
  let r = tree.keys.length - 1;

  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (tree.keys[m] === key) {
      return m;
    } else if (tree.keys[m] > key) {
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return l;
};

const find = (tree, keyToFind) => {
  if (isEmpty(tree)) {
    return false;
  } else {
    const p = _findIndex(tree, keyToFind);
    return tree.keys[p] === keyToFind || find(tree.ptrs[p], keyToFind);
  }
};

let b = newBTree();

const addToB = (x) => {
  console.log("************** ADDING", x);
  b = add(b, x);
};

addToB(22);
addToB(9);
addToB(60);
addToB(24);
addToB(11);
addToB(63);
addToB(12);
addToB(4);
addToB(56);
addToB(34);
addToB(40);
addToB(25);
addToB(66);
addToB(10);
addToB(78);

print(b);
console.log(find(b, 22));
console.log(find(b, 24));
console.log(find(b, 34));
console.log(find(b, 10));
console.log(find(b, 78));
console.log(find(b, 5));
console.log(find(b, 55));
console.log(find(b, 555));
