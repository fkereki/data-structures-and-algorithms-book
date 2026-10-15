const { naivePerm } = require("./naive_perm");
const logResults = require("./log_results_shuffle");

/*
The algorithm makes n^n possible choice sequences, and n^n is not generally
a multiple of n!, so this naive method does not produce uniform permutations.
*/
logResults(naivePerm, 0, 3, 4, 4000);