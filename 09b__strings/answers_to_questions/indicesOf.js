const indicesOf = (t, s, p = 0) => {
  const positions = [];
  let from = p;

  while (true) {
    const position = t.indexOf(s, from);
    if (position === -1) {
      break;
    }
    positions.push(position);
    if (s === "" && position === t.length) {
      break;
    }
    from = position + 1;
  }

  return positions;
};

module.exports = indicesOf;
