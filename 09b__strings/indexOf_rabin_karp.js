// Before calling, check that t and s are strings and p is an integer from 0 to t.length.
const indexOf_rabin_karp = (t, s, p = 0) => {
  if (s.length === 0) {
    return p;
  }

  if (s.length > t.length - p) {
    return -1;
  }

  const base = 257;
  const modulus = 1_000_003;
  let patternHash = 0;
  let textHash = 0;
  let highestPower = 1;

  for (let i = 0; i < s.length; i++) {
    patternHash =
      (patternHash * base + s.charCodeAt(i)) % modulus;
    textHash =
      (textHash * base + t.charCodeAt(p + i)) % modulus;
    if (i < s.length - 1) {
      highestPower = (highestPower * base) % modulus;
    }
  }

  const matchesAt = (start) => {
    for (let i = 0; i < s.length; i++) {
      if (t[start + i] !== s[i]) {
        return false;
      }
    }
    return true;
  };

  for (let start = p; start <= t.length - s.length; start++) {
    if (patternHash === textHash && matchesAt(start)) {
      return start;
    }

    if (start < t.length - s.length) {
      const leadingCharacter = t.charCodeAt(start);
      const nextCharacter = t.charCodeAt(start + s.length);
      textHash =
        (textHash -
          ((leadingCharacter * highestPower) % modulus) +
          modulus) %
        modulus;
      textHash = (textHash * base + nextCharacter) % modulus;
    }
  }

  return -1;
};

module.exports = indexOf_rabin_karp;
