const quicksort = require("./quicksort");

const data = [6, 9, 3, 4, 1, 2, 8, 5, 7] || require("../data32");

console.log(">>>", quicksort([...data]).join("-"));
console.log(">>>", quicksort([...data], 3, 6).join("-"));

const data2 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9];
console.log(quicksort(data2));
