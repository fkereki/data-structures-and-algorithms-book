const {
  newStandardBloomFilter,
  add,
  find
} = require("./standardBloomFilter");

const filter = newStandardBloomFilter(10); // expecting ~10 elements

add(filter, "hello");
add(filter, "world");

console.log(find(filter, "hello")); // true
console.log(find(filter, "world")); // true
console.log(find(filter, "foo")); // false (almost certainly)

// Now, dirty trick to make the "foo" search return true, even though we didn't add it.

for (let i = 0; i < filter.bits.length; i += 1) {
  filter.bits[i] = true;
}

console.log(find(filter, "foo")); // true (because we cheated and set all bits to true)
