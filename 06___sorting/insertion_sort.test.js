const insertionSort1 = require("./insertion_sort_1");
const insertionSort2 = require("./insertion_sort_2");
const insertionSort3 = require("./insertion_sort_3");

const data = require("../data32");

console.log("===", data.join("-"));
console.log(">>>", insertionSort1([...data]).join("-"));
console.log(">>>", insertionSort2([...data]).join("-"));
console.log(">>>", insertionSort3([...data]).join("-"));

console.log("===", data.join("-"));
console.log(">>>", insertionSort1([...data], 3, 10).join("-"));
console.log(">>>", insertionSort2([...data], 3, 10).join("-"));
console.log(">>>", insertionSort3([...data], 3, 10).join("-"));
