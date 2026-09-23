const {
  add,
  find,
  inOrder,
  maxKey,
  minKey,
  newSplayTree,
  postOrder,
  preOrder,
  print,
  remove
} = require("./splay_tree.js");

let h = newSplayTree();
console.log("Find in empty?", find(h, 22));
/*
for (let i = 32; i >= 1; i--) {
  h = add(h, i);
}
print(h);

h = remove(h, 11);
h = remove(h, 22);
h = remove(h, 9);
h = remove(h, 24);
console.log("REMOVED");
print(h);
*/
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

const testFind = (k) => {
  let r;
  [h, r] = find(h, k);
  console.log("Key ", k, "in?", r, "Tree", h);
};

testFind(22);
testFind(9);
testFind(60);
testFind(44);
testFind(11);
testFind(12);
testFind(4);
testFind(60);
testFind(53);

console.log("min,max");
console.log(minKey(h), maxKey(h));

console.log("About to remove");
print(h);
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
