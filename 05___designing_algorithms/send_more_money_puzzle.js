const solve = (puzzle, digits = [0, 4, 2, 3, 1, 5, 6, 7, 8, 9]) => {
  const d = [...digits].sort();
  console.log(d);

  for (;;) {
    if (puzzle(...d)) {
      console.log("SOLUTION: ", ...d);
      return true;
    }

    // Step 1
    let p = d.length - 2;
    while (p >= 0 && d[p] > d[p + 1]) {
      p--;
    }

    if (p === -1) {
      console.log("No solution found");
      return false;
    }

    // Step 2
    let q = d.length - 1;
    while (d[p] > d[q]) {
      q--;
    }

    // Step 3
    [d[p], d[q]] = [d[q], d[p]];

    // Step 4
    let l = p + 1;
    let r = d.length - 1;
    while (l < r) {
      [d[l], d[r]] = [d[r], d[l]];
      l++;
      r--;
    }
  }
};

module.exports = { solve };
