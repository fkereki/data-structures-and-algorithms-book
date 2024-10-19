const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const iPivot = Math.floor(left + (right + 1 - left) * Math.random());
    if (iPivot !== right) {
      [arr[iPivot], arr[right]] = [arr[right], arr[iPivot]];
    }

    const pivot = arr[right];

    // Partition: pivot will end in arr[p]
    let p = left;
    for (let j = left; j < right; j++) {
      if (pivot > arr[j]) {
        [arr[p], arr[j]] = [arr[j], arr[p]];
        p++;
      }
    }
    [arr[p], arr[right]] = [arr[right], arr[p]];

    // Dutch enhancement: expand p to the left and right
    let pl = p;
    for (let i = p - 1; i >= left; i--) {
      if (arr[i] === pivot) {
        pl--;
        [arr[i], arr[pl]] = [arr[pl], arr[i]];
      }
    }

    let pr = p;
    for (let j = p + 1; j <= right; j++) {
      if (arr[j] === pivot) {
        pr++;
        [arr[j], arr[pr]] = [arr[pr], arr[j]];
      }
    }

    quickSort(arr, left, pl - 1);
    quickSort(arr, pr + 1, right);
  }

  return arr;
};

const data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9];
console.log(quickSort(data));
