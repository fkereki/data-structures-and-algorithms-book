const nextPowerOfTwo = (n) =>
  2 ** Math.max(0, Math.ceil(Math.log2(n)));

module.exports = { nextPowerOfTwo };
