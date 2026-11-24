// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const { buildLps } = require("../indexOf_kmp");

const indicesOf_kmp = (t, s, p = 0) => {
  const n = t.length;
  const m = s.length;
  const positions = [];

  if (m === 0) {
    return Array.from({ length: n - p + 1 }, (_, i) => p + i);
  }

  const lps = buildLps(s);

  for (let i = p, j = 0; n - i >= m - j; ) {
    if (t[i] === s[j]) {
      i++;
      j++;
      if (j === m) {
        positions.push(i - j);
        j = lps[j - 1];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  return positions;
};

module.exports = indicesOf_kmp;
