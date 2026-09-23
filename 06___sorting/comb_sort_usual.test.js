const combSort = require("./comb_sort_usual");

const data = require("../data32");

console.log(">>>", combSort([...data]).join("-"));
console.log(">>>", combSort([...data], 3, 10).join("-"));
