// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const indexOf_z = (t, s, p = 0) => {
  if (s.length === 0) {
    return p;
  }

  const separator = Symbol();
  const sequence = new Array(s.length + 1 + t.length - p);
  let index = 0;

  for (let i = 0; i < s.length; i++) {
    sequence[index++] = s[i];
  }
  sequence[index++] = separator;
  for (let i = p; i < t.length; i++) {
    sequence[index++] = t[i];
  }

  const z = new Array(sequence.length).fill(0);
  for (let i = 1, left = 0, right = 0; i < sequence.length; i++) {
    if (i <= right) {
      z[i] = Math.min(right - i + 1, z[i - left]);
    }

    while (
      i + z[i] < sequence.length &&
      sequence[z[i]] === sequence[i + z[i]]
    ) {
      z[i]++;
    }

    if (i + z[i] - 1 > right) {
      left = i;
      right = i + z[i] - 1;
    }
  }

  for (let i = s.length + 1; i < sequence.length; i++) {
    if (z[i] >= s.length) {
      return p + i - s.length - 1;
    }
  }

  return -1;
};

module.exports = indexOf_z;