const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indexOf_horspool = require("./indexOf_horspool");

describe("indexOf_horspool", () => {
  it("returns the first matching position", () => {
    assert.equal(indexOf_horspool("something", "me"), 2);
    assert.equal(indexOf_horspool("mississippi", "iss"), 1);
    assert.equal(indexOf_horspool("banana", "ana"), 1);
  });

  it("supports a starting position", () => {
    assert.equal(indexOf_horspool("banana", "ana", 2), 3);
    assert.equal(indexOf_horspool("banana", "ana", 3), 3);
    assert.equal(indexOf_horspool("banana", "ana", 4), -1);
  });

  it("returns -1 when no match is found", () => {
    assert.equal(indexOf_horspool("abcdef", "xyz"), -1);
    assert.equal(indexOf_horspool("abc", "abcd"), -1);
    assert.equal(indexOf_horspool("", "a"), -1);
  });

  it("returns p for an empty search string", () => {
    assert.equal(indexOf_horspool("abc", ""), 0);
    assert.equal(indexOf_horspool("abc", "", 2), 2);
    assert.equal(indexOf_horspool("abc", "", 3), 3);
    assert.equal(indexOf_horspool("", ""), 0);
  });

  it("handles repeated patterns and literal characters", () => {
    assert.equal(indexOf_horspool("aaaaab", "aaab"), 2);
    assert.equal(indexOf_horspool("ababababca", "ababca"), 4);
    assert.equal(indexOf_horspool("a.b...a.b", "."), 1);
    assert.equal(indexOf_horspool("$a$$a", "$$"), 2);
  });

  it("uses JavaScript UTF-16 string indices", () => {
    assert.equal(indexOf_horspool("a😀b😀", "😀"), 1);
    assert.equal(indexOf_horspool("a😀b😀", "b😀"), 3);
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
        indexOf_horspool(text, search, position),
        text.indexOf(search, position)
      );
    }
  });
});
