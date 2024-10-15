const {
  newPairingHeap,
  add,
  remove,
  print,
  top
} = require("./pairing_heap.js");

let h = newPairingHeap();

const node = [];

const addToH = (k) => {
  [h, node[k]] = add(h, k);
  console.log("ADDED", node[k].key, "TOP", top(h));
  print(h);
};

const removeFromH = () => {
  let k;
  [h, k] = remove(h);
  console.log("REMOVED ", k, "TOP", top(h));
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

console.log("---");
print(h);
console.log("---");

removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
removeFromH();
