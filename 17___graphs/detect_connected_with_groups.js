const isConnected = (graph) => {
  const n = graph.length;

  let count = n;

  const groups = Array(n)
    .fill(0)
    .map(() => ({ ptr: null }));

  const findParent = (x) => (x.ptr !== null ? findParent(x.ptr) : x);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (graph[i][j]) {
        const pf = findParent(groups[i]);
        const pt = findParent(groups[j]);
        if (pf !== pt) {
          pf.ptr = pt.ptr = { ptr: null };
          count--;
        }
      }
    }
  }

  return count === 1;
  // ...or return count to learn how
  // many connected subgraphs there are
};

// ---------------------------------

const { undirected1, undirected2 } = require("./graphs.js");

console.log(isConnected(undirected1)); // true

console.log(isConnected(undirected2)); // false
