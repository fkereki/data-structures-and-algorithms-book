// Before calling, check that the receiver and search are strings and p is an integer from 0 to this.length.
String.prototype.indexOf_naive = function (s, p = 0) {
  const t = this;

  for (let i = p; i <= t.length - s.length; i++) {
    let j;
    for (j = 0; j < s.length && t[i + j] === s[j]; j++) {}
    if (j === s.length) {
      return i;
    }
  }

  return -1;
};

module.exports = String.prototype.indexOf_naive;
