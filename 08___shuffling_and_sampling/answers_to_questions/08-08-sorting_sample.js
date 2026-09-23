const sortingSample = (arr, k) => {
  const rand = arr.map((v) => ({ val: v, key: Math.random() }));
  const n = arr.length;

  for (let i = 0; i < k; i++) {
    let m = i;
    for (let j = i + 1; j < n; j++) {
      if (rand[m].key > rand[j].key) {
        m = j;
      }
    }
    if (m !== i) {
      [rand[i], rand[m]] = [rand[m], rand[i]];
    }
  }

  return rand.slice(0, k).map((obj) => obj.val);
};

const logResults = require("../log_results_sample");
logResults(sortingSample, 4, 6, 20_000);
logResults(sortingSample, 5, 7, 20_000);
