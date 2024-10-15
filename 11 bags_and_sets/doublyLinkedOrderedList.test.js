const {
  add,
  find,
  isEmpty,
  newDoubleList,
  print,
  remove,
  size
} = require("./doublyLinkedList.js");

let dl = newDoubleList();
console.log(isEmpty(dl));

console.log("ADDING");
dl = add(dl, 22);
dl = add(dl, 9);
dl = add(dl, 60);
dl = add(dl, 12);
dl = add(dl, 4);
dl = add(dl, 56);
dl = add(dl, 24);
dl = add(dl, 11);
console.log(dl);
console.log("SIZE=", size(dl));

console.log("FINDING");
console.log(find(dl, 22));
console.log(find(dl, 23));
console.log(find(dl, 24));

console.log("REMOVING");
dl = remove(dl, 20);
dl = remove(dl, 24);
dl = remove(dl, 60);
dl = remove(dl, 4);
console.log("XXX");
print(dl);
console.log(isEmpty(dl));
