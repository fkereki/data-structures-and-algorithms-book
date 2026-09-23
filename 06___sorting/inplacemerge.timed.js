const newMerge = (arr, ll, mm, rr, compares = 0, swaps = 0, passes = 1) => {
  for (;;) {
    const swap = (p, q) => {
      [arr[p], arr[q]] = [arr[q], arr[p]];
    };

    const smaller = (p, q) => {
      return arr[p] < arr[q];
    };

    const reverse = (arr, f, t) => {
      while (f < t) {
        swap(f, t);
        f++;
        t--;
      }
    };

    if (rr <= ll || mm + 1 > rr || smaller(mm, mm + 1)) {
      return;
    }

    let lx, rx;
    for (lx = ll; smaller(lx, mm + 1); lx++) {}
    for (rx = rr; smaller(mm, rx); rx--) {}

    reverse(arr, lx, mm);
    reverse(arr, mm + 1, rx);
    reverse(arr, lx, rx);

    mm = lx + rx - mm - 1;
    for (ll = lx + 1; smaller(ll, mm + 1) && ll < mm; ll++) {}
    for (rr = rx - 1; smaller(mm, rr) && rr > mm; rr--) {}

    let swapped;
    do {
      swapped = false;
      while (smaller(ll, mm + 2) && ll < mm) {
        swap(ll, mm + 1);
        ll++;
        swapped = true;
      }

      while (smaller(mm - 1, rr) && rr > mm + 1) {
        swap(mm, rr);
        rr--;
        swapped = true;
      }
    } while (swapped);

    passes++;
  }
};

const randomArray = (n = 10) =>
  new Array(n)
    .fill(0)
    .map(() => Math.floor(100 * Math.random()))
    .sort((a, b) => a - b);

for (let LEN = 100; LEN < 100_000; LEN *= 2) {
  const TESTS = 100;

  const totTime = [0, 0];
  for (let i = 0; i < TESTS; i++) {
    const arr1 = [...randomArray(LEN), ...randomArray(LEN)];
    const hrStart = process.hrtime();
    newMerge(arr1, 0, LEN - 1, 2 * LEN - 1);
    const hrEnd = process.hrtime(hrStart);
    totTime[0] += hrEnd[0];
    totTime[1] += hrEnd[1];
  }

  const totalTime = totTime[0] + totTime[1] / 1_000_000_000;

  console.log(
    LEN,
    TESTS,
    totalTime.toFixed(5),
    (totalTime / TESTS).toFixed(5)
  );
}

// RESULTADOS...
// tiempo = 6.809857 * 10^-9 * x ^2.038153 ... O(n²) seguro
