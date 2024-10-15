const EOW = "■";

const newRadixTree = () => null;

const newNode = () => ({ links: {} });

const isEmpty = (rt) => !rt; // null or undefined

const print = (trie, s = "") => {
  if (!isEmpty(trie) && trie.links) {
    Object.keys(trie.links).forEach((v) => {
      console.log(`${s}${v}`);
      print(trie.links[v], `L  ${s}${v}`);
    });
  }
};

const printWords = (trie, s = "") => {
  if (s.endsWith(EOW)) {
    console.log(s.replace(EOW, ""));
  } else {
    Object.keys(trie.links).forEach((v) => printWords(trie.links[v], s + v));
  }
};

const _commonLength = (str1, str2) => {
  let i = 0;
  while (str1[i] && str1[i] === str2[i]) {
    i++;
  }
  return i;
};

const _find = (trie, wordToFind) => {
  if (isEmpty(trie)) {
    return false;
  } else {
    const linkWord = Object.keys(trie.links).find(
      (v) => v[0] === wordToFind[0]
    );

    if (linkWord) {
      if (wordToFind === linkWord) {
        return trie.links[linkWord].data;
      } else {
        const common = _commonLength(linkWord, wordToFind);

        return _find(
          trie.links[linkWord.substring(0, common)],
          wordToFind.substring(common)
        );
      }
    } else {
      return false;
    }
  }
};

const find = (trie, wordToFind) =>
  !!wordToFind && _find(trie, wordToFind + EOW);

const _add = (trie, wordToAdd, data) => {
  if (wordToAdd) {
    if (isEmpty(trie)) {
      trie = newNode();
      trie.links[wordToAdd] = { data };
    } else {
      const linkWord = Object.keys(trie.links).find(
        (v) => v[0] === wordToAdd[0]
      );
      if (linkWord) {
        const common = _commonLength(linkWord, wordToAdd);
        const prefix = linkWord.substring(0, common);
        const oldSuffix = linkWord.substring(common);
        const newSuffix = wordToAdd.substring(common);

        if (linkWord === prefix) {
          trie.links[linkWord] = _add(trie.links[linkWord], newSuffix, data);
        } else {
          trie.links[prefix] = {
            links: {
              [oldSuffix]: trie.links[linkWord],
              [newSuffix]: { data }
            }
          };
          delete trie.links[linkWord];
        }
      } else {
        trie.links[wordToAdd] = { data };
      }
    }
  }
  return trie;
};

const add = (trie, wordToAdd, dataToAdd = wordToAdd) =>
  _add(trie, wordToAdd + EOW, dataToAdd);

const _remove = (trie, wordToRemove) => {
  if (!isEmpty(trie) && wordToRemove > "") {
    const linkWord = Object.keys(trie.links).find(
      (v) => v[0] === wordToRemove[0]
    );
    if (linkWord && wordToRemove.startsWith(linkWord)) {
      const common = _commonLength(linkWord, wordToRemove);
      const prefix = linkWord.substring(0, common);

      if (wordToRemove === prefix) {
        delete trie.links[prefix];
      } else {
        trie.links[prefix] = _remove(
          trie.links[prefix],
          wordToRemove.substring(common)
        );
        if (Object.keys(trie.links[prefix].links).length === 1) {
          const single = Object.keys(trie.links[prefix].links)[0];
          trie.links[prefix + single] = trie.links[prefix].links[single];
          delete trie.links[prefix];
        }
      }
    }
  }
  return trie;
};

const remove = (trie, wordToRemove) => {
  if (!isEmpty(trie)) {
    _remove(trie, wordToRemove + EOW);
    if (Object.keys(trie.links).length === 0) {
      trie = null;
    }
  }
  return trie;
};

module.exports = {
  add,
  find,
  isEmpty,
  newRadixTree,
  print,
  printWords,
  remove
};

let xx = newRadixTree();

xx = add(xx, "ACE");
xx = add(xx, "AD");
xx = add(xx, "BE");
xx = add(xx, "BED", "bed1");
xx = add(xx, "BED", "bed2");
xx = add(xx, "BEE");
xx = add(xx, "BADE");

console.log(JSON.stringify(xx));
print(xx);
printWords(xx);
xx = add(xx, "BAD");
console.log(JSON.stringify(xx));
xx = add(xx, "ABE");
console.log(JSON.stringify(xx));
xx = remove(xx, "BED");
xx = add(xx, "ABE");
console.log(JSON.stringify(xx));
print(xx);
printWords(xx);
return;

console.log(find(xx, "ACE"), "<");
console.log(find(xx, "AD"), "<");
console.log(find(xx, "BE"), "<");
console.log(find(xx, "BED"), "<");
console.log(find(xx, "BEE"), "<");
console.log(find(xx, "BADE"), "<");
console.log(find(xx, "ACED"), "<");
console.log(find(xx, "CAB"), "<");
console.log(find(xx, ""), "<");
