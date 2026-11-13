const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const indicesOf = require("./indicesOf");

describe("indicesOf", () => {
  it("returns every match in a string with repeated occurrences", () => {
    assert.deepEqual(
      indicesOf("one fish, two fish, red fish", "fish"),
      [4, 14, 24]
    );
  });

  it("defaults the starting position to zero", () => {
    assert.deepEqual(indicesOf("abcabc", "abc"), [0, 3]);
  });

  it("starts searching at the supplied position", () => {
    assert.deepEqual(indicesOf("abcabcabc", "abc", 1), [3, 6]);
    assert.deepEqual(indicesOf("aaaa", "aa", 2), [2]);
  });

  it("includes a match that starts exactly at the supplied position", () => {
    assert.deepEqual(indicesOf("banana", "ana", 3), [3]);
  });

  it("does not return matches that start before the supplied position", () => {
    assert.deepEqual(indicesOf("banana", "ana", 2), [3]);
  });

  it("treats a negative starting position like zero", () => {
    assert.deepEqual(indicesOf("abcabc", "abc", -5), [0, 3]);
  });

  it("returns no non-empty matches when starting beyond the string", () => {
    assert.deepEqual(indicesOf("abc", "a", 4), []);
  });

  it("returns an empty array when there is no match", () => {
    assert.deepEqual(indicesOf("alphabet", "xyz"), []);
  });

  it("finds a match at the beginning, middle, and end", () => {
    assert.deepEqual(indicesOf("ababa", "aba"), [0, 2]);
  });

  it("finds overlapping matches", () => {
    assert.deepEqual(indicesOf("aaaa", "aa"), [0, 1, 2]);
    assert.deepEqual(indicesOf("banana", "ana"), [1, 3]);
  });

  it("returns the only position when the strings are identical", () => {
    assert.deepEqual(indicesOf("search", "search"), [0]);
  });

  it("returns no positions when the search string is longer", () => {
    assert.deepEqual(indicesOf("short", "a longer string"), []);
  });

  it("finds every occurrence of a one-character search string", () => {
    assert.deepEqual(
      indicesOf("mississippi", "s"),
      [2, 3, 5, 6]
    );
  });

  it("treats matching as case-sensitive", () => {
    assert.deepEqual(indicesOf("AaA", "a"), [1]);
  });

  it("treats search text literally, not as a regular expression", () => {
    assert.deepEqual(
      indicesOf("a.b...a.b", "."),
      [1, 3, 4, 5, 7]
    );
    assert.deepEqual(indicesOf("a+b+a+", "a+"), [0, 4]);
  });

  it("returns every boundary for an empty search string", () => {
    assert.deepEqual(indicesOf("abc", ""), [0, 1, 2, 3]);
  });

  it("starts empty-string matches at the supplied position", () => {
    assert.deepEqual(indicesOf("abc", "", 2), [2, 3]);
    assert.deepEqual(indicesOf("abc", "", 8), [3]);
  });

  it("returns the only boundary for empty strings", () => {
    assert.deepEqual(indicesOf("", ""), [0]);
  });

  it("returns no positions for a non-empty search string in an empty string", () => {
    assert.deepEqual(indicesOf("", "a"), []);
  });

  it("uses JavaScript string indices for Unicode text", () => {
    assert.deepEqual(indicesOf("a😀a😀", "😀"), [1, 4]);
    assert.deepEqual(indicesOf("a😀a", "a"), [0, 3]);
  });

  it("returns a new result array for each call", () => {
    const first = indicesOf("abab", "ab");
    first.push(99);

    assert.deepEqual(indicesOf("abab", "ab"), [0, 2]);
  });
});
