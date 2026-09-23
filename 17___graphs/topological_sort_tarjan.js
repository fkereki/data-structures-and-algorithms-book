const topologicalSort = (graph) => {
  const n = graph.length;
  const marks = Array(n).fill(0); // 1:temp, 2:final
  const sorted = [];

  const visit = (p) => {
    if (marks[p] === 1) {
      throw new Error("Not a DAG");
    } else if (marks[p] === 0) {
      marks[p] = 1;
      graph[p].forEach((v, q) => {
        if (v && marks[q] !== 2) {
          visit(q);
        }
      });

      marks[p] = 2;
      sorted.unshift(p);
    }
  };

  try {
    marks.forEach((v, i) => {
      visit(i);
    });
    return sorted;
  } catch (e) {
    return null;
  }
};

// ---------------------------------------------

const {
  adjacency_with_cycles,
  adjacency_without_cycles
} = require("./graphs");

console.log(topologicalSort(adjacency_with_cycles));

console.log(topologicalSort(adjacency_without_cycles));
