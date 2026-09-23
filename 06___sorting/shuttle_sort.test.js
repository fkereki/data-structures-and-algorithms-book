const shuttleSort = require("./shuttle_sort");

const data = require("../data32");

console.log(">>>", shuttleSort([...data]).join("-"));
console.log(">>>", shuttleSort([...data], 3, 10).join("-"));
