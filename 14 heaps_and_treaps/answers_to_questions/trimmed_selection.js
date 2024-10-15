function selection_with_trim(k, values) {
  const heap = [];

  const _sinkDown = (i, h) => {
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
      _sinkDown(g, h);
    }
  };

  values.forEach((v) => heap.push(v));
  for (let i = Math.floor((heap.length - 1) / 2); i >= 0; i--) {
    _sinkDown(i, heap.length);
  }

  const maxPlace = 2 ** k - 1;
  if (heap.length > maxPlace) {
    heap.length = maxPlace;
  }

  for (let i = heap.length - 1; i >= heap.length - k; i--) {
    [heap[i], heap[0]] = [heap[0], heap[i]];
    _sinkDown(0, i);
  }

  return heap.slice(heap.length - k);
}

console.log(
  selection_with_trim(1, [9, 22, 60, 34, 24, 40, 4, 12, 56, 11, 63, 14, 1])
);
console.log(
  selection_with_trim(2, [9, 22, 60, 34, 24, 40, 4, 12, 56, 11, 63, 14, 1])
);
console.log(
  selection_with_trim(3, [9, 22, 60, 34, 24, 40, 4, 12, 56, 11, 63, 14, 1])
);
console.log(
  selection_with_trim(4, [9, 22, 60, 34, 24, 40, 4, 12, 56, 11, 63, 14, 1])
);
console.log(
  selection_with_trim(5, [9, 22, 60, 34, 24, 40, 4, 12, 56, 11, 63, 14, 1])
);
