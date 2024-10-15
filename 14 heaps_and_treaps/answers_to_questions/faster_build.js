const isEmpty = (heap) => heap.length === 0;

const top = (heap) => {
  if (isEmpty(heap)) {
    return undefined;
  } else {
    return heap[0];
  }
};

const _bubbleUp = (heap, i) => {
  if (i > 0) {
    const p = Math.floor((i - 1) / 2);
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
  const l = 2 * i + 1;
  const r = l + 1;
  let g = i;
  if (l < h && heap[l] > heap[g]) {
    g = l;
  }
  if (r < h && heap[r] > heap[g]) {
    g = r;
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

const newHeap = (values = []) => {
  const newH = [];
  values.forEach((v) => newH.push(v));
  for (let i = Math.floor((newH.length - 1) / 2); i >= 0; i--) {
    _sinkDown(newH, i, newH.length);
  }
  return newH;
};

module.exports = {
  newHeap,
  isEmpty,
  add,
  top,
  remove
};

const h = newHeap([22, 9, 60, 34, 24, 40, 11, 12, 56, 4]);
console.log(h);
