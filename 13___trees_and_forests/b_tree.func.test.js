const {
  newBTree,
  print,
  inOrder,
  find,
  add,
  remove
} = require("./b_tree.func.js");

let b = newBTree(3); // 5 is good also!

const addToB = (x) => {
  console.log("************** ADDING", x);
  b = add(b, x);
  print(b);
};

const removeFromB = (x) => {
  console.log("************** REMOVE", x);
  b = remove(b, x);
  print(b);
};

const findInB = (x) => {
  console.log(`Find ${x}`, find(b, x));
};

addToB(22);
addToB(9);
addToB(60);
addToB(24);
addToB(11);
addToB(63);
addToB(12);
addToB(4);
addToB(56);
addToB(34);
addToB(40);
addToB(25);
addToB(66);

addToB(10);
addToB(78);

findInB(22);
findInB(60);
findInB(9);
findInB(18);

inOrder(b);

removeFromB(40);
removeFromB(56);
removeFromB(34);
removeFromB(12);
removeFromB(11);
removeFromB(24);
removeFromB(4);
removeFromB(25);
removeFromB(63);
removeFromB(9);
removeFromB(22);
removeFromB(60);
removeFromB(66);
