const { newNode, isEmpty } = require("../binary_search_tree.func.js");

const makeCopy = (tree) =>
  isEmpty(tree)
    ? tree
    : newNode(tree.key, makeCopy(tree.left), makeCopy(tree.right));

const makeCopy2 = (tree) => {
  if (isEmpty(tree)) {
    return tree;
  } else {
    const newLeft = makeCopy2(tree.left);
    const newRight = makeCopy2(tree.right);
    return newNode(tree.key, newLeft, newRight);
  }
};

const {
  newBinaryTree,
  add,
  print
} = require("../binary_search_tree.func.js");

let h = newBinaryTree();
h = add(h, 22);
h = add(h, 9);
h = add(h, 60);
h = add(h, 24);
h = add(h, 11);
h = add(h, 12);
h = add(h, 4);
h = add(h, 10);
h = add(h, 56);
h = add(h, 23);

print(h);

const k = makeCopy(h);

print(k);

const k2 = makeCopy2(h);

print(k2);
