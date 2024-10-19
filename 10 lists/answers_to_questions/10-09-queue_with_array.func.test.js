const { newQueue, push, print, pop } = require("./10-09-queue_with_array.func.js");

let s = newQueue();
s = push(s, 22);
s = push(s, 9);
s = push(s, 60);
print(s);

s = push(s, 12);
s = push(s, 4);
console.log(pop(s));
print(s);

console.log(pop(s));
