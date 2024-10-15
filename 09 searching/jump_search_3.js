const jumpSearch = (arr, key, levels = 3) => {
  const n = arr.length;
  const b = Math.max(2, Math.floor(arr.length ** (1 / levels)));

  let s = Math.floor(n / b);
  let i = 0;

  while (s > 0) {
    while (i + s < n && key >= arr[i + s]) {
      i += s;
    }
    s = Math.floor(s / b);
  }

  return i < n && key === arr[i] ? i : -1;
};

module.exports = jumpSearch;
