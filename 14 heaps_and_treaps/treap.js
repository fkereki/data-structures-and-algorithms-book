const {
  find,
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  postOrder,
  preOrder
} = require("../binary_trees/binary_search_tree.func.js");

const newTreap = () => null;

const newNode = (key) => ({
  key,
  left: null,
  right: null,
  priority: Math.random()
});

const print = (tree, s = "") => {
  if (tree) {
    console.log(s, tree.key, tree.priority.toFixed(4));
    print(tree.left, `${s}   L:`);
    print(tree.right, `${s}   R:`);
  }
};

const _rotate = (tree, side) => {
  const otherSide = side === "left" ? "right" : "left";
  const auxTree = tree[side];
  tree[side] = auxTree[otherSide];
  auxTree[otherSide] = tree;
  return auxTree;
};

const add = (tree, keyToAdd) => {
  if (isEmpty(tree)) {
    return newNode(keyToAdd);
  } else {
    const side = keyToAdd <= tree.key ? "left" : "right";
    tree[side] = add(tree[side], keyToAdd);
    return tree[side].priority <= tree.priority ? tree : _rotate(tree, side);
  }
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
    const [side, other] =
      tree.left.priority < tree.right.priority
        ? ["right", "left"]
        : ["left", "right"];
    tree = _rotate(tree, side);
    tree[other] = remove(tree[other], keyToRemove);
  }

  return tree;
};

module.exports = {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  newTreap,
  postOrder,
  preOrder,
  print,
  remove
};
