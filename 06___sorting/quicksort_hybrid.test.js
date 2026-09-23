const quicksort = require("./quicksort");

const data = require("../data32");

console.log(">>>", quicksort([...data]).join("-"));
console.log(">>>", quicksort([...data], 3, 10).join("-"));
