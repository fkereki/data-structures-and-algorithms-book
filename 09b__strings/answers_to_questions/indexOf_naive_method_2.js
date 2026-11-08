// Before calling, check that the receiver and search are strings and p is an integer from 0 to this.length.
String.prototype.indexOf_naive = function (search, p = 0) {
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
};

module.exports = String.prototype.indexOf_naive;
