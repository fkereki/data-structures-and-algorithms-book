const fibo = (n) => {
  if (n < 2) {
    return n;
  } else {
    let a = 0;
    let b = 1;
    while (n > 1) {
      [a, b] = [b, a + b];
      n--;
    }
    return b;
  }
};

for (let i = 0; i < 20; i++) {
  console.log(fibo(i));
}

module.exports = { fibo };
