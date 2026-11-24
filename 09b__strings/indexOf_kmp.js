// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const buildLps = (s) => {
  const m = s.length;
  const lps = new Array(m).fill(0);
  for (let i = 1, l = 0; i < m; ) {
    if (s[i] === s[l]) {
      lps[i] = ++l;
      i++;
    } else if (l > 0) {
      l = lps[l - 1];
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
};

const indexOf_kmp = (t, s, p = 0) => {
  const n = t.length;
  const m = s.length;

  if (m === 0) {
    return p;
  }

  const lps = buildLps(s);

  for (let i = p, j = 0; n - i >= m - j; ) {
    if (t[i] === s[j]) {
      i++;
      j++;
      if (j === m) {
        return i - j;
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  return -1;
};

module.exports = indexOf_kmp;
module.exports.buildLps = buildLps;
