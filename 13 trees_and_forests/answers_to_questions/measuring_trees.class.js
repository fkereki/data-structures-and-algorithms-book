const { Tree } = require("../tree.class.js");

class TreeWithMeasuring extends Tree {
  calcSize() {
    return this.isEmpty()
      ? 0
      : 1 + this._children.reduce((a, v) => a + v.calcSize(), 0);
  }

  calcHeight() {
    if (this.isEmpty()) {
      return 0;
    } else if (this._children.length === 0) {
      return 1;
    } else {
      return 1 + Math.max(...this._children.map((v) => v.calcHeight()));
    }
  }
}

const t = new TreeWithMeasuring();
t.key = 99;

t.addChild(22).addChild(9).addChild(60);
t.childNodes[0].addChild(24).addChild(11);
t.childNodes[1].addChild(48);

t.print();
console.log("HEIGHT", t.calcHeight());
console.log("SIZE", t.calcSize());

t.childNodes[2].addChild(34);
t.childNodes[2].childNodes[0].addChild(40);
t.childNodes[2].childNodes[0].childNodes[0].addChild(12).addChild(9);

t.print();
console.log("HEIGHT", t.calcHeight());
console.log("SIZE", t.calcSize());
