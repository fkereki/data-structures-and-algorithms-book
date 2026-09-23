const isConnected = (graph) => {
  const n = graph.length;

const groups = Array(n)
  .fill(0)
  .map(() => ({ ptr: null, size: 1 }));

  let count = n;

  const findParent = (x) => {
    if (x.ptr !== null) {
      x.ptr = findParent(x.ptr);
      return x.ptr;
    } else {
      return x;
    }
  };

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (graph[i][j]) {
      const pf = findParent(groups[i]);
      const pt = findParent(groups[j]);

      if (pf !== pt) {
        count--;
        if (pf.size < pt.size) {
          pt.size += pf.size;
          pf.ptr = pt;
        } else {
          pf.size += pt.size;
          pt.ptr = pf;
        }
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
