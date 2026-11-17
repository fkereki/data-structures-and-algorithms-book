// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const indexOf_kmp = (t, s, p = 0) => {
  if (s.length === 0) {
    return p;
  }

  const lps = new Array(s.length).fill(0);
  for (let i = 1, l = 0; i < s.length; ) {
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

  for (let i = p, j = 0; i < t.length; ) {
    if (t[i] === s[j]) {
      i++;
      j++;
      if (j === s.length) {
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
