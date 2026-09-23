const EOW = "■";

const newTrie = () => null;

const newNode = () => ({ links: new Map() });

const isEmpty = (trie) => !trie; // null or undefined

const print = (trie, s = "") => {
  if (!isEmpty(trie) && trie.links) {
    trie.links.forEach((tr, ch) => {
      console.log(`${s}${ch}`);
      print(tr, `L  ${s}${ch}`);
    });
  }
};

const printWords = (trie, s = "") => {
  if (s.endsWith(EOW)) {
    console.log(s.replace(EOW, ""));
  } else if (!isEmpty(trie)) {
    for (const [key, value] of trie.links) {
      printWords(value, s + key);
    }
  }
};

const _add = (trie, [first, ...rest], data) => {
  if (first) {
    if (isEmpty(trie)) {
      trie = newNode();
    }
    if (first === EOW) {
      trie.links.set(first, { data });
    } else {
      trie.links.set(first, _add(trie.links.get(first), rest, data));
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
    trie.links.set(first, _remove(trie.links.get(first), rest));
    if (isEmpty(trie.links.get(first))) {
      trie.links.delete(first);
      if (trie.links.size === 0) {
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
    return isEmpty(trie.links.get(first)) ? null : trie.links.get(first).data;
  } else {
    return _find(trie.links.get(first), rest);
  }
};

const find = (trie, wordToFind) =>
  !!wordToFind && _find(trie, wordToFind + EOW);

const notEow = (x) => (x === EOW ? "" : x);

const findByPrefix = (trie, [first, ...rest]) => {
  if (isEmpty(trie) || !trie.links) {
    return [""];
  } else if (!first) {
    return Array.from(trie.links, ([key]) => key)
      .map((k) =>
        findByPrefix(trie.links.get(k), "").map((x) => k + notEow(x))
      )
      .flat();
  } else {
    const t = trie.links.get(first);
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
  remove
};
