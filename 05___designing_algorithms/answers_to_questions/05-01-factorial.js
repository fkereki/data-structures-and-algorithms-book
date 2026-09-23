const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

for (let i = 0; i < 10; i++) {
  console.log(factorial(i));
}
