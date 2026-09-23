const quickSelect = (arr, k, left = 0, right = arr.length - 1) => {
  while (left < right) {
    const pick = left + Math.floor((right - left) * Math.random());
    if (pick !== right) {
      [arr[pick], arr[right]] = [arr[right], arr[pick]];
    }
    const pivot = arr[right];

    let p = left;
    for (let j = left; j < right; j++) {
      if (pivot > arr[j]) {
        [arr[p], arr[j]] = [arr[j], arr[p]];
        p++;
      }
    }
    [arr[p], arr[right]] = [arr[right], arr[p]];

    if (p === k) {
      left = right = k;
    } else if (p > k) {
      right = p - 1;
    } else {
      left = p + 1;
    }
  }
};

const qSelect = (arr, k, left = 0, right = arr.length - 1) => {
  quickSelect(arr, k, left, right);
  return arr[k];
};

const data = require("../data");

console.log(data.join("-"));
console.log([...data].sort((a, b) => a - b).join("-"));

console.log(">>>", qSelect([...data], 0)); // 1
console.log(">>>", qSelect([...data], 1)); // 3
console.log(">>>", qSelect([...data], 10)); // 22
console.log(">>>", qSelect([...data], 16)); // 34
console.log(">>>", qSelect([...data], 30)); // 93
console.log(">>>", qSelect([...data], 31)); // 97
console.log(">>>", qSelect([...data], 6, 3, 10)); // 12
