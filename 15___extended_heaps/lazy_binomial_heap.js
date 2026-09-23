const goesHigher = (a, b) => a > b;

const newLazyBinomialHeap = () => ({
  top: undefined,
  trees: []
});

const newNode = (key) => ({
  key,
  degree: 0,
  right: null,
  down: null,
  up: null
});

const isEmpty = (heap) => heap.trees.length === 0;

const top = (heap) => (isEmpty(heap) ? undefined : heap.top);

const _print = (t, s = "") => {
  if (t) {
    console.log(s, t.key, `#${t._degree}`, t._up ? `P: ${t._up.key}` : "");
    _print(t.down, `${s}  D:`);
    _print(t.right, `${s}  R:`);
  }
};

const print = (heap) => {
  heap.trees.forEach((t, i) => {
    _print(t, `Tree ${i}`);
  });
};

const _mergeA2B = (low, high) => {
  low.right = high.down;
  low._up = high;
  high.down = low;
  high._degree++;

  return high;
};

const merge = (heap1, heap2) => {
  const merged = [];
  heap1.trees.forEach((v) => {
    merged[v._degree] = v;
  });

  let j = 0;
  while (j < heap2.trees.length) {
    const i = heap2.trees[j]._degree;

    if (!(i in merged) || merged[i] === null) {
      merged[i] = heap2.trees[j];
      j++;
    } else {
      if (goesHigher(heap2.trees[j].key, merged[i].key)) {
        heap2.trees[j] = _mergeA2B(merged[i], heap2.trees[j]);
      } else {
        heap2.trees[j] = _mergeA2B(heap2.trees[j], merged[i]);
      }
      merged[i] = null;
    }
  }

  return {
    top: goesHigher(heap1.top, heap2.top) ? heap1.top : heap2.top,
    trees: merged.filter(Boolean)
  };
};

const _findTop = (trees) => {
  let top;
  trees.forEach((v, i) => {
    if (top === undefined || goesHigher(v.key, trees[top].key)) {
      top = i;
    }
  });
  return top;
};

const add = (heap, keyToAdd) => {
  const newHeap = newNode(keyToAdd);

  heap.trees.push(newHeap);

  if (heap.top === undefined || goesHigher(keyToAdd, heap.top)) {
    heap.top = keyToAdd;
  }

  return [heap, newHeap];
};

const remove = (heap) => {
  if (isEmpty(heap)) {
    throw new Error("Empty heap");
  }

  const heapTop = heap.top;

  const top = _findTop(heap.trees);

  let bt = heap.trees[top].down;
  while (bt) {
    heap.trees.push(bt);
    const nextBt = bt.right;
    bt.right = null;
    bt._up = null;
    bt = nextBt;
  }

  heap.trees.splice(top, 1);
  const newHeap = merge(newLazyBinomialHeap(), {
    top: undefined,
    trees: heap.trees
  });

  newHeap.top =
    newHeap.trees.length === 0
      ? undefined
      : newHeap.trees[_findTop(newHeap.trees)].key;

  return [newHeap, heapTop];
};

const _bubbleUp = (heap, node) => {
  if (node.up && goesHigher(node.key, node.up.key)) {
    const parent = node.up;
    [
      node.up,
      node.down,
      node.right,
      node.degree,
      parent.up,
      parent.down,
      parent.right,
      parent.degree
    ] = [
      parent.up,
      parent,
      parent.right,
      parent.degree,
      node,
      node.down,
      node.right,
      node.degree
    ];

    if (node.up) {
      _bubbleUp(heap, node);
    } else {
      const i = heap.findIndex((v) => v === parent);
      heap[i] = node;
    }
  }
};

const changeKey = (heap, node, newKey) => {
  if (isEmpty(heap)) {
    throw new Error("Heap is empty!");
  } else if (!goesHigher(newKey, node.key)) {
    throw new Error("New value should go higher than old value");
  } else {
    node.key = newKey;
    _bubbleUp(heap, node, newKey);
    heap.top =
      heap.trees.length === 0
        ? undefined
        : heap.trees[_findTop(heap.trees)].key;

    return heap;
  }
};

module.exports = {
  newLazyBinomialHeap,
  isEmpty,
  add,
  top,
  remove,
  changeKey,
  merge,
  print
};
