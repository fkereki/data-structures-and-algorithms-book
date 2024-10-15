for (let num = 1, fact = 1; fact < fact + 1; num++) {
  fact *= num;
  console.log(`${num}=${fact}`);
}

for (let num = 1n, fact = 1n; fact < fact + 1n; num++) {
  fact *= num;
  console.log(`${num}=${fact}`);
}
