const {
  newFibonacciHeap,
  add,
  top,
  remove,
  print,
  change
} = require("./fibonacci_heap.js");

let h = newFibonacciHeap();

const removeFromH = () => {
  console.log(`Removing (${top(h)}) ----------`);
  let foundTop;
  [h, foundTop] = remove(h);
  console.log(`Removed ${foundTop}`);
  print(h);
  console.log("TOP IS", top(h));
};

const addToH = (v) => {
  console.log(`Adding ${v} ----------`);
  let newNode;
  [h, newNode] = add(h, v);
  print(h);
  console.log("TOP IS", top(h));
  console.log(newNode);
};

const topOfH = () => {
  console.log(`Top is ${top(h)} ------------`);
};

const changeInH = (n, v) => {
  console.log(`Changing ${n.key} to ${v}`);
  change(h, n, v);
  print(h);
  console.log("TOP IS", top(h));
};

addToH(9);
let myNode;
[h, myNode] = add(h, 19);
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

/*
console.log(h._trees[1]._left._key); //15
h.change(h._trees[1]._left, 8);
h.print();
*/
/*
console.log("CHANGE...", h._trees[1]._left._left._right._key);
h.change(h._trees[1]._left._left._right, 66);
h.print();
*/
/*
console.log(h._trees[3]._key);
h.change(h._trees[3], 1);
h.print();
*/

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

changeInH(myNode, 17);
