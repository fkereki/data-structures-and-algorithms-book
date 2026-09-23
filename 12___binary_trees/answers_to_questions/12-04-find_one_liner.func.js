const { isEmpty } = require("../binary_search_tree.func.js");

const find = (tree, keyToFind) =>
  !isEmpty(tree) &&
  (keyToFind === tree.key ||
    find(tree[keyToFind < tree.key ? "left" : "right"], keyToFind));

module.exports.find = find;
