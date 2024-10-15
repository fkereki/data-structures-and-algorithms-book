const { Tree } = require("./tree.class.js");

const t = new Tree();
t.key = 99;

t.addChild(22).addChild(9).addChild(60);
t.childNodes[0].addChild(24).addChild(11);
t.childNodes[1].addChild(48);

t.print();
console.log("B---");
t.breadthFirst();
console.log("D---");
t.depthFirst();
console.log("---");

console.log(t.firstChild.key);
console.log(t.firstChild.lastChild.key);

t.childNodes[0].removeChild(0);
t.print();
