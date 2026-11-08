const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
require("./indexOf_naive_method_1");

describe("String.prototype.indexOf_naive", () => {
  it("searches a string and returns the first matching position", () => {
    assert.equal("something".indexOf_naive("me"), 2);
    assert.equal("something".indexOf_naive("thing", 3), 4);
  });

  it("starts searching at the supplied position", () => {
    assert.equal("banana".indexOf_naive("ana", 3), 3);
    assert.equal("banana".indexOf_naive("ana", 4), -1);
  });

  it("returns -1 when no match is found", () => {
    assert.equal("something".indexOf_naive("xyz"), -1);
  });

  it("returns the starting position for an empty search string", () => {
    assert.equal("something".indexOf_naive(""), 0);
    assert.equal("something".indexOf_naive("", 3), 3);
  });

  it("adds the method as a non-enumerable prototype property", () => {
    assert.equal(
      Object.prototype.propertyIsEnumerable.call(
        String.prototype,
        "indexOf_naive"
      ),
      false
    );
  });
});
