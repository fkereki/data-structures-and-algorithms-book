/*
    randomBit() returns a random true or false bit
    random(a,b) returns a random floating point number a <= x < b
    randomInt(a,b) returns a random integer number a <= x < b
*/
const randomBit = () => Math.random() >= 0.5;

const randomNum = (a, b) => a + (b - a) * Math.random();

const randomInt = (a, b) => Math.floor(randomNum(a, b));

const randomInt2 = (a, b) => a + Math.floor((b - a) * Math.random());

module.exports = { randomInt, randomInt2, randomNum, randomBit };
