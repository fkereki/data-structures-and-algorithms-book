const shellSort = require("./shellsort");

const data = require("../data32");

console.log("===", data.join("-"));
console.log(">>>", shellSort([...data]).join("-"));
console.log(">>>", shellSort([...data], 3, 10).join("-"));
