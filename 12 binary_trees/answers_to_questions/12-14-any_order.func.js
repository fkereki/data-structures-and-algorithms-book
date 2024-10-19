const {
  newBinaryTree,
  isEmpty,
  add,
  print
} = require("../binary_search_tree.func.js");

const anyOrder = (tree, order, visit = (x) => console.log(x)) => {
  if (!isEmpty(tree)) {
    order === "PRE" && visit(tree.key);
    anyOrder(tree.left, order, visit);
    order === "IN" && visit(tree.key);
    anyOrder(tree.right, order, visit);
    order === "POST" && visit(tree.key);
  }
};

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

console.log("---");
anyOrder(h, "IN");
console.log("---");
anyOrder(h, "PRE");
console.log("---");
anyOrder(h, "POST");
console.log("---");
