const {
  find,
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  postOrder,
  preOrder
} = require("./binary_search_tree.func.js");

const newAvlTree = () => null;

const newNode = (key) => ({
  key,
  left: null,
  right: null,
  height: 1
});

const _getHeight = (tree) => (isEmpty(tree) ? 0 : tree.height);

const _calcHeight = (tree) =>
  isEmpty(tree)
    ? 0
    : 1 + Math.max(_getHeight(tree.left), _getHeight(tree.right));

const _calcBalance = (tree) =>
  isEmpty(tree) ? 0 : _getHeight(tree.right) - _getHeight(tree.left);

const print = (tree, s = "") => {
  if (!isEmpty(tree)) {
    console.log(`H:${tree.height} B:${_calcBalance(tree)} ${s}`, tree.key);
    print(tree.left, `${s}${tree.key} L:`);
    print(tree.right, `${s}${tree.key} R:`);
  }
};

const _rotate = (tree, side) => {
  const otherSide = side === "left" ? "right" : "left";
  const auxTree = tree[side];
  tree[side] = auxTree[otherSide];
  auxTree[otherSide] = tree;

  tree.height = _calcHeight(tree);
  auxTree.height = _calcHeight(auxTree);
  return auxTree;
};

const _fixBalance = (tree) => {
  if (!isEmpty(tree)) {
    tree.height = _calcHeight(tree);
    const balance = _calcBalance(tree);
    if (balance < -1) {
      if (_calcBalance(tree.left) === 1) {
        tree.left = _rotate(tree.left, "right");
      }
      tree = _rotate(tree, "left");
    } else if (balance > 1) {
      if (_calcBalance(tree.right) === -1) {
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

module.exports = {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  newAvlTree,
  postOrder,
  preOrder,
  print,
  remove
};
