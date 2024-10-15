const {
  newTree,
  add,
  print,
  inOrder
} = require("../binary_search_tree.func.js");

const sortByTraversal = (tree) => {
  const sorted = [];
  inOrder(tree, (k) => sorted.push(k));
  return sorted;
};

let h = newTree();
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

inOrder(h);
print(h);

console.log(sortByTraversal(h));
