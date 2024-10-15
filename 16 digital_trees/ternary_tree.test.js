const {
  add,
  find,
  isEmpty,
  newTernary,
  print,
  printWords,
  remove
} = require("./ternary_tree.js");

let xx = newTernary();

console.log("SHOULD BE EMPTY - true expected", isEmpty(xx));

xx = add(xx, "ACE");
xx = add(xx, "ADD");
xx = add(xx, "ADDED");
xx = add(xx, "BADE");
xx = add(xx, "BE");
xx = add(xx, "BEAD");
xx = add(xx, "BED");
xx = add(xx, "BEE");
console.log("SHOULD NOT BE EMPTY - false expected", isEmpty(xx));

console.log(JSON.stringify(xx));
//print(xx);
printWords(xx);
console.log("BEAD", find(xx, "BEAD"));
console.log("BED ", find(xx, "BED"));
return;

console.log("A  ", find(xx, "A"));
console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));
console.log("------------------");
xx = remove(xx, "BEE");
console.log("A  ", find(xx, "A"));
console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));
console.log("------------------");
xx = remove(xx, "BED");
console.log("A  ", find(xx, "A"));
console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));
console.log("------------------");
xx = remove(xx, "AD");
console.log("A  ", find(xx, "A"));
console.log("ACE", find(xx, "ACE"));
console.log("B  ", find(xx, "B"));
console.log("BA ", find(xx, "BA"));
console.log("BE ", find(xx, "BE"));
console.log("BEA", find(xx, "BEA"));
console.log("BED", find(xx, "BED"));
console.log("BEE", find(xx, "BEE"));

print(xx);
printWords(xx);
