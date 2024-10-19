const {
  newStack,
  push,
  print,
  pop,
  top
} = require("./10-05-stack_with_array.func.js");

const s = newStack();
push(s, 22);
push(s, 9);
push(s, 60);
print(s);

push(s, 12);
push(s, 4);
console.log(pop(s));
print(s);

console.log(pop(s));
console.log(top(s));
