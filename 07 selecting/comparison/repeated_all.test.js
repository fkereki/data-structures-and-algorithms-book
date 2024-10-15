const rsSelect = require("./repeated_step_iterative");
const r3Select = require("./repeated_3_iterative");
const r5Select = require("./repeated_5_iterative");
const r9Select = require("./repeated_9_iterative");

const DATA_SIZE = 10000;
const TESTS_TO_DO = 10;
const SELECTS_TO_DO = 10;

const generateData = (size) =>
  new Array(size).fill(0).map(() => Math.floor(size * 1000 * Math.random()));

for (let i = 0; i < TESTS_TO_DO; i++) {
  const data = generateData(DATA_SIZE);

  for (let j = 0; j < SELECTS_TO_DO; j++) {
    const place = Math.floor(DATA_SIZE * Math.random());
    //    console.log("A", 0, ...rsSelect([...data], place));
    console.log("A", 3, ...r3Select([...data], place));
    //    console.log("A", 5, ...r5Select([...data], place));
    console.log("A", 9, ...r9Select([...data], place));
  }
}
