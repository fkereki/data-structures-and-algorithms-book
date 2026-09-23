const selectionSort = require("./selection_sort");

const data = require("../data32");

console.log(">>>", selectionSort([...data]).join("-"));
console.log(">>>", selectionSort([...data], 3, 10).join("-"));
