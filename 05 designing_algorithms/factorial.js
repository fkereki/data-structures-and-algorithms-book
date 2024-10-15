const factorial = (n) => {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

for (let i = 0; i < 10; i++) {
  console.log(factorial(i));
}
