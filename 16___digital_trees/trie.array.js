/*
  DEALING WITH DUPS?
  STRUCTURE INDEPENDENT OF SEQUENCE OF WORDS
  BAD STRUCTURE: array of 26 links ... what about unicode? wasted space
*/

const EOW = "■";

const ALPHABET = `${EOW}ABCDE`;

const newTrie = () => null;

const newNode = () => ({ links: new Array(ALPHABET.length).fill(null) });

const isEmpty = (trie) => !trie; // null or undefined

const print = (trie, s = "") => {
  if (!isEmpty(trie) && trie.links) {
    trie.links.forEach((t, v) => {
      if (!isEmpty(t)) {
        const w = ALPHABET[v];
        console.log(`${s}${w}`);
        print(t, `L  ${s}${w}`);
      }
    });
  }
};

const printWords = (trie, s = "") => {
  if (s.endsWith(EOW)) {
    console.log(s);
  } else if (!isEmpty(trie)) {
    trie.links.forEach((t, v) => printWords(t, s + ALPHABET[v]));
  }
};

const _add = (trie, [first, ...rest], data) => {
  if (first) {
    if (isEmpty(trie)) {
      trie = newNode();
    }
    const i = ALPHABET.indexOf(first);
    if (first === EOW) {
      trie.links[i] = { data };
    } else {
      trie.links[i] = _add(trie.links[i], rest, data);
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
    const i = ALPHABET.indexOf(first);
    trie.links[i] = _remove(trie.links[i], rest);
    if (trie.links.every((t) => isEmpty(t))) {
      trie = null;
    }
  }
  return trie;
};

const remove = (trie, wordToRemove) => _remove(trie, wordToRemove + EOW);

const _find = (trie, [first, ...rest]) => {
  const i = ALPHABET.indexOf(first);
  if (isEmpty(trie)) {
    return null;
  } else if (first === EOW) {
    return isEmpty(trie.links[i]) ? null : trie.links[i].data;
  } else {
    return _find(trie.links[i], rest);
  }
};

const find = (trie, wordToFind) =>
  !!wordToFind && _find(trie, wordToFind + EOW);

const _findByPrefix = (trie, [first, ...rest]) => {
  if (isEmpty(trie) || !trie.links) {
    return [""];
  } else if (!first) {
    return trie.links
      .map((t, v) => _findByPrefix(t, "").map((x) => ALPHABET[v] + x))
      .flat();
  } else {
    const t = trie.links[ALPHABET.indexOf(first)];
    return isEmpty(t) ? [] : _findByPrefix(t, rest).map((x) => first + x);
  }
};

const findByPrefix = (trie, word) =>
  _findByPrefix(trie, word)
    .filter((v) => v.endsWith(EOW))
    .map((v) => v.replace(EOW, ""));

module.exports = {
  add,
  find,
  findByPrefix,
  isEmpty,
  newTrie,
  print,
  printWords,
  remove
};
