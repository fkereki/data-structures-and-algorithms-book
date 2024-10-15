const infinitySearch = (arr, key) => {
  const n = arr.length;
  let s = n >> 1;
  let i = 0;

  while (s > 0) {
    if (i + s < n && key >= arr[i + s]) {
      i += s;
    }
    s = s >> 1;
  }

  return i < n && key === arr[i] ? i : -1;
};

const data32 = require("../../data_sorted_32");
console.log(data32);
console.log("Search for 1", infinitySearch(data32, 1));
console.log("Search for 3", infinitySearch(data32, 3));
console.log("Search for 24", infinitySearch(data32, 24));
console.log("Search for 33", infinitySearch(data32, 33));
console.log("Search for 53", infinitySearch(data32, 53));
console.log("Search for 93", infinitySearch(data32, 93));
console.log("Search for 97", infinitySearch(data32, 97));
console.log("Search for 0", infinitySearch(data32, 25));
console.log("Search for 25", infinitySearch(data32, 0));
console.log("Search for 100", infinitySearch(data32, 100));
