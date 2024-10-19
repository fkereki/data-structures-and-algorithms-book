const {
  BinarySearchTree
} = require("../../binary_trees/binary_search_tree.class.js");

class BinarySearchTreeWithEquals extends BinarySearchTree {
  equals(other) {
    if (this.isEmpty() && other.isEmpty()) {
      return true;
    } else if (this.isEmpty() !== other.isEmpty()) {
      return false;
    } else {
      return (
        this.key === other.key &&
        this.left.equals(other.left) &&
        this.right.equals(other.right)
      );
    }
  }

  equals2(other) {
    return (
      (this.isEmpty() && other.isEmpty()) ||
      (!this.isEmpty() &&
        !other.isEmpty() &&
        this.key === other.key &&
        this.left.equals2(other.left) &&
        this.right.equals2(other.right))
    );
  }

  equals3(other) {
    return JSON.stringify(this) === JSON.stringify(other);
  }
}

const h = new BinarySearchTreeWithEquals();
h.add(22);
h.add(9);
h.add(60);
h.add(24);
h.add(11);
h.add(12);
h.add(4);
h.add(10);
h.add(56);
h.add(23);

h.print();

const k = new BinarySearchTreeWithEquals();

k.add(22);
k.add(9);
k.add(60);
k.add(24);
k.add(11);
k.add(12);
k.add(4);
k.add(10);
k.add(56);
k.add(23);

k.print();

console.log(h.equals(k));
console.log(h.equals2(k));
console.log(h.equals3(k));

k.remove(11);

console.log(h.equals(k));
console.log(h.equals2(k));
console.log(h.equals3(k));
