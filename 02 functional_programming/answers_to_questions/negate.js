const negate = (fn) => (...args) => !fn(...args);

const isAdult = (x) => x >= 21;

console.log(isAdult(22));
console.log(isAdult(9));

const isNotAdult = negate(isAdult);

console.log(isNotAdult(22));
console.log(isNotAdult(9));

/*
true
false
false
true
*/
