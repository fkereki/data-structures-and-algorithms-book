/*
  Code directly extracted from the topological sort by Tarjan
*/
const hasCycle = (graph) => {
  const n = graph.length;
  const marks = Array(n).fill(0); // 1:temp, 2:final

  const visit = (p) => {
    if (marks[p] === 1) {
      throw new Error("cycle found");
    } else if (marks[p] === 0) {
      marks[p] = 1;
      graph[p].forEach((v, q) => {
        if (v && marks[q] !== 2) {
          visit(q);
        }
      });

      marks[p] = 2;
    }
  };

  try {
    marks.forEach((v, i) => {
      visit(i);
    });
    return false; // no cycles found
  } catch (e) {
    return true;
  }
};

// ---------------------------------

const {
  adjacency_with_cycles,
  adjacency_without_cycles
} = require("./graphs");

console.log(hasCycle(adjacency_with_cycles));

console.log(hasCycle(adjacency_without_cycles));
