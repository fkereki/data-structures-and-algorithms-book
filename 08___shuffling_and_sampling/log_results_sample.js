const logResults = (fn, k, n = 10, times = 60000, noReps = true) => {
  const bar = (len, val, max) => "#".repeat(Math.round((len * val) / max));

  const result = {};
  let max = 0;
  for (let i = 1; i < times; i++) {
    const arr = Array(n)
      .fill(0)
      .map((v, i) => String.fromCharCode(65 + i));

    const x = noReps ? fn(arr, k).sort().join("-") : fn(arr, k).join("-");
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
