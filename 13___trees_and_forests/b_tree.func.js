let ORDER = undefined;

const newBTree = (order = 3) => {
  if (ORDER === undefined) {
    ORDER = order;
  }
  return null;
};

const newNode = (
  newKeys = [],
  newPtrs = new Array(newKeys.length + 1).fill(null)
) => ({
  keys: newKeys,
  ptrs: newPtrs
});

const isEmpty = (tree) => tree === null;

const _tooBig = (tree, d = 0) => tree.keys.length + d > ORDER - 1;

const _tooSmall = (tree, d = 0) =>
  tree.keys.length - d < Math.ceil(ORDER / 2) - 1;

const print = (tree, s = "0") => {
  if (!isEmpty(tree)) {
    console.log(s, tree.keys);
    tree.ptrs.forEach((p, i) => print(p, `${s}.${i}`));
  }
};

const inOrder = (tree, visit = (x) => console.log(x)) => {
  if (!isEmpty(tree)) {
    tree.ptrs.forEach((p, i) => {
      inOrder(p, visit);
      i in tree.keys && visit(tree.keys[i]);
    });
  }
};

const _findIndex = (tree, key) => {
  const p = tree.keys.findIndex((k) => k >= key);
  return p === -1 ? tree.keys.length : p;
};

const find = (tree, keyToFind) => {
  if (isEmpty(tree)) {
    return false;
  } else {
    const p = _findIndex(tree, keyToFind);
    return tree.keys[p] === keyToFind || find(tree.ptrs[p], keyToFind);
  }
};

const _add = (tree, keyToAdd) => {
  const p = _findIndex(tree, keyToAdd);
  if (isEmpty(tree.ptrs[p])) {
    tree.keys.splice(p, 0, keyToAdd);
    tree.ptrs.splice(p, 0, null);
  } else {
    const child = tree.ptrs[p];
    _add(child, keyToAdd);

    if (_tooBig(child)) {
      // child too big? split it
      const m = Math.ceil(ORDER / 2);
      const newChild = newNode(child.keys.slice(m), child.ptrs.slice(m));

      tree.keys.splice(p, 0, child.keys[m - 1]);
      tree.ptrs.splice(p + 1, 0, newChild);

      child.keys.length = m - 1;
      child.ptrs.length = m;
    }
  }
};

const add = (tree, keyToAdd) => {
  if (isEmpty(tree)) {
    return newNode([keyToAdd]);
  } else {
    _add(tree, keyToAdd);
    if (_tooBig(tree)) {
      // root too big? tree becomes taller
      const m = Math.ceil(ORDER / 2);
      const left = newNode(tree.keys.slice(0, m - 1), tree.ptrs.slice(0, m));
      const right = newNode(tree.keys.slice(m), tree.ptrs.slice(m));
      tree.keys = [tree.keys[m - 1]];
      tree.ptrs = [left, right];
    }
    return tree;
  }
};

const _findMin = (tree) =>
  isEmpty(tree.ptrs[0]) ? tree.keys[0] : _findMin(tree.ptrs[0]);

const _fixChildIfSmall = (tree, p) => {
  const child = tree.ptrs[p];

  if (_tooSmall(child)) {
    if (p > 0 && !_tooSmall(tree.ptrs[p - 1], 1)) {
      // take a key from left sibling
      const leftChild = tree.ptrs[p - 1];
      child.keys.unshift(tree.keys[p - 1]);
      child.ptrs.unshift(leftChild.ptrs.pop());
      tree.keys[p - 1] = leftChild.keys.pop();
    } else if (p < tree.keys.length && !_tooSmall(tree.ptrs[p + 1], 1)) {
      // take a key from right sibling
      const rightChild = tree.ptrs[p + 1];
      child.keys.push(tree.keys[p]);
      child.ptrs.push(rightChild.ptrs.shift());
      tree.keys[p] = rightChild.keys.shift();
    } else if (p > 0) {
      // join with left child
      const leftChild = tree.ptrs[p - 1];
      leftChild.keys.push(tree.keys[p - 1], ...child.keys);
      leftChild.ptrs.push(...child.ptrs);
      tree.keys.splice(p - 1, 1);
      tree.ptrs.splice(p, 1);
    } else {
      // join with right child
      const rightChild = tree.ptrs[p + 1];
      rightChild.keys.unshift(...child.keys, tree.keys[p]);
      rightChild.ptrs.unshift(...child.ptrs);
      tree.keys.splice(p, 1);
      tree.ptrs.splice(p, 1);
    }
  }
};

const _remove = (tree, keyToRemove) => {
  if (!isEmpty(tree)) {
    const p = _findIndex(tree, keyToRemove);
    if (tree.keys[p] === keyToRemove) {
      // found key -- is it in a leaf?
      if (isEmpty(tree.ptrs[p])) {
        // yes - remove it
        tree.keys.splice(p, 1);
        tree.ptrs.splice(p, 1);
      } else {
        // no - replace with following
        const nextKey = _findMin(tree.ptrs[p + 1]);
        tree.keys[p] = nextKey;
        _remove(tree.ptrs[p + 1], nextKey);
        _fixChildIfSmall(tree, p + 1);
      }
    } else {
      _remove(tree.ptrs[p], keyToRemove);
      _fixChildIfSmall(tree, p);
    }
  }
  return tree;
};

const remove = (tree, keyToRemove) => {
  tree = _remove(tree, keyToRemove);
  return (isEmpty(tree) || tree.keys.length === 0) && !isEmpty(tree.ptrs[0])
    ? tree.ptrs[0]
    : tree;
};

module.exports = {
  newBTree,
  isEmpty,
  print,
  inOrder,
  find,
  add,
  remove
};
