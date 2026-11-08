const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indexOf_naive = require("./indexOf_naive");

describe("indexOf_naive", () => {
  it("finds a match at the beginning, middle, or end", () => {
    assert.equal(indexOf_naive("banana", "ban"), 0);
    assert.equal(indexOf_naive("banana", "nan"), 2);
    assert.equal(indexOf_naive("banana", "ana", 3), 3);
  });

  it("returns the first occurrence", () => {
    assert.equal(indexOf_naive("mississippi", "iss"), 1);
  });

  it("returns -1 when the search string is absent or too long", () => {
    assert.equal(indexOf_naive("banana", "xyz"), -1);
    assert.equal(indexOf_naive("ban", "banana"), -1);
    assert.equal(indexOf_naive("", "a"), -1);
  });

  it("returns the starting position for an empty search string", () => {
    assert.equal(indexOf_naive("banana", ""), 0);
    assert.equal(indexOf_naive("banana", "", 3), 3);
    assert.equal(indexOf_naive("banana", "", 6), 6);
    assert.equal(indexOf_naive("", ""), 0);
  });

  it("starts at the supplied valid position", () => {
    assert.equal(indexOf_naive("abcabc", "a", 3), 3);
    assert.equal(indexOf_naive("abcabc", "a", 4), -1);
  });

  it("matches JavaScript string indexing for Unicode text", () => {
    assert.equal(indexOf_naive("a😀b😀", "😀"), 1);
    assert.equal(indexOf_naive("a😀b😀", "😀", 2), 4);
  });

  it("agrees with String.indexOf across representative inputs", () => {
    const cases = [
      ["abracadabra", "abra", 0],
      ["aaaaa", "aaa", 1],
      ["a.b...a.b", ".", 2],
      ["abc", "", 2],
      ["abc", "z", 0],
      ["abc", "a", 1],
      ["abc", "", 3]
    ];

    for (const [text, search, position] of cases) {
      assert.equal(
        indexOf_naive(text, search, position),
        text.indexOf(search, position)
      );
    }
  });
});
