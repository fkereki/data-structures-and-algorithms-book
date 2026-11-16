// Based on the naive indexOf scan, but returning every match position.
const indicesOf_naive = (t, s, p = 0) => {
  const positions = [];

  if (s === "") {
    const start = Math.min(Math.max(0, p), t.length);
    return Array.from(
      { length: t.length - start + 1 },
      (_, i) => start + i
    );
  }

  const start = Math.max(0, p);
  for (let i = start; i <= t.length - s.length; i++) {
    let j;
    for (j = 0; j < s.length && t[i + j] === s[j]; j++) {}
    if (j === s.length) {
      positions.push(i);
    }
  }

  return positions;
};

module.exports = indicesOf_naive;
