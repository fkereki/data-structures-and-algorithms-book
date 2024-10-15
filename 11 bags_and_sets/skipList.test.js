const {
  newSkipList,
  isEmpty,
  add,
  find,
  print,
  remove
} = require("./skipList.js");

let sl = newSkipList();
console.log("EMPTY");
console.log(sl);
console.log(isEmpty(sl));

sl = add(sl, 22);
console.log("ONE ELEMENT, 22");
print(sl);
// console.log(sl);

sl = add(sl, 9);
console.log("AFTER 2 ADDs");
print(sl);
// console.log(sl);

sl = add(sl, 60);
console.log("AFTER 3 ADDs");
print(sl);
// console.log(sl);

sl = add(sl, 12);
console.log("AFTER 4 ADDs");
print(sl);
// console.log(sl);

sl = add(sl, 4);
console.log("AFTER 5 ADDs");
print(sl);
// console.log(sl);

sl = add(sl, 56);
console.log("AFTER 6 ADDs");
console.log("----------");
print(sl);
console.log("----------");
// console.log(sl);

sl = add(sl, 80);
sl = add(sl, 85);
sl = add(sl, 17);
sl = add(sl, 37);
sl = add(sl, 67);
sl = add(sl, 47);
sl = add(sl, 77);
sl = add(sl, 7);
sl = add(sl, 90);
sl = add(sl, 95);
console.log("AFTER many ADDs");
console.log("----------");
print(sl);
console.log("----------");
// console.log(sl);

/*
sl = remove(sl, 60);
sl = remove(sl, 56);
sl = remove(sl, 22);
sl = remove(sl, 4);
sl = remove(sl, 9);
sl = remove(sl, 12);
sl = remove(sl, 95);
sl = remove(sl, 80);
sl = remove(sl, 90);
sl = remove(sl, 85);
console.log("----------");
print(sl);
console.log("----------");
*/

console.log("FIND 22", find(sl, 22));

return;

console.log("FIND  9", find(sl, 9));
console.log("FIND 60", find(sl, 60));
console.log("FIND 12", find(sl, 12));
console.log("FIND  4", find(sl, 4));
console.log("FIND 56", find(sl, 56));

sl = remove(sl, 60);
sl = remove(sl, 56);
sl = remove(sl, 22);

print(sl);
console.log("FIND 22", find(sl, 22));
console.log("FIND  9", find(sl, 9));
console.log("FIND 60", find(sl, 60));
console.log("FIND 12", find(sl, 12));
console.log("FIND  4", find(sl, 4));
console.log("FIND 56", find(sl, 56));
