const {
  newBinaryTree,
  newNode,
  isEmpty
} = require("../binary_search_tree.func.js");

const add = (tree, keyToAdd) => {
  if (isEmpty(tree)) {
    return newNode(keyToAdd);
  } else if (keyToAdd === tree.key) {
    throw new Error("No duplicate keys allowed");
  } else {
    const side = keyToAdd < tree.key ? "left" : "right";
    tree[side] = add(tree[side], keyToAdd);
    return tree;
  }
};

const { print } = require("../binary_search_tree.func.js");

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

console.log("Now an error...");
h = add(h, 11); // error!

print(h);
