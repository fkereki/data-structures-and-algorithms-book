const isConnected = (graph) => {
  const n = graph.length;
  const visited = Array(n).fill(false);

  const visit = (x) => {
    graph[x].forEach((v, i) => {
      if (v > 0 && !visited[i]) {
        visited[i] = true;
        visit(i);
      }
    });
  };

  visited[0] = true;
  visit(0);

  return visited.every((x) => x);
};

// ---------------------------------

const { undirected1, undirected2 } = require("./graphs.js");

console.log(isConnected(undirected1)); // true

console.log(isConnected(undirected2)); // false
