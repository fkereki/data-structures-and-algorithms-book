const { newHeap, add, remove } = require("./heap.js");

let h = newHeap();

add(h, 22);
add(h, 9);
add(h, 60);
add(h, 34);
add(h, 24);
add(h, 40);
add(h, 11);
add(h, 12);
add(h, 56);
add(h, 4);

console.log(h);

console.log("Start removing");

const testRemove = () => {
  let v;
  [h, v] = remove(h);
  console.log(h, v);
};

testRemove();
testRemove();
testRemove();
testRemove();
testRemove();
testRemove();
testRemove();
testRemove();
testRemove();
//h=remove(h);
console.log(h);
