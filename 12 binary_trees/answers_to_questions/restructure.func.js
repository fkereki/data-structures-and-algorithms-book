const {
  newBinaryTree,
  newNode,
  inOrder
} = require("../binary_search_tree.func.js");

const _buildPerfect = (keys) => {
  if (keys.length === 0) {
    return newBinaryTree();
  } else {
    const m = Math.floor(keys.length / 2);
    return newNode(
      keys[m],
      _buildPerfect(keys.slice(0, m)),
      _buildPerfect(keys.slice(m + 1))
    );
  }
};

const restructure = (tree) => {
  const keys = [];
  inOrder(tree, (x) => keys.push(x));
  return _buildPerfect(keys);
};

const { add, print } = require("../binary_search_tree.func.js");

let h = newBinaryTree();

h = add(h, 22);
h = add(h, 9);
h = add(h, 60);
h = add(h, 24);
h = add(h, 11);
h = add(h, 18);
h = add(h, 20);
h = add(h, 12);
h = add(h, 4);
h = add(h, 10);
h = add(h, 40);
h = add(h, 56);
h = add(h, 23);

print(h, "BEFORE");
h = restructure(h);
print(h, "AFTER ");
