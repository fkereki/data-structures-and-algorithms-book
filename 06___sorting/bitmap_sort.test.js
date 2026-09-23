const bitmapSort = require("./bitmap_sort");

const data = require("../data");
console.log(bitmapSort(data));

const data1 = [3, 1, 4, 5, 9, 2, 6];
console.log(bitmapSort(data1, 3, 5));
