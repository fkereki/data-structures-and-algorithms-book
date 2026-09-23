const goesHigher = (a, b) => a > b;

const newBinomialHeap = () => [];

const newNode = (key) => ({
  key,
  right: null,
  down: null,
  up: null,
  degree: 0
});

const isEmpty = (heap) => heap.length === 0;

const _print = (t, s = "") => {
  if (t !== null) {
    console.log(s, t.key, `#${t.degree}`, t.up ? `P: ${t.up.key}` : "");
    _print(t.down, `${s}  D:`);
    _print(t.right, `${s}  R:`);
  }
};

const print = (heap) => {
  heap.forEach((t, i) => {
    _print(t, `Tree ${i}`);
  });
};

const _mergeA2B = (low, high) => {
  low.right = high.down;
  low.up = high;
  high.down = low;
  high.degree++;
  return high;
};

const merge = (heap1, heap2) => {
  const merged = [];
  heap1.forEach((v) => {
    merged[v.degree] = v;
  });

  let j = 0;
  while (j < heap2.length) {
    const i = heap2[j].degree;

    if (!(i in merged) || merged[i] === null) {
      merged[i] = heap2[j];
      j++;
    } else {
      if (goesHigher(heap2[j].key, merged[i].key)) {
        heap2[j] = _mergeA2B(merged[i], heap2[j]);
      } else {
        heap2[j] = _mergeA2B(heap2[j], merged[i]);
      }
      merged[i] = null;
    }
  }

  return merged.filter(Boolean);
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

const top = (heap) => (isEmpty(heap) ? undefined : heap[_findTop(heap)].key);

const add = (heap, keyToAdd) => {
  const newHeap = newNode(keyToAdd);
  return [merge(heap, [newHeap]), newHeap];
};

const remove = (heap) => {
  if (isEmpty(heap)) {
    throw new Error("Empty heap");
  }

  const top = _findTop(heap);
  const heapTop = heap[top].key;

  const newTrees = [];
  let bt = heap[top].down;
  while (bt) {
    newTrees.push(bt);
    const nextBt = bt.right;
    bt.right = null;
    bt.up = null;
    bt = nextBt;
  }

  heap.splice(top, 1);
  return [merge(heap, newTrees), heapTop];
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
    _bubbleUp(heap, node);
    return heap;
  }
};

module.exports = {
  newBinomialHeap,
  isEmpty,
  add,
  top,
  remove,
  changeKey,
  print
};
