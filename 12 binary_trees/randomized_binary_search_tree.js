const {
  find,
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  postOrder,
  preOrder
} = require("./binary_search_tree.func.js");

const newRandomTree = () => null;

const newNode = (key, left = null, right = null) => ({
  key,
  left,
  right,
  size: 1
});

const _getSize = (tree) => (isEmpty(tree) ? 0 : tree.size);

const _calcSize = (tree) => 1 + _getSize(tree.left) + _getSize(tree.right);

const print = (tree, s = "") => {
  if (tree !== null) {
    console.log(s, ` S:${tree.size}`, tree.key);
    print(tree.left, `${s}  L:`);
    print(tree.right, `${s}  R:`);
  }
};

const _split = (
  tree,
  keyForSplit,
  newTrees = { left: null, right: null },
  lastNodes = { left: newTrees, right: newTrees }
) => {
  if (isEmpty(tree)) {
    return newTrees;
  } else {
    const [side, other] =
      keyForSplit <= tree.key ? ["left", "right"] : ["right", "left"];
    const nextTree = tree[side];
    tree[side] = null;
    lastNodes[other][side] = tree;
    lastNodes[other] = tree;
    const newSplit = _split(nextTree, keyForSplit, newTrees, lastNodes);
    tree.size = _calcSize(tree);
    return newSplit;
  }
};

const add = (tree, keyToAdd) => {
  if (isEmpty(tree)) {
    tree = newNode(keyToAdd);
  } else if (tree.size * Math.random() < 1) {
    const newTrees = _split(tree, keyToAdd);
    tree = newNode(keyToAdd, newTrees.right, newTrees.left);
  } else {
    const side = keyToAdd <= tree.key ? "left" : "right";
    tree[side] = add(tree[side], keyToAdd);
  }
  tree.size = _calcSize(tree);
  return tree;
};

const _join = (leftTree, rightTree) => {
  const leftSize = _getSize(leftTree);
  const rightSize = _getSize(rightTree);
  const totalSize = leftSize + rightSize;

  if (totalSize === 0) {
    return null;
  } else if (totalSize * Math.random() < leftSize) {
    leftTree.right = _join(leftTree.right, rightTree);
    leftTree.size = _calcSize(leftTree);
    return leftTree;
  } else {
    rightTree.left = _join(leftTree, rightTree.left);
    rightTree.size = _calcSize(rightTree);
    return rightTree;
  }
};

const remove = (tree, keyToRemove) => {
  if (isEmpty(tree)) {
    // nothing to do
  } else if (keyToRemove < tree.key) {
    tree.left = remove(tree.left, keyToRemove);
    tree.size = _calcSize(tree);
  } else if (keyToRemove > tree.key) {
    tree.right = remove(tree.right, keyToRemove);
    tree.size = _calcSize(tree);
    return tree;
  } else if (isEmpty(tree.left) && isEmpty(tree.right)) {
    tree = null;
  } else if (isEmpty(tree.left)) {
    tree = tree.right;
  } else if (isEmpty(tree.right)) {
    tree = tree.left;
  } else {
    tree = _join(tree.left, tree.right);
  }
  return tree;
};

module.exports = {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  newRandomTree,
  postOrder,
  preOrder,
  print,
  remove
};
