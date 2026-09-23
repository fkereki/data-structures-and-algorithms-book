const print = (arr, ll, mm, rr) =>
  arr.slice(ll, mm + 1).join("-") +
  "   " +
  arr.slice(mm + 1, rr + 1).join("-");
/*
const testOrder = (arr, f, t) => {
  if (
    arr
      .slice(f, t + 1)
      .sort((a, b) => a - b)
      .join("-") !== arr.slice(f, t + 1).join("-")
  ) {
    console.log("WRONG", f, t, arr.join(":"));
    console.log("WRONG", f, t, arr.slice(f, t + 1).join(":"));
    throw new Error("WRONG!");
  }
};
*/

const newMerge = (arr, ll, mm, rr, compares = 0, swaps = 0, passes = 1) => {
  while (true) {
    // console.log("ARR", ll, mm, rr, print(arr, 0, mm, arr.length - 1));
    const swap = (p, q) => {
      swaps++;
      [arr[p], arr[q]] = [arr[q], arr[p]];
    };

    const smaller = (p, q) => {
      compares++;
      return arr[p] < arr[q];
    };

    const reverse = (arr, f, t) => {
      while (f < t) {
        swap(f, t);
        f++;
        t--;
      }
    };

    // arr[ll] to arr[mm] is ascending
    // arr[mm+1] to arr[rr] is ascending
    // on output, arr[ll] to arr[rr] will be ascending
    if (rr <= ll || mm + 1 > rr || smaller(mm, mm + 1)) {
      return [compares, swaps, passes];
    }

    let lx, rx;
    for (lx = ll; smaller(lx, mm + 1); lx++) {}
    for (rx = rr; smaller(mm, rx); rx--) {}
    // arr[mm+1] should go into arr[lx], and arr[lx...mm] should be pushed right
    // arr[mm] should go into arr[rx], and arr[mm+1...rx] should be pushed left

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

/*
const arr1 = [1, 2, 3, 6, 10, 4, 5, 7, 9, 12, 14, 17];
newMerge(arr1, 0, 4, 11);
*/
const randomArray = (n = 10) =>
  new Array(n)
    .fill(0)
    .map(() => Math.floor(100 * Math.random()))
    .sort((a, b) => a - b);

const LEN = 6400;
const TESTS = 100;

let totalCompares = 0,
  totalSwaps = 0,
  totalPasses = 0;

for (let i = 0; i < TESTS; i++) {
  const arr1 = [...randomArray(LEN), ...randomArray(LEN)];
  const arr2 = [...arr1];
  const arr3 = [...arr1].sort((a, b) => a - b);
  const sss = newMerge(arr2, 0, LEN - 1, 2 * LEN - 1);
  console.log("COMPARES", sss[0], "SWAPS", sss[1], "PASSES", sss[2]);

  totalCompares += sss[0];
  totalSwaps += sss[1];
  totalPasses += sss[2];

  if (arr2.join("-") !== arr3.join("-")) {
    console.log("PROBLEM!! arr1=", arr1.join("-"));
    console.log("PROBLEM!! arr2=", arr2.join("-"));
    console.log("PROBLEM!! arr3=", arr3.join("-"));
    break;
  }
  /*
  console.log();
  console.log(print(arr2, 0, LEN - 1, 2 * LEN - 1));
  */
}

console.log(totalCompares, totalSwaps, totalPasses);
console.log(totalCompares / TESTS, totalSwaps / TESTS, totalPasses / TESTS);
