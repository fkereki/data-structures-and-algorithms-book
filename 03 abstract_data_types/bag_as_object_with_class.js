class Bag {
  count = 0;
  data = {};

  isEmpty() {
    return this.count === 0;
  }

  find(value) {
    return value in this.data;
  }

  greatest() {
    return this.isEmpty() ? undefined : Object.keys(this.data).sort().pop();
  }

  add(value) {
    this.count++;
    if (this.find(value)) {
      this.data[value]++;
    } else {
      this.data[value] = 1;
    }
  }

  remove(value) {
    if (this.find(value)) {
      this.count--;
      if (this.data[value] > 1) {
        this.data[value]--;
      } else {
        delete this.data[value];
      }
    }
  }
}

module.exports = { Bag };

const b = new Bag();

console.log(b.isEmpty());

b.add("HOME");
b.add("HOME");

b.add("SWEET");
b.add("SWEET");
b.add("HOME");

b.add("THERE'S");
b.add("NO");
b.add("PLACE");
b.add("LIKE");
b.add("HOME");

console.log(b.isEmpty());
console.log(b.find("YES"));
console.log(b.find("NO"));

console.log(b.greatest());
b.remove("THERE'S");
console.log(b.greatest());
