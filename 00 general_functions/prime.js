const isPrime = (n) => {
  if (n <= 3) {
    return true;
  } else if (n % 2 === 0) {
    return false;
  }

  for (let d = 3, q = n; d < q; d += 2) {
    q = n / d;
    if (Math.floor(q) === q) {
      return false;
    }
  }
  return true;
};

const findNextPrime = (n) => {
  while (!isPrime(n)) {
    n++;
  }
  return n;
};

module.exports = { isPrime, findNextPrime };
