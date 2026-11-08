const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indexOf_kmp = require("./indexOf_kmp");

describe("indexOf_kmp", () => {
  it("returns the first matching position", () => {
    assert.equal(indexOf_kmp("something", "me"), 2);
    assert.equal(indexOf_kmp("mississippi", "iss"), 1);
  });

  it("supports a starting position", () => {
    assert.equal(indexOf_kmp("banana", "ana", 2), 3);
    assert.equal(indexOf_kmp("banana", "ana", 3), 3);
    assert.equal(indexOf_kmp("banana", "ana", 4), -1);
  });

  it("returns -1 when no match is found", () => {
    assert.equal(indexOf_kmp("abcdef", "xyz"), -1);
    assert.equal(indexOf_kmp("abc", "abcd"), -1);
  });

  it("returns p for an empty search string", () => {
    assert.equal(indexOf_kmp("abc", ""), 0);
    assert.equal(indexOf_kmp("abc", "", 2), 2);
    assert.equal(indexOf_kmp("", ""), 0);
  });

  it("handles repeated prefixes and overlapping candidate matches", () => {
    assert.equal(indexOf_kmp("ababababca", "ababca"), 4);
    assert.equal(indexOf_kmp("aaaaab", "aaab"), 2);
    assert.equal(indexOf_kmp("ababac", "ababac"), 0);
  });

  it("uses JavaScript UTF-16 string indices", () => {
    assert.equal(indexOf_kmp("a😀b😀", "😀"), 1);
    assert.equal(indexOf_kmp("a😀b😀", "b😀"), 3);
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
        indexOf_kmp(text, search, position),
        text.indexOf(search, position)
      );
    }
  });
});
