const newBinaryTree = () => null;

const newNode = (key, left = null, right = null) => ({
  key,
  left,
  right
});

const isEmpty = (tree) => tree === null;

const print = (tree, s = "") => {
  if (tree !== null) {
    console.log(s, tree.key);
    print(tree.left, `${s}  L:`);
    print(tree.right, `${s}  R:`);
  }
};

const preOrder = (tree, visit = (x) => console.log(x)) => {
  if (tree !== null) {
    visit(tree.key);
    preOrder(tree.left, visit);
    preOrder(tree.right, visit);
  }
};

const inOrder = (tree, visit = (x) => console.log(x)) => {
  if (tree !== null) {
    inOrder(tree.left, visit);
    visit(tree.key);
    inOrder(tree.right, visit);
  }
};

const postOrder = (tree, visit = (x) => console.log(x)) => {
  if (tree !== null) {
    postOrder(tree.left, visit);
    postOrder(tree.right, visit);
    visit(tree.key);
  }
};

const _minMax = (tree, side, defaultValue) => {
  if (isEmpty(tree)) {
    return defaultValue;
  } else if (isEmpty(tree[side])) {
    return tree.key;
  } else {
    return _minMax(tree[side], side, defaultValue);
  }
};

const minKey = (tree) => _minMax(tree, "left", Infinity);

const maxKey = (tree) => _minMax(tree, "right", -Infinity);

const find = (tree, keyToFind) => {
  if (isEmpty(tree)) {
    return false;
  } else if (keyToFind === tree.key) {
    return true;
  } else {
    return find(keyToFind < tree.key ? tree.left : tree.right, keyToFind);
  }
};

const add = (tree, keyToAdd) => {
  if (isEmpty(tree)) {
    return newNode(keyToAdd);
  } else {
    const side = keyToAdd <= tree.key ? "left" : "right";
    tree[side] = add(tree[side], keyToAdd);
    return tree;
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
    tree.key = minKey(tree.right);
    tree.right = remove(tree.right, tree.key);
  }

  return tree;
};

module.exports = {
  add,
  find,
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  newBinaryTree,
  newNode,
  postOrder,
  preOrder,
  print,
  remove
};
