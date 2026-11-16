const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indicesOf_naive = require("./indicesOf_naive");

describe("indicesOf_naive", () => {
  it("returns every match in a string with repeated occurrences", () => {
    assert.deepEqual(
      indicesOf_naive("one fish, two fish, red fish", "fish"),
      [4, 14, 24]
    );
  });

  it("finds overlapping matches", () => {
    assert.deepEqual(indicesOf_naive("aaaa", "aa"), [0, 1, 2]);
    assert.deepEqual(indicesOf_naive("banana", "ana"), [1, 3]);
  });

  it("includes empty-string boundaries", () => {
    assert.deepEqual(indicesOf_naive("abc", ""), [0, 1, 2, 3]);
    assert.deepEqual(indicesOf_naive("abc", "", 2), [2, 3]);
  });

  it("respects the starting index", () => {
    assert.deepEqual(
      indicesOf_naive("abcabcabc", "abc", 1),
      [3, 6]
    );
    assert.deepEqual(indicesOf_naive("banana", "ana", 3), [3]);
  });
});
