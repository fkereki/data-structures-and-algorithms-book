// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const indicesOf_kmp = (t, s, p = 0) => {
  const positions = [];

  if (s.length === 0) {
    return Array.from(
      { length: t.length - p + 1 },
      (_, i) => p + i
    );
  }

  const prefixLengths = new Array(s.length).fill(0);
  for (let i = 1, length = 0; i < s.length; ) {
    if (s[i] === s[length]) {
      prefixLengths[i] = ++length;
      i++;
    } else if (length > 0) {
      length = prefixLengths[length - 1];
    } else {
      prefixLengths[i] = 0;
      i++;
    }
  }

  for (let i = p, j = 0; i < t.length; ) {
    if (t[i] === s[j]) {
      i++;
      j++;
      if (j === s.length) {
        positions.push(i - j);
        j = prefixLengths[j - 1];
      }
    } else if (j > 0) {
      j = prefixLengths[j - 1];
    } else {
      i++;
    }
  }

  return positions;
};

module.exports = indicesOf_kmp;
