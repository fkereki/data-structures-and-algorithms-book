const {
  newList,
  isEmpty,
  print,
  add,
  find
} = require("./move_to_front_list");

let ll = newList();
console.log(isEmpty(ll));
print(ll);

ll = add(ll, 0, 22);
ll = add(ll, 3, 9);
ll = add(ll, 2, 60);
ll = add(ll, 2, 12);
ll = add(ll, 1, 4);

console.log(isEmpty(ll));
print(ll);

let rr;

[ll, rr] = find(ll, 60);
console.log(rr);
print(ll);
