const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indexOf_rabin_karp = require("./indexOf_rabin_karp");

describe("indexOf_rabin_karp", () => {
  it("returns the first matching position", () => {
    assert.equal(indexOf_rabin_karp("something", "me"), 2);
    assert.equal(indexOf_rabin_karp("mississippi", "iss"), 1);
    assert.equal(indexOf_rabin_karp("banana", "ana"), 1);
  });

  it("supports a starting position", () => {
    assert.equal(indexOf_rabin_karp("banana", "ana", 2), 3);
    assert.equal(indexOf_rabin_karp("banana", "ana", 3), 3);
    assert.equal(indexOf_rabin_karp("banana", "ana", 4), -1);
  });

  it("returns -1 when no match is found", () => {
    assert.equal(indexOf_rabin_karp("abcdef", "xyz"), -1);
    assert.equal(indexOf_rabin_karp("abc", "abcd"), -1);
    assert.equal(indexOf_rabin_karp("", "a"), -1);
  });

  it("returns p for an empty search string", () => {
    assert.equal(indexOf_rabin_karp("abc", ""), 0);
    assert.equal(indexOf_rabin_karp("abc", "", 2), 2);
    assert.equal(indexOf_rabin_karp("abc", "", 3), 3);
    assert.equal(indexOf_rabin_karp("", ""), 0);
  });

  it("verifies hash matches and handles overlapping candidates", () => {
    assert.equal(indexOf_rabin_karp("aaaaab", "aaab"), 2);
    assert.equal(indexOf_rabin_karp("ababababca", "ababca"), 4);
    assert.equal(indexOf_rabin_karp("a.b...a.b", "."), 1);
    assert.equal(indexOf_rabin_karp("$a$$a", "$$"), 2);
  });

  it("uses JavaScript UTF-16 string indices", () => {
    assert.equal(indexOf_rabin_karp("a😀b😀", "😀"), 1);
    assert.equal(indexOf_rabin_karp("a😀b😀", "b😀"), 3);
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
        indexOf_rabin_karp(text, search, position),
        text.indexOf(search, position)
      );
    }
  });
});
