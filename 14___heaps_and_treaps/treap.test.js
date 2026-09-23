const {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  postOrder,
  preOrder,
  print,
  remove
} = require("./treap.js");

let h = null;
console.log("Find in empty?", find(h, 22));

h = add(h, 22);
h = add(h, 9);
h = add(h, 60);
h = add(h, 24);
h = add(h, 11);
h = add(h, 12);
h = add(h, 4);
h = add(h, 56);
h = add(h, 23);
print(h);

console.log(" 9 in?", find(h, 9));
console.log("10 in?", find(h, 10));
console.log("11 in?", find(h, 11));
console.log("12 in?", find(h, 12));
console.log("21 in?", find(h, 21));
console.log("22 in?", find(h, 22));
console.log("23 in?", find(h, 23));
console.log("24 in?", find(h, 24));
console.log("25 in?", find(h, 25));

console.log("min,max");
console.log(minKey(h), maxKey(h));

console.log("About to remove");
inOrder(h);
h = remove(h, 9);
h = remove(h, 11);
h = remove(h, 22);

console.log("After removals");
print(h);

console.log("PREORDER");
preOrder(h);
console.log("INORDER");
inOrder(h);
console.log("POSTORDER");
postOrder(h);

let d = null;
d = add(d, 11);
d = add(d, 22);
d = remove(d, 11);
print(d);
d = remove(d, 22);
print(d);
d = add(d, 78);
d = add(d, 77);
d = add(d, 80);
print(d);

/*
for (let i = 1; i < 50; i++) {
  add(h,i + 100);
  add(h,300 - i);
}
*/
print(h);
