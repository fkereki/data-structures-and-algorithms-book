const topologicalSort = (graph) => {
  const n = graph.length;

  const queue = [];
  const sorted = [];

  const incoming = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j]) {
        incoming[j]++;
      }
    }
  }

  incoming.forEach((v, i) => {
    if (v === 0) {
      queue.push(i);
    }
  });

  while (queue.length > 0) {
    const i = queue.shift();
    sorted.push(i);

    graph[i].forEach((v, j) => {
      if (v) {
        incoming[j]--;
        if (incoming[j] === 0) {
          queue.push(j);
        }
      }
    });
  }

  return sorted.length === n ? sorted : null;
};

// -------------------------------------

const {
  adjacency_with_cycles,
  adjacency_without_cycles
} = require("./graphs");

console.log(topologicalSort(adjacency_with_cycles));

console.log(topologicalSort(adjacency_without_cycles));
