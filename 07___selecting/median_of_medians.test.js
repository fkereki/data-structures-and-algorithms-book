const momSelect = require("./median_of_medians");

const data = require("../data32");

console.log(data.join("-"));
console.log([...data].sort((a, b) => a - b).join("-"));

console.log(momSelect([...data], 0)); // 1
console.log(momSelect([...data], 1)); // 3
console.log(momSelect([...data], 10)); // 22
console.log(momSelect([...data], 16)); // 34
console.log(momSelect([...data], 30)); // 93
console.log(momSelect([...data], 31)); // 97
console.log(momSelect([...data], 6, 3, 10)); // 12

const data2 = require("../data10000");
console.log(">>>", momSelect([...data2], 2030)); // 2903739
console.log(">>>", momSelect([...data2], 4010)); // 4654014
console.log(">>>", momSelect([...data2], 5000)); // 5568675
console.log(">>>", momSelect([...data2], 6601)); // 6992209
console.log(">>>", momSelect([...data2], 7016)); // 7399462
console.log(">>>", momSelect([...data2], 8031)); // 8306825
