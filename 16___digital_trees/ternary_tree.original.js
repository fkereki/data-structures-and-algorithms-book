/*
  what about sharing a newNode(EOW)?
  what happens with dup keys?
*/

const EOW = "■";

const newTernary = () => null;

const newNode = (key) => ({
  key,
  left: null,
  right: null,
  middle: null
});

const isEmpty = (tree) => tree === null;

const print = (tree, s = "") => {
  if (tree) {
    tree.key && console.log(s, tree.key.trim() || "EOW");
    tree.data && console.log("DATA", tree.data);
    tree.left && print(tree.left, `${s}  L:`);
    tree.middle && print(tree.middle, `${s}  M:`);
    tree.right && print(tree.right, `${s}  R:`);
  }
};

const printWords = (tree, s = "") => {
  if (tree) {
    if (tree.key === EOW) {
      console.log(s, ">>>", tree.middle.data);
    } else {
      printWords(tree.middle, s + tree.key);
    }
    printWords(tree.left, s);
    printWords(tree.right, s);
  }
};

const _find = (tree, wordToFind) => {
  if (isEmpty(tree)) {
    return false;
  } else if (wordToFind.length === 0) {
    return tree.data;
  } else if (tree.key === wordToFind[0]) {
    return _find(tree.middle, wordToFind.substring(1));
  } else {
    return _find(wordToFind < tree.key ? tree.left : tree.right, wordToFind);
  }
};

const find = (trie, wordToFind) =>
  !!wordToFind && _find(trie, wordToFind + EOW);

const _add = (tree, wordToAdd, data) => {
  if (wordToAdd.length > 0) {
    if (isEmpty(tree)) {
      tree = newNode(wordToAdd[0]);
    }
    if (tree.key === wordToAdd[0]) {
      if (wordToAdd[0] === EOW) {
        tree.middle = { data };
      } else {
        tree.middle = _add(tree.middle, wordToAdd.substring(1), data);
      }
    } else {
      const side = wordToAdd < tree.key ? "left" : "right";
      tree[side] = _add(tree[side], wordToAdd, data);
    }
  }
  return tree;
};

const add = (tree, wordToAdd, data = wordToAdd) =>
  _add(tree, wordToAdd + EOW, data);

const _remove = (tree, wordToRemove) => {
  if (isEmpty(tree)) {
    // nothing to do
  } else if (wordToRemove.length === 0) {
    tree = null;
  } else {
    if (wordToRemove[0] === tree.key) {
      if (tree.key === EOW) {
        tree = tree.right; // there can be no left subtree
      } else {
        tree.middle = _remove(tree.middle, wordToRemove.substring(1));
      }
    } else {
      const side = wordToRemove < tree.key ? "left" : "right";
      tree[side] = _remove(tree[side], wordToRemove);
    }

    if (
      !isEmpty(tree) &&
      isEmpty(tree.middle) &&
      isEmpty(tree.left) &&
      isEmpty(tree.right)
    ) {
      tree = null;
    }
  }

  return tree;
};

const remove = (tree, wordToRemove) => _remove(tree, wordToRemove + EOW);

module.exports = {
  add,
  find,
  isEmpty,
  newTernary,
  print,
  printWords,
  remove
};

let xx = newTernary();

console.log("SHOULD BE EMPTY - true expected", isEmpty(xx));

xx = add(xx, "BED");
xx = add(xx, "BE");
xx = add(xx, "BEE");
xx = add(xx, "ACE");
xx = add(xx, "ADD");
xx = add(xx, "ADDED");
xx = add(xx, "BADE");
//xx = add(xx, "BEAD");
print(xx);
console.log("SHOULD NOT BE EMPTY - false expected", isEmpty(xx));

console.log(JSON.stringify(xx));
//print(xx);
console.log("PRINTWORDS");
printWords(xx);
console.log("***********");
xx = remove(xx, "BED");
print(xx);
printWords(xx);
return;

console.log("A x   ", find(xx, "A"));
console.log("ACE   ", find(xx, "ACE"));
console.log("ACERx ", find(xx, "ACER"));
console.log("ADD   ", find(xx, "ADD"));
console.log("ADDED ", find(xx, "ADDED"));
console.log("BEAD  ", find(xx, "BEAD"));
console.log("BEE   ", find(xx, "BEE"));
console.log("BEADDx", find(xx, "BEADED"));

console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));
console.log("------------------");
xx = remove(xx, "BEE");
console.log("A  ", find(xx, "A"));
console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));
console.log("------------------");
xx = remove(xx, "BED");
console.log("A  ", find(xx, "A"));
console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));
console.log("------------------");
xx = remove(xx, "AD");
console.log("A  ", find(xx, "A"));
console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));

print(xx);
printWords(xx);
