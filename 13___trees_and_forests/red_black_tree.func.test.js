const {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  newRedBlackTree,
  postOrder,
  preOrder,
  print,
  remove
} = require("./red_black_tree.func.js");

let h = newRedBlackTree();

const addToH = (v) => {
  h = add(h, v);
};

const removeFromH = (v) => {
  h = remove(h, v);
};

console.log("Find in empty?", find(h, 22));

addToH(4);
addToH(9);
addToH(11);
addToH(12);
addToH(22);
addToH(23);
addToH(24);
addToH(53);
addToH(54);
addToH(55);
addToH(56);
addToH(60);
addToH(52);
addToH(51);
addToH(50);
addToH(59);
print(h);
removeFromH(51);
print(h);

addToH(22);
addToH(9);
addToH(60);
addToH(24);
addToH(11);
addToH(12);
addToH(4);
addToH(56);
addToH(23);
addToH(24);
addToH(53);
addToH(54);
addToH(55);
addToH(56);
addToH(60);
addToH(52);
addToH(51);
addToH(50);
addToH(59);

print(h);

/*
for (let i = 1; i <= 45; i++) {
  add(h, i);
}
print(h);
*/

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
removeFromH(53);
print(h);

removeFromH(9);
removeFromH(11);
removeFromH(22);

console.log("After removals");
print(h);

console.log("PREORDER");
preOrder(h);
console.log("INORDER");
inOrder(h);
console.log("POSTORDER");
postOrder(h);

console.log("****** root", h.key, h.left.key, h.right.key);

let d = newRedBlackTree();
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
