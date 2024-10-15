const {
  add,
  find,
  isEmpty,
  newList,
  print,
  remove,
  size
} = require("./linkedList.js");

let sl = newList();
console.log(isEmpty(sl));

console.log("ADDING");
sl = add(sl, 22);
sl = add(sl, 9);
sl = add(sl, 60);
sl = add(sl, 12);
sl = add(sl, 4);
sl = add(sl, 56);
sl = add(sl, 24);
sl = add(sl, 11);
print(sl);
console.log(sl);
console.log("SIZE=", size(sl));

console.log("FINDING");
console.log(find(sl, 22));
console.log(find(sl, 23));
console.log(find(sl, 24));

console.log("REMOVING");
sl = remove(sl, 20);
sl = remove(sl, 24);
sl = remove(sl, 60);
sl = remove(sl, 4);
print(sl);
console.log(sl);
console.log(isEmpty(sl));
