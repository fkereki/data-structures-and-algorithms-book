const crypto = require("crypto");

/*
    Returns a 32-bit integer hash of the given value, using the given seed.
*/
const hashWithSeed = (value, seed) =>
  crypto
    .createHash("sha256")
    .update(`${seed}:${value}`)
    .digest()
    .readUInt32BE(0);

module.exports = { hashWithSeed };
