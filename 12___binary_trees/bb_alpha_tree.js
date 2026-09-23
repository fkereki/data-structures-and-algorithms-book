const {
  find,
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  postOrder,
  preOrder
} = require("./binary_search_tree.func.js");

const newBBTree = () => null;

const newNode = (key) => ({
  key,
  left: null,
  right: null,
  size: 1
});

const _getSize = (tree) => (isEmpty(tree) ? 0 : tree.size);

const _calcSize = (tree) => 1 + _getSize(tree.left) + _getSize(tree.right);

const _balance = (subtree, tree) =>
  (1 + _getSize(subtree)) / (1 + _getSize(tree));

const print = (tree, s = "") => {
  if (!isEmpty(tree)) {
    console.log(
      s,
      tree.key,
      `S:${tree.size}`,
      _balance(tree.left, tree).toFixed(3),
      _balance(tree.right, tree).toFixed(3)
    );
    print(tree.left, `${s}  L:`);
    print(tree.right, `${s}  R:`);
  }
};

const _rotate = (tree, side) => {
  const otherSide = side === "left" ? "right" : "left";
  const auxTree = tree[side];
  tree[side] = auxTree[otherSide];
  auxTree[otherSide] = tree;

  tree.size = _calcSize(tree);
  auxTree.size = _calcSize(auxTree);
  return auxTree;
};

const ALPHA = 0.29289;
const BETA = 1 - ALPHA; // 0.70711
const GAMMA = ALPHA / BETA; // 0.41421
const DELTA = 1 - GAMMA; // 0.58579

const _fixBalance = (tree) => {
  if (!isEmpty(tree)) {
    tree.size = _calcSize(tree);

    if (_balance(tree.left, tree) > BETA) {
      if (_balance(tree.left.right, tree.left) > DELTA) {
        tree.left = _rotate(tree.left, "right");
      }
      tree = _rotate(tree, "left");
    } else if (_balance(tree.right, tree) > BETA) {
      if (_balance(tree.right.left, tree.right) > DELTA) {
        tree.right = _rotate(tree.right, "left");
      }
      tree = _rotate(tree, "right");
    }
  }

  return tree;
};

const add = (tree, keyToAdd) => {
  if (isEmpty(tree)) {
    tree = newNode(keyToAdd);
  } else {
    const side = keyToAdd <= tree.key ? "left" : "right";
    tree[side] = add(tree[side], keyToAdd);
  }

  return _fixBalance(tree);
};

const remove = (tree, keyToRemove) => {
  if (isEmpty(tree)) {
    // nothing to do
  } else if (keyToRemove < tree.key) {
    tree.left = remove(tree.left, keyToRemove);
  } else if (keyToRemove > tree.key) {
    tree.right = remove(tree.right, keyToRemove);
  } else if (isEmpty(tree.left) && isEmpty(tree.right)) {
    tree = null;
  } else if (isEmpty(tree.left)) {
    tree = tree.right;
  } else if (isEmpty(tree.right)) {
    tree = tree.left;
  } else {
    tree.key = minKey(tree.right);
    tree.right = remove(tree.right, tree.key);
  }

  return _fixBalance(tree);
};

const findByRank = (tree, rank) => {
  if (isEmpty(tree) || rank < 1 || rank > _getSize(tree)) {
    return undefined;
  } else {
    if (rank <= _getSize(tree.left)) {
      return findByRank(tree.left, rank);
    } else if (rank === _getSize(tree.left) + 1) {
      return tree.key;
    } else {
      return findByRank(tree.right, rank - _getSize(tree.left) - 1);
    }
  }
};

module.exports = {
  add,
  find,
  findByRank,
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  newBBTree,
  postOrder,
  preOrder,
  print,
  remove
};
