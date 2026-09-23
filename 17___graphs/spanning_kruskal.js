const spanning = (graph) => {
  const n = graph.length;

  const newGraph = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (graph[i][j]) {
        edges.push({ from: i, to: j, dist: graph[i][j] });
      }
    }
  }
  edges.sort((a, b) => a.dist - b.dist);

  const groups = Array(n)
    .fill(0)
    .map(() => ({ ptr: null }));

  const findParent = (x) => (x.ptr !== null ? findParent(x.ptr) : x);

  /*
  Iterative version:

  const findParent = (x) => {
    while (x.ptr) {
      x = x.ptr;
    }
    return x;
  };
  */

  edges.forEach((v) => {
    const pf = findParent(groups[v.from]);
    const pt = findParent(groups[v.to]);

    if (pf !== pt) {
      pf.ptr = pt.ptr = { ptr: null };
      newGraph[v.from][v.to] = newGraph[v.to][v.from] = graph[v.to][v.from];
    }
  });

  return newGraph;
};

// ---------------------------------

const { undirected1, undirected2 } = require("./graphs.js");

console.log(spanning(undirected1).map(JSON.stringify));

console.log(spanning(undirected2).map(JSON.stringify));
