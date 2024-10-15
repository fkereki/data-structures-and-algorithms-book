const DEFAULT_CURRENCY = [2, 3, 5, 8, 13, 21];

const back = (n, values = DEFAULT_CURRENCY) => {
  let count = values.length;
  const payWith = new Array(count).fill(0);
  do {
    count--;
    payWith[count] = Math.floor(n / values[count]);
    n = n % values[count];
  } while (n > 0);
  return payWith;
};

console.log(back(229));
