/* eslint-disable no-func-assign */
/* eslint-disable no-unused-vars */

const addLogging = (fn) => (...args) => {
  console.log(`Entering ${fn.name}: ${args}`);
  try {
    const valueToReturn = fn(...args);
    console.log(`Exiting ${fn.name} returning ${valueToReturn}`);
    return valueToReturn;
  } catch (thrownError) {
    console.log(`Exiting ${fn.name} throwing ${thrownError}`);
    throw thrownError;
  }
};

function add(a, b) {
  return a + b;
}
add = addLogging(add);

function crash(a, b, c) {
  throw new Error("Crashing for no reason");
}
crash = addLogging(crash);

add(22, 9);
crash(12, 4, 56);

/*
Entering add: 22,9
Exiting add returning 31

Entering crash: 12,4,56
Exiting crash throwing Error: Crashing for no reason
/home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addLogging.js:9
    throw thrownError;
    ^

Error: Crashing for no reason
    at crash (/home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addLogging.js:19:9)
    at /home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addLogging.js:4:27
    at Object.<anonymous> (/home/fkereki/Dropbox/ADS_BOOK/CODE/functional_programming/answers_to_questions/addLogging.js:24:1)
    at Module._compile (node:internal/modules/cjs/loader:1108:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1137:10)
    at Module.load (node:internal/modules/cjs/loader:973:32)
    at Function.Module._load (node:internal/modules/cjs/loader:813:14)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47
*/
