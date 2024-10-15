const undirected1 = [
  [+0, +4, +0, +5, 11, +0, +0],
  [+4, +0, +9, +0, +6, +0, +0],
  [+0, +9, +0, +0, +2, +0, 11],
  [+5, +0, +0, +0, +7, +3, 17],
  [11, +6, +2, +7, +0, +0, 10],
  [+0, +0, +0, +3, +0, +0, 13],
  [+0, +0, 11, 17, 10, 13, +0]
];

const undirected2 = [
  [+0, +4, +0, +5, 11, +0, +0, +0, +0, +0],
  [+4, +0, +9, +0, +6, +0, +0, +0, +0, +0],
  [+0, +9, +0, +0, +2, +0, 11, +0, +0, +0],
  [+5, +0, +0, +0, +7, +3, 17, +0, +0, +0],
  [11, +6, +2, +7, +0, +0, 10, +0, +0, +0],
  [+0, +0, +0, +3, +0, +0, 13, +0, +0, +0],
  [+0, +0, +6, 17, 10, 13, +0, +0, +0, +0],
  [+0, +0, +0, +0, +0, +0, +0, +0, +6, +7],
  [+0, +0, +0, +0, +0, +0, +0, +6, +0, +3],
  [+0, +0, +0, +0, +0, +0, +0, +7, +3, +0]
];

const adjacency_with_cycles = [
  [0, 1, 0, 1, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1],
  [0, 0, 1, 1, 1, 1, 0]
];

/*
    To be able to do a topological sort
    there must be some empty columns
    (starting points) and some empty
    rows (ending points)
*/
const adjacency_without_cycles = [
  [0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0]
];

module.exports = {
  adjacency_with_cycles,
  adjacency_without_cycles,
  undirected1,
  undirected2
};

/*
undirected1.forEach((row, i) =>
  row.forEach((val, j) => {
    if (undirected1[i][j] !== undirected1[j][i]) {
      throw new Error("MAL " + i + "," + j);
    }
  })
);

undirected2.forEach((row, i) =>
  row.forEach((val, j) => {
    if (undirected2[i][j] !== undirected2[j][i]) {
      throw new Error("MAL " + i + "," + j);
    }
  })
);
*/
