const fibo = (n) => {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibo(n - 1) + fibo(n - 2);
  }
};

for (let i = 0; i < 20; i++) {
  console.log(fibo(i));
}

module.exports = { fibo };
