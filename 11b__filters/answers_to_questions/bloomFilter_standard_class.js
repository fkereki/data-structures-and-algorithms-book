const { hashWithSeed } = require("../../00___general_functions/hashWithSeed");

const EPSILON = 0.01;
const LN2 = Math.log(2);
const LN2_SQ = LN2 * LN2;

class StandardBloomFilter {
  #b;
  #h;
  #bits;

  constructor(n, eps = EPSILON) {
    this.#b = Math.ceil(-(n * Math.log(eps)) / LN2_SQ);
    this.#h = Math.max(1, Math.round((this.#b / n) * LN2));
    this.#bits = new Array(this.#b).fill(false);
  }

  getIndices(value) {
    return Array.from(
      { length: this.#h },
      (_, i) => hashWithSeed(String(value), i) % this.#b
    );
  }

  add(value) {
    for (const idx of this.getIndices(value)) {
      this.#bits[idx] = true;
    }
  }

  find(value) {
    return this.getIndices(value).every((idx) => this.#bits[idx] === true);
  }
}

module.exports = { StandardBloomFilter };
