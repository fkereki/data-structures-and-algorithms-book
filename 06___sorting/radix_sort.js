const _radixSort = (arr) => {
  const ML = Math.max(...arr.map((x) => String(x).length));

  for (let i = 0, div = 1; i < ML; i++, div *= 10) {
    const buckets = Array(10)
      .fill(0)
      .map(() => []);

    arr.forEach((v) => {
      const digit = Math.floor(v / div) % 10;
      buckets[digit].push(v);
    });

    // prettier-ignore
    arr = [
      ...buckets[0], ...buckets[1], ...buckets[2], ...buckets[3],
      ...buckets[4], ...buckets[5], ...buckets[6], ...buckets[7],
      ...buckets[8], ...buckets[9]
    ];
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

const data = require("../data32");

console.log(">>>", radixSort([...data]).join("-"));
console.log(">>>", radixSort([...data], 3, 10).join("-"));
