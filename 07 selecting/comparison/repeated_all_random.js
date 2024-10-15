const rsSelect = require("./repeated_step_iterative");
const r3Select = require("./repeated_3_iterative");
const r9Select = require("./repeated_9_iterative");

const TESTS_TO_DO = 1250;
const SELECTS_TO_DO = 1;

for (let i = 0; i < TESTS_TO_DO; i++) {
  const size = Math.floor(10 ** (2 + 5 * Math.random()));
  const data = new Array(size)
    .fill(0)
    .map(() => Math.floor(size * 1000 * Math.random()));

  for (let j = 0; j < SELECTS_TO_DO; j++) {
    const place = Math.floor(size * Math.random());
    console.log("A", 0, ...rsSelect([...data], place));
    console.log("A", 3, ...r3Select([...data], place));
    console.log("A", 9, ...r9Select([...data], place));
  }
}
