const { isEmpty, newStack, push, pop, top } = require("./linkedStack");

let st = newStack();
console.log("STACK (should be null, true) ", st, isEmpty(st));

st = push(st, 22);
st = push(st, 9);
st = push(st, 60);

console.log("STACK (should be 60 9 22, false) ", st, isEmpty(st));
console.log("TOP (should be 60)", top(st));

st = pop(st);
st = pop(st);
console.log("STACK (should be 22, false) ", st, isEmpty(st));

st = push(st, 12);
st = push(st, 4);
st = pop(st);
st = pop(st);
st = pop(st);
console.log("STACK (should be null, true) ", st, isEmpty(st));
