const {
  newHashTable,
  add,
  remove,
  find
} = require("./hashTable_single_open_addressing");

let ht = newHashTable(10);
console.log(ht);

ht = add(ht, 22);
ht = add(ht, 60);
ht = add(ht, 9);
ht = add(ht, 12);
console.log(ht);
console.log(find(ht, 10));
console.log(find(ht, 12));
console.log(find(ht, 22));
console.log(find(ht, 32));

ht = remove(ht, 22);
console.log(ht);

console.log(find(ht, 10));
console.log(find(ht, 12));
console.log(find(ht, 22));
console.log(find(ht, 32));

ht = add(ht, 42);
ht = add(ht, 52);
ht = add(ht, 62);
ht = add(ht, 72);
console.log(ht);

ht = remove(ht, 12);
ht = remove(ht, 62);
ht = add(ht, 2);
ht = add(ht, 92);
ht = add(ht, 82);
console.log(ht);
