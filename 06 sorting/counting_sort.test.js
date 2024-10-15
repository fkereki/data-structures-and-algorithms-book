const countingSort = require("./counting_sort");

const data = require("../data32");
console.log(countingSort(data));

const data1 = [6, 6, 2, 5, 8, 3, 2, 8, 6, 5];
console.log(countingSort(data1));

const data2 = [6, 6, 2, 5, 8, 3, 2, 8, 6, 5];
console.log(countingSort(data2, 1, 5));

const data3 = [6, 6, 2, 5, 8, 3, 2, 8, 6, 5];
console.log(countingSort(data3, 7, 9));
