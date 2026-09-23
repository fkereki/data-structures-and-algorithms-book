const _radixSort = (arr) => {
  const ML = Math.max(...arr.map((x) => String(x).length));

  for (let i = 0, div = 1; i < ML; i++, div *= 10) {
    const buckets = Array(10)
      .fill(0)
      .map(() => ({ first: null, last: null }));

    arr.forEach((v) => {
      const digit = Math.floor(v / div) % 10;
      const newNode = { v, next: null };
      if (buckets[digit].first === null) {
        buckets[digit].first = newNode;
      } else {
        buckets[digit].last.next = newNode;
      }
      buckets[digit].last = newNode;
    });

    arr = [];
    buckets.forEach((b) => {
      for (let ptr = b.first; ptr; ptr = ptr.next) {
        arr.push(ptr.v);
      }
    });
  }

  return arr;
};

const radixSort = (arr, from = 0, to = arr.length - 1) => {
  return [
    ...arr.slice(0, from),
    ..._radixSort(arr.slice(from, to + 1)),
    ...arr.slice(to + 1)
  ];
};

module.exports = radixSort;

//  const radixSort = require("./bubblesort");

const data = require("../../data32");

console.log(">>>", radixSort([...data]).join("-"));
console.log(">>>", radixSort([...data], 3, 10).join("-"));
