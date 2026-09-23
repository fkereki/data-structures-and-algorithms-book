const goesHigher = (a, b) => a > b;

const newSkewHeap = () => null;

const newNode = (key, left = null, right = null) => ({ key, left, right });

const isEmpty = (heap) => heap === null;

const top = (heap) => (isEmpty(heap) ? undefined : heap.key);

const print = (tree, s = "") => {
  if (tree !== null) {
    console.log(s, tree.key);
    print(tree.left, `${s}  L:`);
    print(tree.right, `${s}  R:`);
  }
};

const merge = (heap1, heap2) => {
  if (isEmpty(heap2)) {
    return heap1;
  } else if (isEmpty(heap1)) {
    return heap2;
  } else if (goesHigher(heap1.key, heap2.key)) {
    [heap1.left, heap1.right] = [merge(heap2, heap1.right), heap1.left];
    return heap1;
  } else {
    return merge(heap2, heap1);

    /* Alternative:
    [heap2.left, heap2.right] = [merge(heap1, heap2.right), heap2.left];
    return heap2;
    */
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
    const topKey = top(heap);
    return [merge(heap.left, heap.right), topKey];
  }
};

module.exports = {
  add,
  isEmpty,
  merge,
  newSkewHeap,
  print,
  remove,
  top
};
