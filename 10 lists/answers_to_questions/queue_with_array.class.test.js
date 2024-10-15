const { Queue } = require("./queue_with_array.class.js");

const s = new Queue();
s.push(22);
s.push(9);
s.push(60);
s.print();

console.log(s.push(12).push(4).pop());
s.print();

console.log(s.pop());
