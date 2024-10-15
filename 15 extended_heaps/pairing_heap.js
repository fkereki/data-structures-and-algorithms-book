const goesHigher = (a, b) => a > b;

const newPairingHeap = () => null;

const newNode = (key) => ({ key, up: null, down: null, right: null });

const isEmpty = (heap) => heap === null; // || heap.key === undefined;

const top = (heap) => (isEmpty(heap) ? undefined : heap.key);

const print = (tree, s = "") => {
  if (tree) {
    console.log(s, tree.key);
    print(tree.down, `${s}  L`);
    print(tree.right);
  }
};

const merge = (heap1, heap2) => {
  if (isEmpty(heap2)) {
    return heap1;
  } else if (isEmpty(heap1)) {
    return heap2;
  } else if (goesHigher(heap1.key, heap2.key)) {
    [heap2.right, heap2.up, heap1.down] = [heap1.down, heap1, heap2];
    return heap1;
  } else {
    [heap1.right, heap1.up, heap2.down] = [heap2.down, heap2, heap1];
    return heap2;
  }
};

const _mergeByPairs = (heaps) => {
  if (heaps.length === 0) {
    return newPairingHeap();
  } else if (heaps.length === 1) {
    return heaps[0];
  } else {
    return merge(merge(heaps[0], heaps[1]), _mergeByPairs(heaps.slice(2)));
  }
};

const add = (heap, keyToAdd) => {
  const newHeap = newNode(keyToAdd);
  return [merge(heap, newHeap), newHeap];
};

const remove = (heap) => {
  if (isEmpty(heap)) {
    throw new Error("Empty heap; cannot remove");
  } else {
    const top = heap.key;

    const children = [];
    let child = heap.down;
    while (!isEmpty(child)) {
      const next = child.right;
      child.right = null;
      children.push(child);
      child = next;
    }

    return [_mergeByPairs(children), top];
  }
};

const changeKey = (heap, node, newKey) => {
  if (isEmpty(heap)) {
    throw new Error("Heap is empty!");
  } else if (!goesHigher(newKey, node.key)) {
    throw new Error("New value should go higher than old value");
  } else {
    node.key = newKey;
    const parent = node.up;
    if (parent && goesHigher(newKey, parent.key)) {
      if (parent.down === node) {
        parent.down = node.right;
      } else {
        let child = parent.down;
        while (child.right !== node) {
          child = child.right;
        }
        child.right = node.right;
      }
      node.right = null;
      heap = merge(heap, node);
    }

    return heap;
  }
};

module.exports = {
  newPairingHeap,
  isEmpty,
  add,
  top,
  changeKey,
  remove,
  print
};
