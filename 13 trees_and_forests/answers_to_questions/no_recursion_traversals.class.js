const { BinarySearchTree } = require("../binary_search_tree.class.js");

const { Stack } = require("../chapter_11_stacks/stack_with_array.class.js");

class BinarySearchTreeWithStack extends BinarySearchTree {
  preOrder(visit = (x) => console.log(x)) {
    if (!this.isEmpty()) {
      const stack = new Stack();
      let current = this;

      for (;;) {
        do {
          visit(current.key);
          if (!current.right.isEmpty()) {
            stack.push(current.right);
          }
          current = current.left;
        } while (!current.isEmpty());

        if (stack.isEmpty()) {
          return;
        }

        current = stack.pop();
      }
    }
  }

  inOrder(visit = (x) => console.log(x)) {
    if (!this.isEmpty()) {
      const stack = new Stack();
      let current = this;

      for (;;) {
        do {
          stack.push(current);
          current = current.left;
        } while (!current.isEmpty());

        do {
          if (stack.isEmpty()) {
            return;
          }
          current = stack.pop();
          visit(current.key);
          current = current.right;
        } while (current.isEmpty());
      }
    }
  }

  postOrder(visit = (x) => console.log(x)) {
    if (!this.isEmpty()) {
      const stack = new Stack();
      let current = this;
      let type = "";

      for (;;) {
        stack.push({ tree: current, type: "K" });
        if (!current.right.isEmpty()) {
          stack.push({ tree: current.right, type: "T" });
        }
        if (!current.left.isEmpty()) {
          stack.push({ tree: current.left, type: "T" });
        }

        for (;;) {
          if (stack.isEmpty()) {
            return;
          }

          ({ tree: current, type } = stack.pop());
          if (type === "T") {
            break;
          }
          visit(current.key);
        }
      }
    }
  }
}

const h = new BinarySearchTreeWithStack();
h.add(22);
h.add(9);
h.add(60);
h.add(24);
h.add(20);
h.add(11);
h.add(12);
h.add(4);
h.add(63);
h.add(8);
h.add(10);
h.add(56);
h.add(23);

h.print();
console.log("--------");
h.preOrder();
console.log("--------");
h.inOrder();
console.log("--------");
h.postOrder();
console.log("--------");

const k = new BinarySearchTreeWithStack();
k.add(1);
k.add(2);
k.add(3);
console.log("--------");
k.preOrder();
console.log("--------");
k.inOrder();
console.log("--------");
k.postOrder();
console.log("--------");

const m = new BinarySearchTreeWithStack();
m.add(5);
m.add(4);
m.add(3);
m.add(2);
m.add(1);
console.log("--------");
m.preOrder();
console.log("--------");
m.inOrder();
console.log("--------");
m.postOrder();
console.log("--------");

const n = new BinarySearchTreeWithStack();
n.add(7);
n.add(1);
n.add(6);
n.add(2);
n.add(3);
n.add(5);
n.add(4);
console.log("--------");
n.preOrder();
console.log("--------");
n.inOrder();
console.log("--------");
n.postOrder();
console.log("--------");
