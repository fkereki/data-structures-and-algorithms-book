const bitmapSelect = require("./bitmap_select");

const data = require("../data32");

console.log(data.join("-"));
console.log([...data].sort((a, b) => a - b).join("-"));
/*
console.log(bitmapSelect([...data], 0)); // 1
console.log(bitmapSelect([...data], 1)); // 3
console.log(bitmapSelect([...data], 10)); // 22
console.log(bitmapSelect([...data], 16)); // 34
console.log(bitmapSelect([...data], 30)); // 93
console.log(bitmapSelect([...data], 31)); // 97
*/
console.log(bitmapSelect([...data], 6, 3, 10)); // 12
