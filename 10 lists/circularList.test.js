const {
  add,
  find,
  isEmpty,
  newCircularList,
  print,
  printBackwards,
  remove,
  size
} = require("./circularList.js");

let cl = newCircularList();

console.log("EMPTY? (should be true)");
console.log(isEmpty(cl));

console.log("ADDING");
cl = add(cl, 22);
cl = add(cl, 9);
cl = add(cl, 60);
cl = add(cl, 12);
cl = add(cl, 4);
cl = add(cl, 56);
cl = add(cl, 24);
cl = add(cl, 11);
console.log("LIST (should be 11 24 56 4 12 60 9 22) ");
print(cl);
console.log("SIZE (should be 8) =", size(cl));

console.log("FIND (should be true, false, true)");
console.log(find(cl, 22));
console.log(find(cl, 23));
console.log(find(cl, 24));

console.log("REMOVING");
cl = remove(cl);
cl = remove(cl);
console.log("LIST (should be 56 4 12 60 9 22)");
print(cl);
console.log("BACK (should be 56 22 9 60 12 4)");
printBackwards(cl);
console.log("EMPTY? (should be false)");
console.log(isEmpty(cl));
cl = remove(cl);
cl = remove(cl);
cl = remove(cl);
cl = remove(cl);
console.log("LIST (should be 9 22)");
print(cl);
console.log("BACK (should be 9 22)");
printBackwards(cl);
cl = remove(cl);
console.log("LIST (should be 22)");
print(cl);
console.log("BACK (should be 22)");
printBackwards(cl);
cl = remove(cl);
console.log("EMPTY? (should be true)");
console.log(isEmpty(cl));
