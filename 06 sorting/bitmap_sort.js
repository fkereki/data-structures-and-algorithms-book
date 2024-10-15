const bitmapSort = (arr, from = 0, to = arr.length - 1) => {
  const copy = arr.slice(from, to + 1);
  const minKey = Math.min(...copy);
  const maxKey = Math.max(...copy);

  const bitmap = new Array(maxKey - minKey + 1).fill(false);
  copy.forEach((v) => {
    if (bitmap[v - minKey]) {
      throw new Error("Cannot sort... duplicate values");
    } else {
      bitmap[v - minKey] = true;
    }
  });

  let k = from;
  bitmap.forEach((v, i) => {
    if (v) {
      arr[k] = i + minKey;
      k++;
    }
  });

  return arr;
};

module.exports = bitmapSort;
