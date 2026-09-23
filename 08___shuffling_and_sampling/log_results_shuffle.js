const logResults = (fn, from = 0, to = 10, n = to, times = 4000) => {
  const bar = (len, val, max) => "#".repeat(Math.round((len * val) / max));

  const result = {};
  let max = 0;
  for (let i = 1; i <= times; i++) {
    const arr = Array(n)
      .fill(0)
      .map((v, i) => (i < from || i > to ? i : String.fromCharCode(65 + i)));

    const x = fn(arr, from, to).join("-");
    result[x] = x in result ? result[x] + 1 : 1;
    max = Math.max(max, result[x]);
  }

  let count = 0;
  for (const [key, val] of Object.entries(result).sort((a, b) =>
    a < b ? -1 : 1
  )) {
    count++;
    console.log(`${key}: ${String(val).padStart(5)} ${bar(50, val, max)}`);
  }
  console.log("COUNT=", count);
};

module.exports = logResults;
