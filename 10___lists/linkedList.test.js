const {
  add,
  at,
  isEmpty,
  newList,
  print,
  remove,
  size
} = require("./linkedList.js");

let sl = newList();
console.log("LIST (should be null, empty) ", sl, isEmpty(sl));

console.log("ADDING");
sl = add(sl, 3, 22);
sl = add(sl, 2, 9);
sl = add(sl, 1, 60);
sl = add(sl, 2, 12);
sl = add(sl, 0, 4);
sl = add(sl, 0, 56);
sl = add(sl, 2, 24);
sl = add(sl, 9, 11);
console.log("LIST (should be 56 4 24 22 60 12 9 11)");
print(sl);
console.log(JSON.stringify(sl));
console.log("SIZE (should be 8) =", size(sl));

console.log("FINDING (should be 56 24 12 11 undefined)");
console.log(at(sl, 0));
console.log(at(sl, 2));
console.log(at(sl, 5));
console.log(at(sl, 7));
console.log(at(sl, 15));
console.log(JSON.stringify(sl));

console.log("REMOVING #2", at(sl, 2));
sl = remove(sl, 2);
console.log(JSON.stringify(sl));

console.log("REMOVING #0", at(sl, 0));
sl = remove(sl, 0);
console.log(JSON.stringify(sl));

console.log("REMOVING #10", at(sl, 10));
sl = remove(sl, 10);
console.log(JSON.stringify(sl));

console.log("REMOVING #5", at(sl, 5));
sl = remove(sl, 5);
console.log(JSON.stringify(sl));

console.log("REMOVING #15", at(sl, 15));
sl = remove(sl, 15);

console.log("LIST (should be 4 22 60 12 9)");
console.log(JSON.stringify(sl));
console.log("SIZE (should be 5) =", size(sl));
console.log("EMPTY? (should be false) ", isEmpty(sl));

sl = remove(sl, 3);
sl = remove(sl, 3);
sl = remove(sl, 0);
sl = remove(sl, 1);
sl = remove(sl, 0);
console.log("LIST (should be null)");
console.log(JSON.stringify(sl));
