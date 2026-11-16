Object.defineProperty(String.prototype, "indexOf_naive", {
  configurable: true,
  writable: true,
  value: function (s, p = 0) {
    const t = this;

    for (let i = p; i <= t.length - s.length; i++) {
      let j;
      for (j = 0; j < s.length && t[i + j] === s[j]; j++) {}
      if (j === s.length) {
        return i;
      }
    }

    return -1;
  }
});

module.exports = String.prototype.indexOf_naive;
