const bitmapSelect = (arr, k, from = 0, to = arr.length - 1) => {
  const copy = arr.slice(from, to + 1);
  const minKey = Math.min(...copy);
  const maxKey = Math.max(...copy);

  const bitmap = new Array(maxKey - minKey + 1).fill(false);
  copy.forEach((v) => {
    if (bitmap[v - minKey]) {
      throw new Error("Cannot select... duplicate values");
    } else {
      bitmap[v - minKey] = true;
    }
  });

  for (let i = minKey, j = from; i <= maxKey; i++) {
    if (bitmap[i - minKey]) {
      if (j === k) {
        return i;
      }
      j++;
    }
  }
};

module.exports = bitmapSelect;
