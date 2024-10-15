const jumpSearch = (arr, key) => {
  const n = arr.length;
  let s = Math.max(2, Math.floor(Math.sqrt(n)));
  let i = 0;

  while (s > 0) {
    while (i + s < n && key >= arr[i + s]) {
      i += s;
    }
    s = s > 1 ? 1 : 0;
  }

  return i < n && key === arr[i] ? i : -1;
};

module.exports = jumpSearch;
