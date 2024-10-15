const data = require("./data10000");

const dataSorted = [...data].sort((a, b) => a - b);

module.exports = dataSorted;
