const insertionSort = require("./insertion_sort_2");

const CUTOFF = 7;

const dualPivot = (arr, left = 0, right = arr.length - 1) => {
  if (right > left) {
    // if left===right, nothing to do; if left>right, even less!
    if (right - left < CUTOFF) {
      insertionSort(arr, left, right);
    } else {
      // Choose outermost elements as pivots
      if (arr[left] > arr[right]) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
      }

      const pivotLeft = arr[left];
      const pivotRight = arr[right];

      // INVARIANT:
      // pivotLeft is at left
      // from left+1 to ll-1, values < pivotLeft
      // from ll to mm-1, pivotLeft < values < pivotRight
      // from mm to rr, still unknown
      // from rr+1 to right-1, pivotRight < values
      // pivotRight is at right

      let ll = left + 1;
      let rr = right - 1;

      for (let mm = ll; mm <= rr; mm++) {
        if (arr[mm] < pivotLeft) {
          [arr[mm], arr[ll]] = [arr[ll], arr[mm]];
          ll++;
        } else if (arr[mm] >= pivotRight) {
          while (arr[rr] > pivotRight && mm < rr) {
            rr--;
          }
          [arr[mm], arr[rr]] = [arr[rr], arr[mm]];
          rr--;

          if (arr[mm] < pivotLeft) {
            [arr[mm], arr[ll]] = [arr[ll], arr[mm]];
            ll++;
          }
        }
      }

      // Swap pivots to their final places
      ll--;
      rr++;
      [arr[left], arr[ll]] = [arr[ll], arr[left]];
      [arr[right], arr[rr]] = [arr[rr], arr[right]];

      // Recursively sort the three partitions
      dualPivot(arr, left, ll - 1);
      dualPivot(arr, ll + 1, rr - 1);
      dualPivot(arr, rr + 1, right);
    }
  }

  return arr;
};

module.exports = dualPivot;
