const {
  newBinaryTree,
  isEmpty,
  add,
  print
} = require("../binary_search_tree.func.js");

const _removeMin = (tree) => {
  /* not empty tree assumed */
  if (isEmpty(tree.left)) {
    return [tree.right, tree.key];
  } else {
    let min;
    [tree.left, min] = _removeMin(tree.left);
    return [tree, min];
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
    [tree.right, tree.key] = _removeMin(tree.right);
  }

  return tree;
};

let h = newBinaryTree();

h = add(h, 22);
h = add(h, 9);
h = add(h, 60);
h = add(h, 24);
h = add(h, 11);
h = add(h, 12);
h = add(h, 4);
h = add(h, 13);
h = add(h, 66);
h = add(h, 64);
h = add(h, 62);
h = add(h, 63);
h = add(h, 23);

print(h);
h = remove(h, 60);
print(h);
h = remove(h, 9);
print(h);
