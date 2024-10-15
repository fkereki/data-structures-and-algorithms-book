const DEFAULT_CURRENCY = [1, 5, 10, 25, 50, 100, 200, 500, 1000, 5000, 10000];

const greedy = (n, values = DEFAULT_CURRENCY) => {
  let count = values.length;
  const payWith = new Array(count).fill(0);
  do {
    count--;
    payWith[count] = Math.floor(n / values[count]);
    n = n % values[count];
  } while (n > 0);
  return payWith;
};

console.log(
  "229 = ",
  greedy(229)
    .map((v, i) => (v ? `${v} of ${DEFAULT_CURRENCY[i]}` : ``))
    .filter(Boolean)
);
