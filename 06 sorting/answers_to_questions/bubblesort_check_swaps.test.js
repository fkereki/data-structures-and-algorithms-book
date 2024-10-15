const bubbleSort = require("./bubblesort");

const data = require("../data");

console.log(">>>", bubbleSort([...data]).join("-"));
console.log(">>>", bubbleSort([...data], 3, 10).join("-"));

module.exports = bubbleSort;
