const jumpSearch = (arr, key) => {
  const n = arr.length;
  const s = Math.max(2, Math.floor(Math.sqrt(n)));
  let i = 0;

  while (i + s < n && key >= arr[i + s]) {
    i += s;
  }

  while (i + 1 < n && key >= arr[i + 1]) {
    i++;
  }

  return i < n && key === arr[i] ? i : -1;
};

module.exports = jumpSearch;
