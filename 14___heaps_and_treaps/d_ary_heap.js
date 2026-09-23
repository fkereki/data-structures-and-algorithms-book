const { newHeap, isEmpty, top } = require("./heap.func.js");

const ORDER = 3; // with ORDER===2, we get classic heaps

const _bubbleUp = (heap, i) => {
  if (i > 0) {
    const p = Math.floor((i - 1) / ORDER);
    if (heap[i] > heap[p]) {
      [heap[p], heap[i]] = [heap[i], heap[p]];
      _bubbleUp(heap, p);
    }
  }
};

const add = (heap, keyToAdd) => {
  heap.push(keyToAdd);
  _bubbleUp(heap, heap.length - 1);
};

const _sinkDown = (heap, i, h) => {
  const first = ORDER * i + 1;
  const last = first + ORDER;
  let g = i;
  for (let j = first; j < last && j < h; j++) {
    if (heap[j] > heap[g]) {
      g = j;
    }
  }
  if (g !== i) {
    [heap[g], heap[i]] = [heap[i], heap[g]];
    _sinkDown(heap, g, h);
  }
};

const remove = (heap) => {
  const topKey = top(heap);
  if (!isEmpty(heap)) {
    heap[0] = heap[heap.length - 1];
    heap.length--;
    _sinkDown(heap, 0, heap.length);
  }
  return [heap, topKey];
};

module.exports = {
  newHeap,
  isEmpty,
  add,
  top,
  remove
};
