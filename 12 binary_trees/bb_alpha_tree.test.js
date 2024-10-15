const {
  newBBTree,
  add,
  remove,
  print,
  inOrder,
  findByRank
} = require("./bb_alpha_tree.js");

let h = newBBTree();

const addToH = (v) => {
  console.log("ADDING ", v);
  h = add(h, v);
  print(h);
};

const removeFromH = (v) => {
  h = remove(h, v);
  print(h);
};
/*
for (let i = 1; i <= 12; i++) {
  h = add(h, i);
}
print(h);
return;
*/
addToH(22);
addToH(9);
addToH(60);
addToH(24);
addToH(20);
addToH(18);
addToH(11);
addToH(12);
addToH(4);
addToH(1);
addToH(34);
addToH(40);
addToH(56);
addToH(23);

for (let i = 1; i <= h.size; i++) {
  console.log("RANK", i, findByRank(h, i));
}

inOrder(h);

console.log("---");
removeFromH(23);
console.log("---");
removeFromH(24);
console.log("---");
removeFromH(60);
console.log("---");
removeFromH(40);
console.log("---");
removeFromH(34);
