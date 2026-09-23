const { fibo } = require("../fibonacci");

const fiboSeq = (n) => {
  if (n <= 1) {
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
  console.log(fibo(i), fiboSeq(i));
}
