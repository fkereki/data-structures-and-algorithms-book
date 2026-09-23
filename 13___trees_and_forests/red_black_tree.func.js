const {
  find,
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  postOrder,
  preOrder
} = require("../binary_trees/binary_search_tree.func.js");

const RED = "RED";
const BLACK = "BLACK";

const newRedBlackTree = () => null;

const newNode = (key) => ({
  key,
  left: null,
  right: null,
  color: RED
});

const _flip = (color) => (color === RED ? BLACK : RED);
const _isBlack = (node) => isEmpty(node) || node.color === BLACK;
const _isRed = (node) => !_isBlack(node);

const _flipColors = (tree) => {
  tree.color = _flip(tree.color);
  tree.left.color = _flip(tree.left.color);
  tree.right.color = _flip(tree.right.color);
};

const print = (tree, s = "") => {
  if (!isEmpty(tree)) {
    console.log(s, tree.key, "C:", tree.color);
    print(tree.left, `${s}   L:`);
    print(tree.right, `${s}   R:`);
  }
};

const _rotate = (tree, side) => {
  const otherSide = side === "left" ? "right" : "left";

  const auxTree = tree[side];
  tree[side] = auxTree[otherSide];
  auxTree[otherSide] = tree;

  auxTree.color = auxTree[otherSide].color;
  auxTree[otherSide].color = RED;

  return auxTree;
};

const _fixUp = (tree) => {
  if (_isRed(tree.right)) {
    tree = _rotate(tree, "right");
  }

  if (_isRed(tree.left) && _isRed(tree.left.left)) {
    tree = _rotate(tree, "left");
  }

  if (_isRed(tree.left) && _isRed(tree.right)) {
    _flipColors(tree);
  }

  return tree;
};

const _add = (tree, keyToAdd) => {
  if (isEmpty(tree)) {
    return newNode(keyToAdd);
  } else {
    const side = keyToAdd <= tree.key ? "left" : "right";
    tree[side] = _add(tree[side], keyToAdd);
    return _fixUp(tree);
  }
};

const add = (tree, keyToAdd) => {
  const newRoot = _add(tree, keyToAdd);
  newRoot.color = BLACK;
  return newRoot;
};

const _remove = (tree, keyToRemove) => {
  if (isEmpty(tree)) {
    return null;
  } else if (keyToRemove < tree.key) {
    if (_isBlack(tree.left) && _isBlack(tree.left.left)) {
      // move red to left
      _flipColors(tree);
      if (_isRed(tree.right.left)) {
        tree.right = _rotate(tree.right, "left");
        tree = _rotate(tree, "right");
        _flipColors(tree);
      }
    }
    tree.left = _remove(tree.left, keyToRemove);
  } else {
    if (_isRed(tree.left)) {
      tree = _rotate(tree, "left");
    }
    if (keyToRemove === tree.key && isEmpty(tree.right)) {
      return null;
    } else {
      if (_isBlack(tree.right) && _isBlack(tree.right.left)) {
        // move red to right
        _flipColors(tree);
        if (_isRed(tree.left.left)) {
          tree = _rotate(tree, "left");
          _flipColors(tree);
        }
      }
      if (keyToRemove === tree.key) {
        tree.key = minKey(tree.right);
        tree.right = _remove(tree.right, tree.key);
      } else {
        tree.right = _remove(tree.right, keyToRemove);
      }
    }
  }
  return _fixUp(tree);
};

const remove = (tree, keyToRemove) => {
  const newRoot = _remove(tree, keyToRemove);
  if (!isEmpty(newRoot)) {
    newRoot.color = BLACK;
  }
  return newRoot;
};

module.exports = {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  newRedBlackTree,
  postOrder,
  preOrder,
  print,
  remove
};
