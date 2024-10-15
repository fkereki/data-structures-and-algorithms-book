const { randomBit } = require("../random");

const random01 = () => (randomBit() ? 0 : 1);

const random3 = () => {
  let num = 0;
  do {
    num = 2 * random01() + random01();
  } while (num > 2);

  return ["3-hi", "2-md", "1-lo"][num];
};

const randomDie = () => {
  let num = 0;
  do {
    num = 4 * random01() + 2 * random01() + random01();
  } while (num > 5);

  return num + 1;
};

const logResults = require("../log_results_sample");

logResults(() => [random3()], undefined, undefined, 30_000);
logResults(() => [randomDie()], undefined, undefined, 30_000);
