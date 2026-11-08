const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indicesOf_kmp = require("./indicesOf_kmp");

describe("indicesOf_kmp", () => {
  it("returns all match positions", () => {
    assert.deepEqual(
      indicesOf_kmp("one fish, two fish, red fish", "fish"),
      [4, 14, 24]
    );
  });

  it("returns overlapping matches", () => {
    assert.deepEqual(indicesOf_kmp("aaaa", "aa"), [0, 1, 2]);
    assert.deepEqual(indicesOf_kmp("banana", "ana"), [1, 3]);
  });

  it("starts searching at the supplied position", () => {
    assert.deepEqual(
      indicesOf_kmp("abcabcabc", "abc", 1),
      [3, 6]
    );
    assert.deepEqual(indicesOf_kmp("banana", "ana", 2), [3]);
  });

  it("returns an empty array when there is no match", () => {
    assert.deepEqual(indicesOf_kmp("alphabet", "xyz"), []);
    assert.deepEqual(indicesOf_kmp("", "a"), []);
  });

  it("returns every boundary for an empty search string", () => {
    assert.deepEqual(indicesOf_kmp("abc", ""), [0, 1, 2, 3]);
    assert.deepEqual(indicesOf_kmp("abc", "", 2), [2, 3]);
    assert.deepEqual(indicesOf_kmp("", ""), [0]);
  });

  it("uses JavaScript UTF-16 string indices", () => {
    assert.deepEqual(indicesOf_kmp("a😀a😀", "😀"), [1, 4]);
    assert.deepEqual(indicesOf_kmp("a😀a", "a"), [0, 3]);
  });

  it("agrees with repeated native indexOf searches for representative inputs", () => {
    const cases = [
      ["mississippi", "iss", 0],
      ["ababababca", "ababca", 0],
      ["aaaaabaaaaab", "aaab", 0],
      ["a.b...a.b", ".", 2],
      ["abc", "", 2],
      ["banana", "ana", 2],
      ["a😀b😀", "😀", 0]
    ];

    for (const [text, search, start] of cases) {
      const expected = [];
      let from = start;
      while (from <= text.length) {
        const found = text.indexOf(search, from);
        if (found === -1) break;
        expected.push(found);
        if (search === "" && found === text.length) break;
        from = found + 1;
      }
      assert.deepEqual(
        indicesOf_kmp(text, search, start),
        expected
      );
    }
  });
});
