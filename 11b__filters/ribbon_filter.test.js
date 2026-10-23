/*
 * Thorough Ribbon-filter coverage:
 * - Check empty filters, input validation, distinct values, and membership.
 * - Exercise a larger set and check that the observed false-positive rate is
 *   consistent with the configured fingerprint width.
 */
const assert = require("assert");
const { createRibbonFilter, find } = require("./ribbon_filter");

const checkEmptyAndValidation = () => {
  const filter = createRibbonFilter([]);
  assert.strictEqual(filter.s, 0);
  assert.strictEqual(find(filter, "absent"), false);

  assert.throws(
    () => createRibbonFilter("not an array"),
    /bad parameters/i
  );
  assert.throws(
    () => createRibbonFilter([], 0),
    /bad parameters/i
  );
  assert.throws(
    () => createRibbonFilter([], 1),
    /bad parameters/i
  );
  assert.throws(
    () => createRibbonFilter([], 2 ** -25),
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
    const filter = createRibbonFilter(items, 0.01);
    assert.strictEqual(filter.p, 7);
    for (const item of items)
      assert.strictEqual(find(filter, item), true);
  }

  const numericFilter = createRibbonFilter([1, 2, 3]);
  assert.strictEqual(find(numericFilter, "1"), true);
  assert.strictEqual(find(numericFilter, 2), true);
};

const checkLargeSetMembershipAndFalsePositives = () => {
  const items = Array.from(
    { length: 500 },
    (_, index) => `ribbon-item-${index}`
  );
  const filter = createRibbonFilter(items, 0.01);
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
console.log("ribbon_filter.test.js: all checks passed");
