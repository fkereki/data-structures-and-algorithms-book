const merge = (heap1, heap2) => {
  if (isEmpty(heap2)) {
    return heap1;
  } else if (isEmpty(heap1)) {
    return heap2;
  } else if (goesHigher(heap1.key, heap2.key)) {
    [heap1.left, heap1.right] = [merge(heap2, heap1.right), heap1.left];
    return heap1;
  } else {
    [heap2.left, heap2.right] = [merge(heap1, heap2.right), heap2.left];
    return heap2;
  }
};
