const { newSkewHeap, add, remove, print } = require("./skew_heap.js");

let h = newSkewHeap();

const addToH = (k) => {
  let n;
  [h, n] = add(h, k);
  print(h, `AFTER ADDING ${n.key}`);
};

const removeFromH = () => {
  let k;
  [h, k] = remove(h);
  console.log("REMOVED ", k);
  print(h);
};
/*
for (let i = 1; i <= 50; i++) {
  addToH(i);
}
return;
*/

addToH(22);
addToH(9);
addToH(60);
addToH(34);
addToH(24);
addToH(40);
addToH(11);
addToH(12);
addToH(56);
addToH(4);

removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
