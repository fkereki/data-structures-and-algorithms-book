const lazySelectMedian = require("./lazy_select_median");

const data = require("../data32");
console.log(lazySelectMedian([...data])); // 34
console.log(lazySelectMedian([...data], 3, 11)); // 18
console.log(lazySelectMedian([...data], 0, 10)); // 18
console.log(lazySelectMedian([...data], 11, 21)); // 33

const data2 = require("../data10000");
console.log(">>>", lazySelectMedian([...data2])); // 5568675
console.log(">>>", lazySelectMedian([...data2], 0, 1000)); // 5509922
console.log(">>>", lazySelectMedian([...data2], 1000, 2000)); // 5502094
console.log(">>>", lazySelectMedian([...data2], 2000, 4000)); // 5562085
console.log(">>>", lazySelectMedian([...data2], 4000)); // 5595036
