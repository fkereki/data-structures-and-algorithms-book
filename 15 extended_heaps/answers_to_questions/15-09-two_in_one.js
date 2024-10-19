const { LazyBinomialHeap } = require("../lazy_binomial_heap.class.js");

class FibonacciHeap extends LazyBinomialHeap {
  _print(t, s = "", stopT = null) {
    if (t && t !== stopT) {
      console.log(
        s,
        t._key,
        `${t._marked ? "***" : ""}`,
        `#${t._degree}`,
        t._up ? `P: ${t._up._key}` : ""
      );
      this._print(t._down, `${s}  D:`);
      this._print(t._right, `${s}  R:`, stopT || t);
    }
  }

  _findInTree(tree, keyToFind, stopT = null) {
    let node = null;
    if (tree && tree !== stopT) {
      if (tree._key === keyToFind) {
        node = tree;
      } else {
        node =
          this._findInTree(tree._down, keyToFind) ||
          this._findInTree(tree._right, keyToFind, stopT || tree);
      }
    }
    return node;
  }

  _mergeA2B(low, high) {
    if (high._down) {
      low._right = high._down;
      low._left = high._down._left;
      high._down._left._right = high._down._left = low;
    }

    high._down = low;
    low._up = high;
    high._degree++;

    return high;
  }

  add(keyToAdd) {
    const newTree = {
      _degree: 0,
      _key: keyToAdd,
      _down: null,
      _up: null,
      _marked: false
    };
    newTree._left = newTree._right = newTree;

    this._trees.push(newTree);

    if (this._heapTop === undefined || this._heapTop < keyToAdd) {
      this._heapTop = keyToAdd;
    }
    return this;
  }

  remove() {
    this._throwIfEmpty();
    const heapTop = this._heapTop;

    const top = this._findTop();
    let bt = this._trees[top]._down;

    if (bt && bt._left) {
      // avoid a loop!
      bt._left._right = null;
    }

    while (bt) {
      this._trees.push(bt);
      const nextBt = bt._right;
      bt._right = bt._left = bt;
      bt._up = null;
      bt = nextBt;
    }

    this._trees.splice(top, 1);
    this._trees = this._coalesce([], this._trees);

    this._heapTop = this.isEmpty()
      ? undefined
      : this._trees[this._findTop()]._key;

    return heapTop;
  }

  _bubbleUp(node, newKey) {
    node._key = newKey;
    this._separate(node);
  }

  _separate(node) {
    node._marked = false;

    const parent = node._up;
    if (parent) {
      if (node._right === node) {
        parent._down = null;
      } else {
        if (parent._down === node) {
          parent._down = node._right;
        }
        node._left._right = node._right;
        node._right._left = node._left;
      }
      parent._degree--;

      node._up = null;
      node._left = node._right = node;
      this._trees.push(node);

      if (parent._marked) {
        this._separate(parent);
      } else {
        parent._marked = true;
      }
    }
  }
}

module.exports.FibonacciHeap = FibonacciHeap;
