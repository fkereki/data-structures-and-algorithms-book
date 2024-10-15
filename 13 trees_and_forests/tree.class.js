const { Queue } = require("../queues/queue_with_array.class.js");

class Tree {
  constructor(rootKey) {
    this._key = rootKey;
    this._children = [];
  }

  isEmpty() {
    return this._key === undefined;
  }

  _throwIfEmpty() {
    if (this.isEmpty()) {
      throw new Error("Empty tree");
    }
  }

  get key() {
    this._throwIfEmpty();
    return this._key;
  }

  set key(v) {
    this._key = v;
  }

  get isLeaf() {
    this._throwIfEmpty();
    return this.childNodes.length === 0;
  }

  get childNodes() {
    this._throwIfEmpty();
    return this._children;
  }

  get firstChild() {
    return this.isLeaf ? null : this.childNodes[0];
  }

  get lastChild() {
    return this.isLeaf ? null : this.childNodes[this.childNodes.length - 1];
  }

  print(s = "0") {
    if (!this.isEmpty()) {
      console.log(s, this.key);
      this.childNodes.forEach((p, i) => {
        if (p !== null) {
          p.print(`${s}.${i}`);
        }
      });
    }
  }

  breadthFirst(visit = (x) => console.log(x)) {
    if (!this.isEmpty()) {
      const q = new Queue();
      q.push(this);
      while (!q.isEmpty()) {
        const t = q.pop();
        visit(t.key);
        t.childNodes.forEach((v) => q.push(v));
      }
    }
  }

  depthFirst(visit = (x) => console.log(x)) {
    if (!this.isEmpty()) {
      visit(this.key);
      this.childNodes.forEach((v) => v.depthFirst());
    }
  }

  appendChild(keyToAppend) {
    return this.addChild(keyToAppend);
  }

  addChild(keyToAdd, i = this.childNodes.length) {
    this._throwIfEmpty();
    if (i < 0 || i > this.childNodes.length) {
      throw new Error("Wrong index at add");
    } else {
      const newTree = new this.constructor();
      newTree.key = keyToAdd;
      this._children.splice(i, 0, newTree);
      return this;
    }
  }

  removeChild(i) {
    this._throwIfEmpty();
    if (i < 0 || i >= this.childNodes.length) {
      throw new Error("Wrong index at remove");
    } else {
      this._children.splice(i, 1);
      return this;
    }
  }
}

module.exports.Tree = Tree;
