/*
  DEALING WITH DUPS?
  STRUCTURE INDEPENDENT OF SEQUENCE OF WORDS
  BAD STRUCTURE: array of 26 links ... what about unicode? wasted space
  PRINT WORDS in order, FIND BY PREFIX in order
*/

const EOW = "■";

const newTrie = () => null;

const newNode = () => ({ links: {} });

const isEmpty = (trie) => !trie; // null or undefined

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
  } else if (!isEmpty(trie)) {
    Object.keys(trie.links).forEach((v) => printWords(trie.links[v], s + v));
  }
};

const printSortedWords = (trie, s = "") => {
  if (s.endsWith(EOW)) {
    console.log(s);
  } else if (!isEmpty(trie)) {
    Object.keys(trie.links)
      .sort()
      .forEach((v) => printWords(trie.links[v], s + v));
  }
};

const _add = (trie, [first, ...rest], data) => {
  if (first) {
    if (isEmpty(trie)) {
      trie = newNode();
    }
    if (first === EOW) {
      trie.links[first] = { data };
    } else {
      trie.links[first] = _add(trie.links[first], rest, data);
    }
  }
  return trie;
};

const add = (trie, wordToAdd, dataToAdd = wordToAdd) =>
  _add(trie, wordToAdd + EOW, dataToAdd);

const _remove = (trie, [first, ...rest]) => {
  if (isEmpty(trie)) {
    // nothing to do
  } else if (!first) {
    trie = null;
  } else {
    trie.links[first] = _remove(trie.links[first], rest);
    if (isEmpty(trie.links[first])) {
      delete trie.links[first];
      if (Object.keys(trie.links).length === 0) {
        trie = null;
      }
    }
  }
  return trie;
};

const remove = (trie, wordToRemove) => _remove(trie, wordToRemove + EOW);

const _find = (trie, [first, ...rest]) => {
  if (isEmpty(trie)) {
    return null;
  } else if (first === EOW) {
    return isEmpty(trie.links[first]) ? null : trie.links[first].data;
  } else {
    return _find(trie.links[first], rest);
  }
};

const find = (trie, wordToFind) =>
  !!wordToFind && _find(trie, wordToFind + EOW);

const notEow = (x) => (x === EOW ? "" : x);

const findByPrefix = (trie, [first, ...rest]) => {
  if (isEmpty(trie) || !trie.links) {
    return [""];
  } else if (!first) {
    return Object.keys(trie.links)
      .map((k) => findByPrefix(trie.links[k], "").map((x) => k + notEow(x)))
      .flat();
  } else {
    const t = trie.links[first];
    return isEmpty(t)
      ? []
      : findByPrefix(t, rest).map((x) => first + notEow(x));
  }
};

module.exports = {
  add,
  find,
  findByPrefix,
  isEmpty,
  newTrie,
  print,
  printWords,
  printSortedWords,
  remove
};
