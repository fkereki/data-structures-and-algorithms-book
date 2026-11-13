const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indexOf_z = require("./indexOf_z");

describe("indexOf_z", () => {
  it("returns the first matching position", () => {
    assert.equal(indexOf_z("something", "me"), 2);
    assert.equal(indexOf_z("mississippi", "iss"), 1);
  });

  it("supports a starting position", () => {
    assert.equal(indexOf_z("banana", "ana", 2), 3);
    assert.equal(indexOf_z("banana", "ana", 3), 3);
    assert.equal(indexOf_z("banana", "ana", 4), -1);
  });

  it("returns -1 when no match is found", () => {
    assert.equal(indexOf_z("abcdef", "xyz"), -1);
    assert.equal(indexOf_z("abc", "abcd"), -1);
  });

  it("returns p for an empty search string", () => {
    assert.equal(indexOf_z("abc", ""), 0);
    assert.equal(indexOf_z("abc", "", 2), 2);
    assert.equal(indexOf_z("abc", "", 3), 3);
    assert.equal(indexOf_z("", ""), 0);
  });

  it("handles repeated prefixes and overlapping candidate matches", () => {
    assert.equal(indexOf_z("ababababca", "ababca"), 4);
    assert.equal(indexOf_z("aaaaab", "aaab"), 2);
    assert.equal(indexOf_z("ababac", "ababac"), 0);
  });

  it("uses JavaScript UTF-16 string indices", () => {
    assert.equal(indexOf_z("a😀b😀", "😀"), 1);
    assert.equal(indexOf_z("a😀b😀", "b😀"), 3);
  });

  it("does not confuse input characters with the sequence separator", () => {
    assert.equal(indexOf_z("$a$$a", "$$"), 2);
    assert.equal(indexOf_z("\0a\0\0a", "\0\0"), 2);
  });

  it("agrees with String.indexOf for representative valid positions", () => {
    const cases = [
      ["abracadabra", "abra", 0],
      ["aaaaa", "aaa", 1],
      ["a.b...a.b", ".", 2],
      ["abc", "", 2],
      ["abc", "z", 0],
      ["abc", "a", 1],
      ["abc", "", 3],
      ["😊😊x😊", "😊x", 0]
    ];

    for (const [text, search, position] of cases) {
      assert.equal(
        indexOf_z(text, search, position),
        text.indexOf(search, position)
      );
    }
  });
});