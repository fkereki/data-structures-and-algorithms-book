// Before calling, check that t and s are strings and p is an integer from 0 to t.length.

const indexOf_naive = (t, s, p = 0) => {
  for (let i = p; i <= t.length - s.length; i++) {
    let j;
    for (j = 0; j < s.length && t[i + j] === s[j]; j++) {}
    if (j === s.length) {
      return i;
    }
  }

  return -1;
};

module.exports = indexOf_naive;
