const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indexOf_boyer_moore = require("./indexOf_boyer_moore");

describe("indexOf_boyer_moore", () => {
  it("returns the first matching position", () => {
    assert.equal(indexOf_boyer_moore("something", "me"), 2);
    assert.equal(indexOf_boyer_moore("mississippi", "iss"), 1);
    assert.equal(indexOf_boyer_moore("banana", "ana"), 1);
  });

  it("supports a starting position", () => {
    assert.equal(indexOf_boyer_moore("banana", "ana", 2), 3);
    assert.equal(indexOf_boyer_moore("banana", "ana", 3), 3);
    assert.equal(indexOf_boyer_moore("banana", "ana", 4), -1);
  });

  it("returns -1 when no match is found", () => {
    assert.equal(indexOf_boyer_moore("abcdef", "xyz"), -1);
    assert.equal(indexOf_boyer_moore("abc", "abcd"), -1);
    assert.equal(indexOf_boyer_moore("", "a"), -1);
  });

  it("returns p for an empty search string", () => {
    assert.equal(indexOf_boyer_moore("abc", ""), 0);
    assert.equal(indexOf_boyer_moore("abc", "", 2), 2);
    assert.equal(indexOf_boyer_moore("abc", "", 3), 3);
    assert.equal(indexOf_boyer_moore("", ""), 0);
  });

  it("uses both mismatch shifts for repeated and overlapping patterns", () => {
    assert.equal(indexOf_boyer_moore("aaaaab", "aaab"), 2);
    assert.equal(
      indexOf_boyer_moore("ababababca", "ababca"),
      4
    );
    assert.equal(
      indexOf_boyer_moore(
        "HERE IS A SIMPLE EXAMPLE",
        "EXAMPLE"
      ),
      17
    );
    assert.equal(indexOf_boyer_moore("a.b...a.b", "."), 1);
  });

  it("uses JavaScript UTF-16 string indices", () => {
    assert.equal(indexOf_boyer_moore("a😀b😀", "😀"), 1);
    assert.equal(indexOf_boyer_moore("a😀b😀", "b😀"), 3);
  });

  it("agrees with String.indexOf for representative valid positions", () => {
    const cases = [
      ["abracadabra", "abra", 0],
      ["aaaaa", "aaa", 1],
      ["abc", "", 2],
      ["abc", "z", 0],
      ["abc", "a", 1],
      ["😊😊x😊", "😊x", 0]
    ];

    for (const [text, search, position] of cases) {
      assert.equal(
        indexOf_boyer_moore(text, search, position),
        text.indexOf(search, position)
      );
    }
  });
});
