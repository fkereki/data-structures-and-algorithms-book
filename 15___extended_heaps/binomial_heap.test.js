const {
  newBinomialHeap,
  add,
  top,
  remove,
  print,
  changeKey
} = require("./binomial_heap.js");

let h = newBinomialHeap();

const removeFromH = () => {
  console.log(`Removing (${top(h)}) ----------`);
  let foundTop;
  [h, foundTop] = remove(h);
  console.log(`Removed ${foundTop}`);
  print(h);
};

const node = [];

const addToH = (k) => {
  console.log(`Adding ${k} ----------`);
  [h, node[k]] = add(h, k);
  print(h);
};

const topOfH = () => {
  console.log(`Top is ${top(h)} ------------`);
};

const changeInH = (oldK, newK) => {
  console.log(`Changing ${node[oldK].key} to ${newK}`);
  h = changeKey(h, node[oldK], newK);
  print(h);
};

addToH(19);
addToH(10);
topOfH();
addToH(15);
topOfH();
addToH(5);
addToH(18);
topOfH();
addToH(63);
addToH(21);
addToH(34);
topOfH();
addToH(36);
addToH(35);
addToH(39);
topOfH();

changeInH(21, 88);
console.log(node[21].key);
console.log(node[34].key);
console.log(node[63].key);

changeInH(35, 37);
console.log(node[36].key);

removeFromH();
removeFromH();
addToH(56);
removeFromH();
removeFromH();
removeFromH();
addToH(40);
addToH(50);
removeFromH();
removeFromH();
removeFromH();
removeFromH();

console.log("*************", top(h));
print(h);
changeInH(myNode, 111);
console.log("*************", top(h));
