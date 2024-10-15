const {
  inOrder,
  isEmpty,
  maxKey,
  minKey,
  newNode,
  postOrder,
  preOrder,
  print
} = require("./binary_search_tree.func.js");

const newSplayTree = () => null;

const _rotate = (tree, side) => {
  const otherSide = side === "left" ? "right" : "left";
  const auxTree = tree[side];
  tree[side] = auxTree[otherSide];
  auxTree[otherSide] = tree;
  return auxTree;
};

const _splay = (tree, keyToUp) => {
  if (isEmpty(tree) || keyToUp === tree.key) {
    return tree;
  } else {
    const side = keyToUp < tree.key ? "left" : "right";
    if (isEmpty(tree[side])) {
      return tree;
    } else if (keyToUp === tree[side].key) {
      return _rotate(tree, side);
    } else {
      if (keyToUp <= tree[side].key === keyToUp <= tree.key) {
        tree[side][side] = _splay(tree[side][side], keyToUp);
        tree = _rotate(tree, side);
      } else {
        const other = side === "left" ? "right" : "left";
        tree[side][other] = _splay(tree[side][other], keyToUp);
        if (!isEmpty(tree[side][other])) {
          tree[side] = _rotate(tree[side], other);
        }
      }
      return isEmpty(tree[side]) ? tree : _rotate(tree, side);
    }
  }
};

const _splayMinimum = (tree) => {
  if (isEmpty(tree) || isEmpty(tree.left)) {
    return tree;
  } else {
    tree.left.left = _splayMinimum(tree.left.left);
    tree = _rotate(tree, "left");
    return isEmpty(tree.left) ? tree : _rotate(tree, "left");
  }
};

const find = (tree, keyToFind) => {
  if (!isEmpty(tree)) {
    tree = _splay(tree, keyToFind);
  }

  return [tree, !isEmpty(tree) && tree.key === keyToFind];
};

const add = (tree, keyToAdd) => {
  const newTree = newNode(keyToAdd);
  if (!isEmpty(tree)) {
    tree = _splay(tree, keyToAdd);
    const [side, other] =
      keyToAdd <= tree.key ? ["left", "right"] : ["right", "left"];
    newTree[side] = tree[side];
    newTree[other] = tree;
    tree[side] = null;
  }
  return newTree;
};

const remove = (tree, keyToRemove) => {
  if (!isEmpty(tree)) {
    tree = _splay(tree, keyToRemove);
    if (keyToRemove === tree.key) {
      if (isEmpty(tree.left) && isEmpty(tree.right)) {
        tree = null;
      } else if (isEmpty(tree.left)) {
        tree = tree.right;
      } else if (isEmpty(tree.right)) {
        tree = tree.left;
      } else {
        const oldLeft = tree.left;
        tree = _splayMinimum(tree.right);
        tree.left = oldLeft;
      }
    }
  }
  return tree;
};

module.exports = {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  newSplayTree,
  postOrder,
  preOrder,
  print,
  remove
};
