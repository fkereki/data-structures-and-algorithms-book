const sinkingSort = (arr, from = 0, to = arr.length - 1) => {
  for (let j = from; j < to; j++) {
    for (let i = to - 1; i >= j; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
  return arr;
};

const data = require("../data");

console.log(">>>", sinkingSort([...data]).join("-"));
console.log(">>>", sinkingSort([...data], 3, 10).join("-"));
