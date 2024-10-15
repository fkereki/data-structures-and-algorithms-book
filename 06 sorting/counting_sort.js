const countingSort = (arr, from = 0, to = arr.length - 1) => {
  const copy = arr.slice(from, to + 1);
  const minKey = Math.min(...copy);
  const maxKey = Math.max(...copy);

  const count = new Array(maxKey - minKey + 1).fill(0);
  copy.forEach((v) => count[v - minKey]++);

  const place = new Array(maxKey - minKey + 1).fill(0);
  place.forEach((v, i) => {
    place[i] = i === 0 ? from : place[i - 1] + count[i - 1];
  });

  copy.forEach((v) => {
    arr[place[v - minKey]] = v;
    place[v - minKey]++;
  });

  return arr;
};

module.exports = countingSort;
