const newBinaryTree = () => null;

const newNode = (key, left = null, right = null) => ({ key, left, right });

const isEmpty = (tree) => tree === null;

const print = (tree, s = "") => {
  if (tree !== null) {
    console.log(s, tree.key);
    print(tree.left, `${s}  L:`);
    print(tree.right, `${s}  R:`);
  }
};

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
  } else if (keyToAdd <= tree.key) {
    return newNode(tree.key, add(tree.left, keyToAdd), tree.right);
  } else {
    return newNode(tree.key, tree.left, add(tree.right, keyToAdd));
  }
};

const minKey = (tree) => (isEmpty(tree.left) ? tree.key : minKey(tree.left));

const remove = (tree, keyToRemove) => {
  if (isEmpty(tree)) {
    return tree;
  } else if (keyToRemove < tree.key) {
    return newNode(tree.key, remove(tree.left, keyToRemove), tree.right);
  } else if (keyToRemove > tree.key) {
    return newNode(tree.key, tree.left, remove(tree.right, keyToRemove));
  } else if (isEmpty(tree.left) && isEmpty(tree.right)) {
    return null;
  } else if (isEmpty(tree.left)) {
    return tree.right;
  } else if (isEmpty(tree.right)) {
    return tree.left;
  } else {
    const rightMin = minKey(tree.right);
    return newNode(rightMin, tree.left, remove(tree.right, rightMin));
  }
};

module.exports = {
  add,
  find,
  isEmpty,
  minKey,
  newBinaryTree,
  newNode,
  print,
  remove
};
