const rsSelect = require("./repeated_step");

const data = require("../../data32");

console.log(data.join("-"));
console.log([...data].sort((a, b) => a - b).join("-"));

console.log(rsSelect([...data], 0)); // 1
console.log(rsSelect([...data], 1)); // 3
console.log(rsSelect([...data], 10)); // 22
console.log(rsSelect([...data], 16)); // 34
console.log(rsSelect([...data], 30)); // 93
console.log(rsSelect([...data], 31)); // 97
console.log(rsSelect([...data], 6, 3, 10)); // 12

const data2 = require("../../data10000");
console.log(">>>", rsSelect([...data2], 2030)); // 2903739
console.log(">>>", rsSelect([...data2], 4010)); // 4654014
console.log(">>>", rsSelect([...data2], 5000)); // 5568675
console.log(">>>", rsSelect([...data2], 6601)); // 6992209
console.log(">>>", rsSelect([...data2], 7016)); // 7399462
console.log(">>>", rsSelect([...data2], 8031)); // 8306825
