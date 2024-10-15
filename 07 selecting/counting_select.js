const countingSelect = (arr, k, from = 0, to = arr.length - 1) => {
  const copy = arr.slice(from, to + 1);
  const minKey = Math.min(...copy);
  const maxKey = Math.max(...copy);

  const count = new Array(maxKey - minKey + 1).fill(0);
  copy.forEach((v) => count[v - minKey]++);

  for (let i = minKey, j = from; i <= maxKey; i++) {
    if (count[i - minKey]) {
      j += count[i - minKey];
      if (j > k) {
        return i;
      }
    }
  }
};

module.exports = countingSelect;
