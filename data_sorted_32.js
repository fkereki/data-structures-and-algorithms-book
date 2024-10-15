const data = require("./data32");

const dataSorted = [...data].sort((a, b) => a - b);

module.exports = dataSorted;
