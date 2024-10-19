const newHeap = () => [];

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
  return heap;
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

const removeMiddle = (heap, k) => {
  if (isEmpty(heap)) {
    throw new Error("Empty heap; cannot remove");
  } else if (k < 0 || k >= heap.length) {
    throw new Error("Not valid argument for removeMiddle");
  } else {
    [heap[k], heap[heap.length - 1]] = [heap[heap.length - 1], heap[k]];
    heap.pop();
    _bubbleUp(heap, k);
    _sinkDown(heap, k, heap.length);
  }
  return heap;
};

module.exports = {
  newHeap,
  isEmpty,
  add,
  top,
  remove
};

let h = newHeap();
add(h, 22);
add(h, 9);
add(h, 60);
add(h, 34);
add(h, 4);
add(h, 24);
add(h, 40);
add(h, 11);
add(h, 12);
add(h, 56);

console.log(h);

h = removeMiddle(h, 1);
console.log(h);
