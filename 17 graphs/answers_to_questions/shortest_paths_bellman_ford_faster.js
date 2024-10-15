const distances = (graph, from) => {
  const n = graph.length;

  const previous = Array(n).fill(null);
  const distance = Array(n).fill(+Infinity);
  distance[from] = 0;

  const edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j]) {
        edges.push({ from: i, to: j, dist: graph[i][j] });
      }
    }
  }

  for (let i = 0; i < n - 1; i++) {
    let changes = false;
    edges.forEach((v) => {
      const w = v.dist;
      if (distance[v.from] + w < distance[v.to]) {
        distance[v.to] = distance[v.from] + w;
        previous[v.to] = v.from;
        changes = true;
      }
    });
    if (!changes) {
      break;
    }
  }

  return [distance.map(JSON.stringify), previous.map(JSON.stringify)];
};

// ------------------

const { undirected1 } = require("../graphs.js");

const [distance, previous] = distances(undirected1, 5);
console.log(JSON.stringify(distance));
console.log(JSON.stringify(previous));
