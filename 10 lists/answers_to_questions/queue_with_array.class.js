class Queue {
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
    this._values.unshift(value);
    return this; // chaining
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Empty queue - cannot pop");
    } else {
      return this._values.pop();
    }
  }
}

module.exports.Queue = Queue;
