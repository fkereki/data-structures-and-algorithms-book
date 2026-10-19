/*
 * Thorough XOR-filter coverage:
 * - Check empty filters, input validation, distinct values, and membership.
 * - Exercise a larger set and check that the observed false-positive rate is
 *   consistent with the configured fingerprint width.
 */
const assert = require("assert");
const { createXorFilter, find } = require("./xor_filter");

const checkEmptyAndValidation = () => {
  const filter = createXorFilter([]);
  assert.strictEqual(filter.n, 0);
  assert.strictEqual(filter.s, 0);
  assert.deepStrictEqual(filter.b, []);
  assert.strictEqual(find(filter, "absent"), false);

  assert.throws(
    () => createXorFilter("not an array"),
    /bad parameters/i
  );
  assert.throws(
    () => createXorFilter([], 0),
    /bad parameters/i
  );
  assert.throws(
    () => createXorFilter([], 1),
    /bad parameters/i
  );
  assert.throws(
    () => createXorFilter([], 2 ** -25),
    /24-bit fingerprint limit/i
  );
};

const checkKnownItems = () => {
  const itemSets = [
    ["GROUCHO", "HARPO", "CHICO", "ZEPPO", "GUMMO"],
    [
      "ALFA",
      "BRAVO",
      "CHARLIE",
      "DELTA",
      "ECHO",
      "FOXTROT",
      "GOLF",
      "HOTEL",
      "INDIA",
      "JULIETT",
      "KILO",
      "LIMA",
      "MIKE",
      "NOVEMBER",
      "OSCAR",
      "PAPA",
      "QUEBEC",
      "ROMEO",
      "SIERRA",
      "TANGO",
      "UNIFORM",
      "VICTOR",
      "WHISKEY",
      "X-RAY",
      "YANKEE",
      "ZULU"
    ]
  ];

  for (const items of itemSets) {
    const filter = createXorFilter(items, 0.01);
    assert.strictEqual(filter.n, items.length);
    assert.strictEqual(filter.p, 7);
    assert.strictEqual(
      filter.s,
      Math.ceil(1.23 * items.length)
    );
    assert.strictEqual(filter.b.length, 3 * filter.s);
    for (const item of items)
      assert.strictEqual(find(filter, item), true);
  }

  const numericFilter = createXorFilter([1, 2, 3]);
  assert.strictEqual(find(numericFilter, "1"), true);
  assert.strictEqual(find(numericFilter, 2), true);
};

const checkLargeSetMembershipAndFalsePositives = () => {
  const items = Array.from(
    { length: 500 },
    (_, index) => `xor-item-${index}`
  );
  const filter = createXorFilter(items, 0.01);
  assert.strictEqual(filter.n, items.length);
  for (const item of items)
    assert.strictEqual(find(filter, item), true);

  const absentItems = Array.from(
    { length: 5000 },
    (_, index) => `absent-item-${index}`
  );
  const falsePositives = absentItems.filter((item) =>
    find(filter, item)
  );
  assert(
    falsePositives.length < 100,
    `unexpected false-positive count: ${falsePositives.length}`
  );
};

checkEmptyAndValidation();
checkKnownItems();
checkLargeSetMembershipAndFalsePositives();
console.log("xor_filter.test.js: all checks passed");
