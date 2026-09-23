const MAX_LEVEL = 32;

const newSkipList = () => ({
  value: -Infinity,
  next: [{ value: Infinity, next: [null] }]
});

const isEmpty = (sl) => sl.next[0].next[0] === null;

const print = (node) => {
  if (node) {
    console.log(
      node.value,
      node.next[0] ? JSON.stringify(node.next.map((x) => `${x.value}`)) : "[]"
    );
    print(node.next[0]);
  }
};

const _level = (sl) => sl.next.length - 1;

const _find = (node, currLevel, valueToFind) => {
  if (currLevel < 0) {
    return false;
  } else if (valueToFind === node.value) {
    return true;
  } else if (valueToFind >= node.next[currLevel].value) {
    return _find(node.next[currLevel], currLevel, valueToFind);
  } else {
    return _find(node, currLevel - 1, valueToFind);
  }
};

const find = (sl, valueToFind) => _find(sl, _level(sl), valueToFind);

const _add = (currNode, currLevel, newNode, newLevel) => {
  if (newNode.value > currNode.next[currLevel].value) {
    _add(currNode.next[currLevel], currLevel, newNode, newLevel);
  } else {
    if (currLevel <= newLevel) {
      newNode.next[currLevel] = currNode.next[currLevel];
      currNode.next[currLevel] = newNode;
    }
    if (currLevel > 0) {
      _add(currNode, currLevel - 1, newNode, newLevel);
    }
  }
};

const add = (sl, valueToAdd) => {
  let newLevel = 0;
  while (newLevel < MAX_LEVEL && Math.random() > 0.5) {
    newLevel++;
  }
  const newNode = { value: valueToAdd, next: new Array(newLevel) };

  let currLevel = _level(sl);
  while (newLevel >= currLevel) {
    sl.next[currLevel].next.push(null);
    sl.next.push(sl.next[currLevel]);
    currLevel++;
  }
  _add(sl, currLevel, newNode, newLevel);
  return sl;
};

const _remove = (currNode, currLevel, valueToRemove) => {
  if (valueToRemove > currNode.next[currLevel].value) {
    _remove(currNode.next[currLevel], currLevel, valueToRemove);
  } else {
    if (valueToRemove === currNode.next[currLevel].value) {
      currNode.next[currLevel] = currNode.next[currLevel].next[currLevel];
    }
    if (currLevel > 0) {
      _remove(currNode, currLevel - 1, valueToRemove);
    }
  }
};

const remove = (sl, valueToRemove) => {
  _remove(sl, _level(sl), valueToRemove);
  for (
    let level = _level(sl) - 1;
    level > 0 && sl.next[level].next[level] === null;
    level--
  ) {
    sl.next[level].next.splice(level, 1);
    sl.next.splice(level, 1);
  }
  return sl;
};

module.exports = {
  newSkipList,
  isEmpty,
  add,
  find,
  print,
  remove
};
