/* eslint-disable no-func-assign */
/* eslint-disable no-unused-vars */

const { performance } = require("perf_hooks");

const addTiming = (fn) => (...args) => {
  const output = (text, name, tStart, tEnd) =>
    console.log(`${name} - ${text} - Time: ${tEnd - tStart} ms`);

  const tStart = performance.now();
  try {
    const valueToReturn = fn(...args);
    output("normal exit", fn.name, tStart, performance.now());
    return valueToReturn;
  } catch (thrownError) {
    output("exception thrown", fn.name, tStart, performance.now());
    throw thrownError;
  }
};

function add(a, b) {
  return a + b;
}
add = addTiming(add);

function crash(a, b, c) {
  throw new Error("Crashing for no reason");
}
crash = addTiming(crash);

add(22, 9);
crash(12, 4, 56);

/*
 add - normal exit - Time: 0.018791019916534424 ms

crash - exception thrown - Time: 0.036508023738861084 ms
/home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addTiming.js:17
    throw thrownError;
    ^

Error: Crashing for no reason
    at crash (/home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addTiming.js:27:9)
    at /home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addTiming.js:12:27
    at Object.<anonymous> (/home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addTiming.js:51:1)
    at Module._compile (node:internal/modules/cjs/loader:1108:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1137:10)
    at Module.load (node:internal/modules/cjs/loader:973:32)
    at Function.Module._load (node:internal/modules/cjs/loader:813:14)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47
*/
