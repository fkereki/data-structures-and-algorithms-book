class Stack {
  constructor() {
    this._values = [];
  }

  isEmpty() {
    return this._values.length === 0;
  }

  print() {
    console.log(this._values);
  }

  push(value) {
    this._values.push(value);
    return this; // chaining
  }

  top() {
    return this.isEmpty() ? undefined : this._values[this._values.length - 1];
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Empty stack - cannot pop");
    } else {
      return this._values.pop();
    }
  }
}

module.exports.Stack = Stack;
