// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const indexOf_horspool = (t, s, p = 0) => {
  if (s.length === 0) {
    return p;
  }

  const shifts = new Map();
  for (let i = 0; i < s.length - 1; i++) {
    shifts.set(s[i], s.length - i - 1);
  }

  for (let i = p; i <= t.length - s.length; ) {
    let j = s.length - 1;
    while (j >= 0 && t[i + j] === s[j]) {
      j--;
    }

    if (j < 0) {
      return i;
    }

    i += shifts.get(t[i + s.length - 1]) ?? s.length;
  }

  return -1;
};

module.exports = indexOf_horspool;
