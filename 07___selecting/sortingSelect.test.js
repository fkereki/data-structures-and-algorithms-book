const sortingSelect = require("./sortingSelect");

const data = require("../data32");

console.log(data.join("-"));
console.log([...data].sort((a, b) => a - b).join("-"));

console.log(sortingSelect([...data], 0)); // 1
console.log(sortingSelect([...data], 1)); // 3
console.log(sortingSelect([...data], 10)); // 22
console.log(sortingSelect([...data], 16)); // 34
console.log(sortingSelect([...data], 30)); // 93
console.log(sortingSelect([...data], 31)); // 97
console.log(sortingSelect([...data], 6, 3, 10)); // 12

const data2 = require("../data10000");
console.log(">>>", sortingSelect([...data2], 2030)); // 2903739
console.log(">>>", sortingSelect([...data2], 4010)); // 4654014
console.log(">>>", sortingSelect([...data2], 5000)); // 5568675
console.log(">>>", sortingSelect([...data2], 6601)); // 6992209
console.log(">>>", sortingSelect([...data2], 7016)); // 7399462
console.log(">>>", sortingSelect([...data2], 8031)); // 8306825
