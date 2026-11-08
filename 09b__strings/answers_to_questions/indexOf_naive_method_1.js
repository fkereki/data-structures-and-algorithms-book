Object.defineProperty(String.prototype, "indexOf_naive", {
  configurable: true,
  writable: true,
  value: function (search, p = 0) {
    const text = this;

    for (let i = p; i <= text.length - search.length; i++) {
      let j;
      for (
        j = 0;
        j < search.length && text[i + j] === search[j];
        j++
      ) {}
      if (j === search.length) {
        return i;
      }
    }

    return -1;
  }
});

module.exports = String.prototype.indexOf_naive;
