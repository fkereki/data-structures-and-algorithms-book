const { isEmpty } = require("../binary_search_tree.func.js");

const getHeight = (tree) =>
  isEmpty(tree)
    ? 0
    : 1 + Math.max(getHeight(tree.left), getHeight(tree.right));

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
h = add(h, 56);
h = add(h, 23);

print(h);
console.log(getHeight(h));
