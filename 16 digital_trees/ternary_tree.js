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
      tree.middle =
        wordToAdd[0] === EOW
          ? { data }
          : _add(tree.middle, wordToAdd.substring(1), data);
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
      tree.middle =
        tree.key === EOW
          ? null
          : _remove(tree.middle, wordToRemove.substring(1));

      if (isEmpty(tree.middle)) {
        if (isEmpty(tree.left)) {
          tree = tree.right;
        } else if (isEmpty(tree.right)) {
          tree = tree.left;
        } else {
          let treeR = tree.right;
          let prev = null;
          while (!isEmpty(treeR.left)) {
            prev = treeR;
            treeR = treeR.left;
          }
          if (prev) {
            prev.left = treeR.right;
            treeR.right = tree.right;
          }

          treeR.left = tree.left;
          tree = treeR;
        }
      }
    } else {
      const side = wordToRemove < tree.key ? "left" : "right";
      tree[side] = _remove(tree[side], wordToRemove);
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

const words = [
  "BED",
  "ACE",
  "BADE",
  "BEAD",
  "BE",
  "BEE",
  "BET",
  "BEST",
  "BEEN",
  "BEER",
  "BEFORE"
];

words.forEach((w) => {
  let xx = newTernary();
  words.forEach((w2) => {
    xx = add(xx, w2);
  });
  xx = remove(xx, w);

  words.forEach((w3) => {
    const b = find(xx, w3);
    if (!!b !== (w !== w3)) {
      console.log("PROBLEMA!", b, w !== w3, w, w3);
    }
  });
});
console.log("yay!");

let xx = newTernary();
xx = add(xx, "FK");
xx = add(xx, "EG");
xx = remove(xx, "EG");
xx = remove(xx, "FK");
print(xx);
console.log(xx);

return;

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
