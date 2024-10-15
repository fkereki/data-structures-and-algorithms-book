const distances = (graph) => {
  const n = graph.length;

  const distance = [];
  for (let i = 0; i < n; i++) {
    distance[i] = Array(n).fill(+Infinity);
  }

  graph.forEach((r, i) => {
    distance[i][i] = 0;
    r.forEach((c, j) => {
      if (c > 0) {
        distance[i][j] = graph[i][j];
      }
    });
  });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (distance[i][j] > distance[i][k] + distance[k][j]) {
          distance[i][j] = distance[i][k] + distance[k][j];
        }
      }
    }
  }

  return distance;
};

const { undirected1, undirected2 } = require("./graphs.js");

console.log(
  distances(undirected1).map((r) =>
    JSON.stringify(r, (k, v) => (v === Infinity ? "∞" : v))
  )
);

console.log(
  distances(undirected2).map((r) =>
    JSON.stringify(r, (k, v) => (v === Infinity ? "∞" : v))
  )
);
