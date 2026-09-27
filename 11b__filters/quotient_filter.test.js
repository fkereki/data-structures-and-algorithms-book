const {
  createQuotientFilter,
  add,
  contains,
  remove
} = require("./quotient_filter");

const filter = createQuotientFilter(1000, 0.01); // expect ~1000 items, 1% false-positive rate

add(filter, "alice");
add(filter, "bob");

console.log(contains(filter, "alice")); // true
console.log(contains(filter, "carol")); // false (almost always)

remove(filter, "alice");
console.log(contains(filter, "alice")); // false
console.log(contains(filter, "bob")); // true — removing alice didn't disturb bob

console.log("load factor:", filter.count / filter.numSlots);
