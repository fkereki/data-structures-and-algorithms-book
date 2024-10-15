const distances = (graph) => {
  const n = graph.length;

  const distance = [];
  const next = [];
  for (let i = 0; i < n; i++) {
    distance[i] = Array(n).fill(+Infinity);
    next[i] = Array(n).fill(null);
  }

  graph.forEach((r, i) => {
    distance[i][i] = 0;
    next[i][i] = i;
    r.forEach((c, j) => {
      if (c > 0) {
        distance[i][j] = graph[i][j];
        next[i][j] = j;
      }
    });
  });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (distance[i][j] > distance[i][k] + distance[k][j]) {
          distance[i][j] = distance[i][k] + distance[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  return [distance, next];
};

const path = (next, u, v) => {
  const sequence = [];
  if (next[u][v] !== null) {
    sequence.push(u);
    while (u !== v) {
      u = next[u][v];
      sequence.push(u);
    }
  }
  return sequence;
};

const { undirected1 } = require("../graphs.js");

const [dist1, next1] = distances(undirected1);

console.log(
  dist1.map((r) => JSON.stringify(r, (k, v) => (v === Infinity ? "∞" : v)))
);

console.log(next1.map(JSON.stringify));

console.log(path(next1, 0, 2));
console.log(path(next1, 3, 6));
