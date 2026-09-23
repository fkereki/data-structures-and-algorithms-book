const { isTautology } = require("./tautology_test_array");

const f = (x, y) => x || y || (!x && !y);
console.log(isTautology(f));

const g = (x, y) => (x || (!x && y)) === (x || y);
console.log(isTautology(g));

const h = (x, y, z) => !x || (x && z) || !y || (y && z) || z;
console.log(isTautology(h));
// Failed at true true false
