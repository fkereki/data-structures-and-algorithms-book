const { Tree } = require("../tree.class.js");
const { Stack } = require("../../stacks/stack_with_array.class.js");

class TreeAnswer extends Tree {
  depthFirstNonRecursive(visit = (x) => console.log(x)) {
    if (!this.isEmpty()) {
      const s = new Stack();
      s.push(this);
      while (!s.isEmpty()) {
        const t = s.pop();
        visit(t.key);
        [...t.childNodes].reverse().forEach((v) => s.push(v));
      }
    }
  }
}

const t = new TreeAnswer();
t.key = 99;

t.addChild(22).addChild(9).addChild(60);
t.childNodes[0].addChild(24).addChild(11);
t.childNodes[1].addChild(48);

t.depthFirst();
console.log("---");
t.depthFirstNonRecursive();
