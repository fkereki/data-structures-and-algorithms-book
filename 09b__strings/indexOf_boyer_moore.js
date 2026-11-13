// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const indexOf_boyer_moore = (t, s, p = 0) => {
  if (s.length === 0) {
    return p;
  }

  const lastOccurrence = new Map();
  for (let i = 0; i < s.length; i++) {
    lastOccurrence.set(s[i], i);
  }

  const goodSuffixShift = new Array(s.length + 1).fill(0);
  const borders = new Array(s.length + 1);
  let i = s.length;
  let j = s.length + 1;
  borders[i] = j;

  while (i > 0) {
    while (j <= s.length && s[i - 1] !== s[j - 1]) {
      if (goodSuffixShift[j] === 0) {
        goodSuffixShift[j] = j - i;
      }
      j = borders[j];
    }
    i--;
    j--;
    borders[i] = j;
  }

  j = borders[0];
  for (i = 0; i <= s.length; i++) {
    if (goodSuffixShift[i] === 0) {
      goodSuffixShift[i] = j;
    }
    if (i === j) {
      j = borders[j];
    }
  }

  for (let start = p; start <= t.length - s.length; ) {
    let mismatch = s.length - 1;
    while (
      mismatch >= 0 &&
      s[mismatch] === t[start + mismatch]
    ) {
      mismatch--;
    }

    if (mismatch < 0) {
      return start;
    }

    const badCharacterIndex = lastOccurrence.get(
      t[start + mismatch]
    );
    const badCharacterShift =
      badCharacterIndex === undefined
        ? mismatch + 1
        : Math.max(1, mismatch - badCharacterIndex);
    start += Math.max(
      badCharacterShift,
      goodSuffixShift[mismatch + 1]
    );
  }

  return -1;
};

module.exports = indexOf_boyer_moore;
