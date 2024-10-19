const { Stack } = require("./stack_with_array.class.js");

const s = new Stack();
s.push(22);
s.push(9);
s.push(60);
s.print();

console.log(s.push(12).push(4).pop());
s.print();

console.log(s.pop());
console.log(s.top());
