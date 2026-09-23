const frSelect = require("./floyd_rivest");

const data1 = require("../data32");
console.log(frSelect([...data1], 0)); // 1
console.log(frSelect([...data1], 1)); // 3
console.log(frSelect([...data1], 10)); // 22
console.log(frSelect([...data1], 16)); // 34
console.log(frSelect([...data1], 30)); // 93
console.log(frSelect([...data1], 31)); // 97
console.log(frSelect([...data1], 6, 3, 10)); // 12

const data2 = require("../data10000");
console.log(">>>", frSelect([...data2], 2030)); // 2903739
console.log(">>>", frSelect([...data2], 4010)); // 4654014
console.log(">>>", frSelect([...data2], 5000)); // 5568675
console.log(">>>", frSelect([...data2], 6601)); // 6992209
console.log(">>>", frSelect([...data2], 7016)); // 7399462
console.log(">>>", frSelect([...data2], 8031)); // 8306825
